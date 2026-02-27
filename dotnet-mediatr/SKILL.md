---
name: dotnet-mediatr
description: MediatR library for .NET. Use when implementing mediator pattern, CQRS, or needing to decouple request handling from controllers.

# MediatR Pattern for .NET

MediatR is a mediator pattern implementation that helps decouple request handling from your controllers/APIs.

## When to Use

- Implementing CQRS pattern
- Decoupling request handlers from controllers
- Building a pipeline for cross-cutting concerns (logging, validation, caching)
- Simplifying controllers to single lines of code

## Installation

```bash
dotnet add package MediatR
dotnet add package MediatR.Extensions.Microsoft.DependencyInjection
```

## Basic Setup

```csharp
// Program.cs
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
```

## Request/Response Pattern

```csharp
// 1. Define Request
public record GetCustomerByIdQuery(int Id) : IRequest<Customer?>;

// 2. Define Handler
public class GetCustomerByIdHandler 
    : IRequestHandler<GetCustomerByIdQuery, Customer?>
{
    private readonly AppDbContext _context;
    
    public GetCustomerByIdHandler(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Customer?> Handle(
        GetCustomerByIdQuery request, 
        CancellationToken cancellationToken)
    {
        return await _context.Customers.FindAsync(request.Id);
    }
}

// 3. Use in Controller
[HttpGet("{id}")]
public async Task<ActionResult<Customer>> Get(int id)
{
    var customer = await _mediator.Send(new GetCustomerByIdQuery(id));
    return customer is null ? NotFound() : Ok(customer);
}
```

## Command Pattern

```csharp
// Command
public record CreateOrderCommand(
    string CustomerName,
    List<OrderItemDto> Items
) : IRequest<Order>;

// Handler
public class CreateOrderHandler 
    : IRequestHandler<CreateOrderCommand, Order>
{
    private readonly AppDbContext _context;
    
    public async Task<Order> Handle(
        CreateOrderCommand request, 
        CancellationToken cancellationToken)
    {
        var order = new Order
        {
            CustomerName = request.CustomerName,
            Items = request.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };
        
        _context.Orders.Add(order);
        await _context.SaveChangesAsync(cancellationToken);
        
        return order;
    }
}
```

## Pipeline Behaviors

Add cross-cutting concerns:

```csharp
// Logging Behavior
public class LoggingBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;
    
    public LoggingBehavior(
        ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }
    
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        _logger.LogInformation("Handling {RequestName}", requestName);
        
        var response = await next();
        
        _logger.LogInformation("Handled {RequestName}", requestName);
        return response;
    }
}

// Register in DI
builder.Services.AddMediatR(cfg => 
{
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly);
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
});
```

## Common Pipeline Behaviors

1. **Logging** - Log all requests
2. **Validation** - Validate requests before handlers
3. **Caching** - Cache responses
4. **Performance** - Measure timing
5. **Error Handling** - Centralized exception handling

## One Request Per Handler

- Keep handlers focused on single responsibility
- Use records for requests (immutable)
- Include cancellation tokens
- Return specific response types
