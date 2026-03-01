---
name: dotnet-mediatr
description: "Implement MediatR mediator pattern in .NET for decoupled request handling."
---

# MediatR Pattern

## Overview
MediatR is a mediator pattern implementation that enables decoupled request handling in .NET. This skill should be invoked when implementing CQRS, needing decoupled handlers, or requiring pipeline behaviors for cross-cutting concerns.

## Core Principles
- **Mediator Pattern**: Decouple senders from receivers
- **Request/Handler**: Each request has one handler
- **Pipeline Behaviors**: Add cross-cutting concerns (logging, validation)
- **Notification Patterns**: Support for publish/subscribe

## Preparation Checklist
- [ ] Install MediatR: `dotnet add package MediatR`
- [ ] Install DI extensions: `dotnet add package MediatR.Extensions.Microsoft.DependencyInjection`
- [ ] Plan request/command structure
- [ ] Configure in Program.cs

## Step-by-Step Process
1. **Install**: Add MediatR packages
2. **Define**: Create request/command records
3. **Implement**: Build request handlers
4. **Behaviors**: Add pipeline behaviors
5. **Register**: Configure in DI
6. **Use**: Inject MediatR in controllers

## Do's and Don'ts
- ✅ **Do** use for CQRS implementations
- ✅ **Do** add pipeline behaviors for logging, validation
- ✅ **Do** keep handlers focused and single-purpose
- ❌ **Don't** use for simple direct calls
- ❌ **Don't** skip pipeline behaviors when needed
- ❌ **Don't** over-abstract simple scenarios

## Anti-Patterns
- **Over-Abstraction**: Using MediatR for everything
- **Fat Handlers**: Putting too much in handlers
- **No Behaviors**: Ignoring pipeline behaviors
- **Tight Coupling**: Not using interface abstraction
