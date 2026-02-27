---
name: dotnet-carter
description: Carter for .NET. Use when building minimal APIs with declarative routing, route grouping, and clean endpoint definitions.

# Carter for .NET

Carter is a framework that provides a minimal API experience with routing declarations.

## When to Use

- Building minimal APIs with cleaner syntax
- Needing declarative route definitions
- Wanting middleware support in minimal APIs
- Creating REST APIs with organized endpoints

## Installation

```bash
dotnet add package Carter
dotnet add package Carter.Extensions.Microsoft
```

## Basic Setup

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCarter();
builder.Services.AddEndpoints();

var app = builder.Build();

app.MapCarter();

app.Run();
```

## Define Routes

```csharp
// Modules/ProductsModule.cs
public class ProductsModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/products", GetAllProducts);
        app.MapGet("/products/{id:int}", GetProduct);
        app.MapPost("/products", CreateProduct);
        app.MapPut("/products/{id:int}", UpdateProduct);
        app.MapDelete("/products/{id:int}", DeleteProduct);
    }
    
    private static async Task<IResult> GetAllProducts(
        IProductRepository repository,
        CancellationToken ct)
    {
        var products = await repository.GetAllAsync(ct);
        return Results.Ok(products);
    }
    
    private static async Task<IResult> GetProduct(
        int id,
        IProductRepository repository,
        CancellationToken ct)
    {
        var product = await repository.GetByIdAsync(id, ct);
        return product is null 
            ? Results.NotFound() 
            : Results.Ok(product);
    }
    
    private static async Task<IResult> CreateProduct(
        CreateProductRequest request,
        IProductRepository repository,
        CancellationToken ct)
    {
        var product = await repository.CreateAsync(request, ct);
        return Results.Created($"/products/{product.Id}", product);
    }
}
```

## With MediatR

```csharp
public class OrdersModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/orders", CreateOrder);
    }
    
    private static async Task<IResult> CreateOrder(
        CreateOrderCommand command,
        IMediator mediator,
        CancellationToken ct)
    {
        var result = await mediator.Send(command, ct);
        return Results.Created($"/orders/{result.Id}", result);
    }
}
```

## Route Grouping

```csharp
public class ApiV1Module : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.Group<ApiV1Group>("/api/v1");
    }
}

public class ApiV1Group : RouteGroup
{
    public ApiV1Group(string prefix) : base(prefix) { }
    
    public override void MapRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
        app.MapGet("/version", () => Results.Ok("1.0.0"));
    }
}
```

## With Authorization

```csharp
public class SecureModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/secure-data", GetSecureData)
            .RequireAuthorization();
    }
    
    private static async Task<IResult> GetSecureData(
        ClaimsPrincipal user)
    {
        return Results.Ok(new 
        { 
            user = user.Identity?.Name,
            message = "This is secure data" 
        });
    }
}
```

## Validation with FluentValidation

```csharp
public class UsersModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/users", CreateUser)
            .WithValidator<CreateUserRequest>();
    }
    
    private static async Task<IResult> CreateUser(
        CreateUserRequest request,
        IUserRepository repository,
        CancellationToken ct)
    {
        var user = await repository.CreateAsync(request, ct);
        return Results.Created($"/users/{user.Id}", user);
    }
}
```

## Response Types

```csharp
// JSON
return Results.Ok(product);

// Created
return Results.Created($"/products/{product.Id}", product);

// No Content
return Results.NoContent();

// Not Found
return Results.NotFound();

// Bad Request
return Results.BadRequest(new { error = "Invalid input" });

// Custom Status
return Results.StatusCode(418);
```

## Advantages over Standard Minimal APIs

| Feature | Carter | Standard Minimal API |
|---------|--------|---------------------|
| Declarative Routes | ✅ | ❌ |
| Route Grouping | ✅ | ⚠️ Limited |
| Module Organization | ✅ | ❌ |
| Fluent Syntax | ✅ | ✅ |
