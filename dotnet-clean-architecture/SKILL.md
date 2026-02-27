---
name: dotnet-clean-architecture
description: Clean Architecture for .NET. Use when building maintainable, testable, and scalable applications with proper layer separation.

# Clean Architecture for .NET

Clean Architecture separates concerns into layers with clear dependencies pointing inward.

## When to Use

- Building enterprise applications
- Need for testability and maintainability
- Complex business logic
- Long-term projects that will evolve

## Layer Structure

```
src/
├── Domain/                 # Core business logic (innermost)
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Enums/
│   └── Interfaces/
│
├── Application/          # Use cases, DTOs, interfaces
│   ├── Commands/
│   ├── Queries/
│   ├── DTOs/
│   ├── Interfaces/
│   └── Services/
│
├── Infrastructure/        # External concerns
│   ├── Persistence/
│   │   └── DbContext/
│   ├── Repositories/
│   └── Services/
│
└── Presentation/         # API layer
    ├── Controllers/
    ├── Endpoints/
    └── Filters/
```

## Dependency Rule

```
Presentation → Application → Domain ← Infrastructure
                         ↑
                    (Dependency Inversion)
```

- **Domain** - No dependencies on other layers
- **Application** - Depends only on Domain
- **Infrastructure** - Implements Domain interfaces
- **Presentation** - Depends on Application

## Domain Layer

```csharp
// Domain/Entities/Product.cs
public class Product
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public decimal Price { get; private set; }
    public DateTime CreatedAt { get; private set; }
    
    private Product() { } // EF Core
    
    public Product(string name, decimal price)
    {
        Name = name;
        Price = price;
        CreatedAt = DateTime.UtcNow;
    }
    
    public void UpdatePrice(decimal newPrice)
    {
        if (newPrice <= 0)
            throw new ArgumentException("Price must be positive");
        Price = newPrice;
    }
}

// Domain/Interfaces/IProductRepository.cs
public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<List<Product>> GetAllAsync(CancellationToken ct = default);
    Task<Product> AddAsync(Product product, CancellationToken ct = default);
    Task UpdateAsync(Product product, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
```

## Application Layer

```csharp
// Application/Commands/CreateProductCommand.cs
public record CreateProductCommand(
    string Name,
    decimal Price,
    string? Description
) : IRequest<Product>;

// Application/Handlers/CreateProductHandler.cs
public class CreateProductHandler 
    : IRequestHandler<CreateProductCommand, Product>
{
    private readonly IProductRepository _repository;
    
    public CreateProductHandler(IProductRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<Product> Handle(
        CreateProductCommand request, 
        CancellationToken ct)
    {
        var product = new Product(request.Name, request.Price);
        
        if (!string.IsNullOrEmpty(request.Description))
        {
            // Business logic here
        }
        
        await _repository.AddAsync(product, ct);
        return product;
    }
}
```

## Infrastructure Layer

```csharp
// Infrastructure/Persistence/AppDbContext.cs
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }
    
    public DbSet<Product> Products => Set<Product>();
    
    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.Entity<Product>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Name).IsRequired().HasMaxLength(100);
            e.Property(p => p.Price).HasPrecision(18, 2);
        });
    }
}

// Infrastructure/Repositories/ProductRepository.cs
public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;
    
    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Product?> GetByIdAsync(int id, CancellationToken ct)
        => await _context.Products.FindAsync(new object[] { id }, ct);
    
    public async Task<List<Product>> GetAllAsync(CancellationToken ct)
        => await _context.Products.ToListAsync(ct);
    
    public async Task<Product> AddAsync(Product product, CancellationToken ct)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync(ct);
        return product;
    }
}
```

## Presentation Layer

```csharp
// Presentation/Endpoints/ProductEndpoints.cs
public class ProductEndpoints : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/products", GetAllProducts);
        app.MapPost("/products", CreateProduct);
    }
    
    private static async Task<IResult> GetAllProducts(
        IMediator mediator,
        CancellationToken ct)
    {
        var products = await mediator.Send(new GetAllProductsQuery(), ct);
        return Results.Ok(products);
    }
    
    private static async Task<IResult> CreateProduct(
        CreateProductCommand command,
        IMediator mediator,
        CancellationToken ct)
    {
        var product = await mediator.Send(command, ct);
        return Results.Created($"/products/{product.Id}", product);
    }
}
```

## Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Add repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Add MediatR
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(CreateProductCommand).Assembly));

// Add Carter
builder.Services.AddCarter();

var app = builder.Build();

app.MapCarter();

app.Run();
```

## Testing Benefits

| Layer | What to Test |
|-------|--------------|
| **Domain** | Entities, business rules - No dependencies |
| **Application** | Handlers, services - Mock dependencies |
| **Infrastructure** | Repository implementations - Integration tests |
| **Presentation** | Endpoints - Integration tests |

## Best Practices

1. **Keep Domain clean** - No external dependencies
2. **Use interfaces** - Dependency inversion everywhere
3. **One responsibility per layer** - Don't mix concerns
4. **Test from outside in** - Acceptance tests first
5. **Use DTOs** - Don't expose entities directly
