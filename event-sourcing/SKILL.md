---
name: event-sourcing
description: Use when implementing Event Sourcing patterns, building event-driven systems, or combining Event Sourcing with CQRS. Covers event stores, aggregates, projections, and eventual consistency.
---

# Event Sourcing

## Core Concepts

**Event Sourcing** stores state as a sequence of immutable events, rather than current state. The current state is derived by replaying events.

```
Traditional:  SAVE current state → DB (overwrites)
Event Source: APPEND events → Event Store → REPLAY to rebuild state
```

Key principles:
- Events are **immutable** — never update or delete them
- Events are facts: "OrderPlaced", "ItemAdded", "PaymentProcessed"
- State is **derived** from event history
- Full audit trail is free — the events ARE the history

## Event Definition

```ts
// Base event type
interface DomainEvent {
  id: string
  type: string
  aggregateId: string
  aggregateType: string
  version: number
  occurredAt: Date
  payload: Record<string, unknown>
}

// Specific events
interface OrderPlacedEvent extends DomainEvent {
  type: 'OrderPlaced'
  payload: {
    customerId: string
    items: Array<{ productId: string; quantity: number; price: number }>
    total: number
  }
}

interface OrderShippedEvent extends DomainEvent {
  type: 'OrderShipped'
  payload: {
    trackingCode: string
    shippedAt: Date
  }
}

type OrderEvent = OrderPlacedEvent | OrderShippedEvent | OrderCancelledEvent
```

## Aggregate (Command Side)

```ts
class Order {
  private uncommittedEvents: DomainEvent[] = []

  // Current state (derived from events)
  id!: string
  status: 'pending' | 'shipped' | 'cancelled' = 'pending'
  items: OrderItem[] = []
  total = 0
  version = 0

  // Reconstitute from events
  static fromEvents(events: OrderEvent[]): Order {
    const order = new Order()
    for (const event of events) {
      order.apply(event)
    }
    return order
  }

  // Command: place order
  static place(id: string, customerId: string, items: OrderItem[]): Order {
    const order = new Order()
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    order.raise({
      id: crypto.randomUUID(),
      type: 'OrderPlaced',
      aggregateId: id,
      aggregateType: 'Order',
      version: 1,
      occurredAt: new Date(),
      payload: { customerId, items, total },
    })

    return order
  }

  // Command: ship order
  ship(trackingCode: string): void {
    if (this.status !== 'pending') throw new Error('Cannot ship non-pending order')

    this.raise({
      id: crypto.randomUUID(),
      type: 'OrderShipped',
      aggregateId: this.id,
      aggregateType: 'Order',
      version: this.version + 1,
      occurredAt: new Date(),
      payload: { trackingCode, shippedAt: new Date() },
    })
  }

  // Apply event to state (no side effects)
  private apply(event: OrderEvent): void {
    switch (event.type) {
      case 'OrderPlaced':
        this.id = event.aggregateId
        this.items = event.payload.items
        this.total = event.payload.total
        this.status = 'pending'
        break
      case 'OrderShipped':
        this.status = 'shipped'
        break
      case 'OrderCancelled':
        this.status = 'cancelled'
        break
    }
    this.version = event.version
  }

  private raise(event: OrderEvent): void {
    this.apply(event)
    this.uncommittedEvents.push(event)
  }

  getUncommittedEvents(): DomainEvent[] {
    return [...this.uncommittedEvents]
  }

  clearUncommittedEvents(): void {
    this.uncommittedEvents = []
  }
}
```

## Event Store

```ts
interface EventStore {
  append(aggregateId: string, events: DomainEvent[], expectedVersion: number): Promise<void>
  getEvents(aggregateId: string, fromVersion?: number): Promise<DomainEvent[]>
  getAllEvents(afterPosition?: number): Promise<DomainEvent[]>
}

// PostgreSQL implementation
class PostgresEventStore implements EventStore {
  async append(aggregateId: string, events: DomainEvent[], expectedVersion: number) {
    await db.transaction(async (tx) => {
      // Optimistic concurrency check
      const current = await tx.query(
        'SELECT MAX(version) as version FROM events WHERE aggregate_id = $1',
        [aggregateId]
      )
      const currentVersion = current.rows[0]?.version ?? 0
      if (currentVersion !== expectedVersion) {
        throw new Error(`Concurrency conflict: expected v${expectedVersion}, got v${currentVersion}`)
      }

      for (const event of events) {
        await tx.query(
          `INSERT INTO events (id, aggregate_id, aggregate_type, type, version, payload, occurred_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [event.id, event.aggregateId, event.aggregateType, event.type, event.version,
           JSON.stringify(event.payload), event.occurredAt]
        )
      }
    })
  }

  async getEvents(aggregateId: string, fromVersion = 0): Promise<DomainEvent[]> {
    const result = await db.query(
      'SELECT * FROM events WHERE aggregate_id = $1 AND version > $2 ORDER BY version',
      [aggregateId, fromVersion]
    )
    return result.rows.map(deserializeEvent)
  }
}
```

## Repository Pattern

```ts
class OrderRepository {
  constructor(private eventStore: EventStore) {}

  async findById(id: string): Promise<Order | null> {
    const events = await this.eventStore.getEvents(id)
    if (events.length === 0) return null
    return Order.fromEvents(events as OrderEvent[])
  }

  async save(order: Order): Promise<void> {
    const events = order.getUncommittedEvents()
    if (events.length === 0) return

    const expectedVersion = order.version - events.length
    await this.eventStore.append(order.id, events, expectedVersion)
    order.clearUncommittedEvents()
  }
}
```

## Projections (Read Side — pairs with CQRS)

```ts
// Build read models by subscribing to events
class OrderSummaryProjection {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.type) {
      case 'OrderPlaced':
        await db.query(
          'INSERT INTO order_summaries (id, status, total, customer_id) VALUES ($1, $2, $3, $4)',
          [event.aggregateId, 'pending', event.payload.total, event.payload.customerId]
        )
        break
      case 'OrderShipped':
        await db.query(
          'UPDATE order_summaries SET status = $1 WHERE id = $2',
          ['shipped', event.aggregateId]
        )
        break
    }
  }
}
```

## Event Schema Evolution

- **Never rename or remove event fields** — old events must remain deserializable
- Add new optional fields only
- Use upcasters to transform old event versions at read time:

```ts
function upcastOrderPlaced(event: any): OrderPlacedEvent {
  if (event.version === 1 && !event.payload.currency) {
    return { ...event, payload: { ...event.payload, currency: 'BRL' } }
  }
  return event
}
```

## When to Use Event Sourcing

Use when you need:
- Full audit trail (finance, healthcare, legal)
- Temporal queries ("what did the state look like on date X?")
- Event-driven integration between services
- Complex business rules with multiple state transitions

Avoid when:
- Simple CRUD with no audit requirements
- Team unfamiliar with the pattern (high learning curve)
- Simple read-heavy workloads
