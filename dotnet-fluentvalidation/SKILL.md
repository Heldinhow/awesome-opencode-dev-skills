---
name: dotnet-fluentvalidation
description: "Implement declarative validation rules using FluentValidation in .NET."
---

# FluentValidation

## Overview
FluentValidation provides a fluent interface for building validation rules in .NET applications. This skill should be invoked when validating input models, commands, DTOs, or implementing complex validation logic with clean, readable code.

## Core Principles
- **Fluent API**: Chain validation rules for readability
- **Separation**: Keep validators in dedicated classes
- **Composition**: Combine validators with And/Or
- **Integration**: Works seamlessly with MediatR

## Preparation Checklist
- [ ] Install FluentValidation: `dotnet add package FluentValidation`
- [ ] Install ASP.NET integration: `dotnet add package FluentValidation.AspNetCore`
- [ ] Plan validation for each input model
- [ ] Set up dependency injection

## Step-by-Step Process
1. **Install**: Add FluentValidation packages
2. **Create**: Make validator class inheriting from AbstractValidator<T>
3. **Define**: Add validation rules in constructor
4. **Register**: Add to DI container
5. **Integrate**: Use in controller or MediatR pipeline
6. **Handle**: Process validation errors

## Do's and Don'ts
- ✅ **Do** create one validator per type
- ✅ **Do** use custom validators for complex rules
- ✅ **Do** integrate with MediatR pipeline
- ❌ **Don't** duplicate validation logic
- ❌ **Don't** put business logic in validators
- ❌ **Don't** skip registration in DI

## Anti-Patterns
- **Duplicate Logic**: Validating in multiple places
- **Business Logic**: Including business rules in validators
- **No Integration**: Not connecting validators to pipeline
- **Complex Chains**: Overly complex rule chains
