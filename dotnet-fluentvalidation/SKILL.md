---
name: dotnet-fluentvalidation
description: FluentValidation for .NET. Use when validating input models, commands, DTOs, or needing declarative validation rules.
metadata:
  clawdbot:
    emoji: "✅"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# FluentValidation for .NET

FluentValidation provides a fluent interface for building strongly-typed validation rules.

## When to Use

- Validating input DTOs or commands
- Complex validation logic with multiple rules
- Need for custom validators
- Integration with MediatR pipeline

## Installation

```bash
dotnet add package FluentValidation
dotnet add package FluentValidation.DependencyInjectionExtensions
```

## Basic Setup

```csharp
// Program.cs
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
```

## Simple Validator

```csharp
public class CreateProductCommandValidator 
    : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Product name is required")
            .MaximumLength(100)
            .WithMessage("Name cannot exceed 100 characters");
            
        RuleFor(x => x.Price)
            .GreaterThan(0)
            .WithMessage("Price must be greater than zero");
            
        RuleFor(x => x.Description)
            .MaximumLength(500)
            .When(x => x.Description is not null);
    }
}
```

## Using with MediatR Pipeline

```csharp
// 1. Create validator
public class CreateOrderCommandValidator 
    : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.CustomerName)
            .NotEmpty()
            .MinimumLength(2);
            
        RuleFor(x => x.Items)
            .NotEmpty()
            .WithMessage("Order must have at least one item");
            
        RuleForEach(x => x.Items)
            .SetValidator(new OrderItemValidator());
    }
}

// 2. Create pipeline behavior
public class ValidationBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;
    
    public ValidationBehavior(
        IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }
    
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any()) 
            return await next();
            
        var context = new ValidationContext<TRequest>(request);
        
        var validationResults = await Task.WhenAll(
            _validators.Select(v => v.ValidateAsync(context, cancellationToken)));
            
        var failures = validationResults
            .SelectMany(r => r.Errors)
            .Where(f => f is not null)
            .ToList();
            
        if (failures.Any())
            throw new ValidationException(failures);
            
        return await next();
    }
}
```

## Common Rules

| Rule | Usage |
|------|-------|
| `NotEmpty()` | Field is required |
| `NotNull()` | Value is not null |
| `Length(min, max)` | String length |
| `GreaterThan/LessThan` | Numeric comparisons |
| `EmailAddress()` | Email format |
| `Matches(regex)` | Regex pattern |
| `InclusiveBetween(range)` | Range validation |
| `Must(condition)` | Custom rule |
| `When(condition)` | Conditional rules |

## Custom Validators

```csharp
public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(x => x)
            .Must(x => x.ShippingAddress != x.BillingAddress)
            .WithMessage("Shipping and billing addresses must be different")
            .When(x => x.IsClickAndCollect == false);
    }
}
```

## Collection Validation

```csharp
RuleForEach(x => x.Items)
    .SetValidator(new OrderItemValidator());
    
RuleFor(x => x.Items)
    .Must(items => items.Count <= 100)
    .WithMessage("Maximum 100 items allowed");
```

## Async Validation

```csharp
RuleFor(x => x.Email)
    .MustAsync(async (email, cancellation) =>
    {
        return await !await _userService.EmailExistsAsync(email, cancellation);
    })
    .WithMessage("Email already exists");
```
