---
name: dotnet-cqrs
description: CQRS (Command Query Responsibility Segregation) pattern for .NET. Use when implementing separated read/write operations, command handlers, query handlers, or needing scalable architecture.
metadata:
  clawdbot:
    emoji: "⚡"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# CQRS Pattern for .NET

CQRS separates read (queries) and write (commands) operations for better scalability and maintainability.

## When to Use

- Building scalable APIs with different read/write models
- Needing different data models for reads vs writes
- Implementing event sourcing
- Complex business logic that benefits from separation

## Core Structure

```
src/
├── Domain/
│   └── Entities/
├── Application/
│   ├── Commands/           # Write operations
│   │   ├── CreateXxxCommand.cs
│   │   └── XxxCommandHandler.cs
│   └── Queries/            # Read operations
│       ├── GetXxxQuery.cs
│       └── XxxQueryHandler.cs
├── Infrastructure/
└── Presentation/
```

## Command Pattern

```csharp
// Command
public record CreateProductCommand(
    string Name,
    decimal Price,
    string Description
) : IRequest<Product>;

// Handler
public class CreateProductHandler 
    : IRequestHandler<CreateProductCommand, Product>
{
    private readonly IApplicationDbContext _context;
    
    public async Task<Product> Handle(
        CreateProductCommand request, 
        CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = request.Name,
            Price = request.Price,
            Description = request.Description
        };
        
        _context.Products.Add(product);
        await _context.SaveChangesAsync(cancellationToken);
        
        return product;
    }
}
```

## Query Pattern

```csharp
// Query
public record GetProductByIdQuery(int Id) 
    : IRequest<Product?>;

// Handler
public class GetProductByIdHandler 
    : IRequestHandler<GetProductByIdQuery, Product?>
{
    private readonly IApplicationDbContext _context;
    
    public async Task<Product?> Handle(
        GetProductByIdQuery request, 
        CancellationToken cancellationToken)
    {
        return await _context.Products
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
    }
}
```

## Using with MediatR

```csharp
// In your controller or endpoint
[HttpPost]
public async Task<ActionResult<Product>> Create(
    CreateProductCommand command,
    IMediator mediator)
{
    var product = await mediator.Send(command);
    return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
}
```

## Key Principles

1. **Commands** - Change state, return single result
2. **Queries** - Read data, no side effects
3. **Separate Models** - Different DTOs for commands vs queries
4. **Validation** - Commands validated before execution

## Best Practices

- Use records for Commands and Queries (immutable)
- One handler per Command/Query
- Return DTOs, not entities, from queries
- Use cancellation tokens everywhere
