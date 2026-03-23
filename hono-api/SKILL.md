---
name: hono-api
description: Use when building APIs with Hono framework on Bun, Deno, Node.js, Cloudflare Workers, or Vercel Edge. Covers routing, middleware, validation with Zod, RPC client, and deployment patterns.
---

# Hono API

## Setup

```bash
# Bun
bun create hono@latest my-app
# or add to existing
bun add hono

# Node.js
bun add hono @hono/node-server
```

## Basic App

```ts
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())
app.use('*', prettyJSON())

// Routes
app.get('/', (c) => c.text('Hello Hono!'))
app.get('/health', (c) => c.json({ status: 'ok' }))

// Bun
export default app

// Node.js
import { serve } from '@hono/node-server'
serve({ fetch: app.fetch, port: 3000 })
```

## Routing

```ts
const app = new Hono()

// Methods
app.get('/users', handler)
app.post('/users', handler)
app.put('/users/:id', handler)
app.patch('/users/:id', handler)
app.delete('/users/:id', handler)

// Params, query, body
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page') ?? '1'
  return c.json({ id, page })
})

app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({ created: body }, 201)
})

// Route groups
const api = new Hono().basePath('/api')
const users = new Hono()
users.get('/', listUsers)
users.post('/', createUser)
users.get('/:id', getUser)
api.route('/users', users)
app.route('/', api)
```

## Validation with Zod Validator

```bash
bun add @hono/zod-validator zod
```

```ts
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0).optional(),
})

app.post('/users',
  zValidator('json', createUserSchema),
  async (c) => {
    const data = c.req.valid('json') // fully typed
    // create user...
    return c.json({ id: 1, ...data }, 201)
  }
)

// Query validation
const querySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().max(100).default(20),
})

app.get('/users', zValidator('query', querySchema), (c) => {
  const { page, limit } = c.req.valid('query')
  return c.json({ page, limit })
})
```

## Middleware

```ts
// Auth middleware
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) throw new HTTPException(401, { message: 'Unauthorized' })

  const user = await verifyToken(token)
  c.set('user', user) // set context variable
  await next()
})

app.use('/api/*', authMiddleware)
app.get('/api/me', (c) => {
  const user = c.get('user')
  return c.json(user)
})
```

## RPC Client (type-safe)

```ts
// server: export route type
const route = app.get('/users/:id', zValidator('param', z.object({ id: z.string() })), (c) => {
  return c.json({ id: c.req.valid('param').id, name: 'Alice' })
})
export type AppType = typeof route

// client: fully typed
import { hc } from 'hono/client'
import type { AppType } from './server'

const client = hc<AppType>('http://localhost:3000')
const res = await client.users[':id'].$get({ param: { id: '1' } })
const data = await res.json() // typed: { id: string, name: string }
```

## Error Handling

```ts
import { HTTPException } from 'hono/http-exception'

// Throw typed HTTP errors anywhere
app.get('/users/:id', async (c) => {
  const user = await db.findUser(c.req.param('id'))
  if (!user) throw new HTTPException(404, { message: 'User not found' })
  return c.json(user)
})

// Global error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

// 404 handler
app.notFound((c) => c.json({ error: 'Not found' }, 404))
```

## Cloudflare Workers

```ts
// Compatible out of the box — just export default app
// wrangler.toml
// name = "my-api"
// compatibility_date = "2025-01-01"

export default app

// Access CF bindings
app.get('/kv', async (c) => {
  const value = await c.env.MY_KV.get('key')
  return c.json({ value })
})
```

## Context Variables (Type-safe)

```ts
type Variables = {
  user: { id: string; email: string }
}

const app = new Hono<{ Variables: Variables }>()
```
