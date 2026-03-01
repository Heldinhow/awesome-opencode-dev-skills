---
name: dotnet-cqrs
description: "Implement CQRS (Command Query Responsibility Segregation) pattern in .NET for separated read/write operations."
---

# .NET CQRS Pattern

## Overview
CQRS separates read and write operations into different models, allowing optimization of each. This skill should be invoked when building scalable architectures that need different models for reads and writes, or complex business logic that benefits from separation.

## Core Principles
- **Separation**: Commands (writes) and Queries (reads) use different models
- **Optimization**: Each side can be optimized independently
- **Mediator Pattern**: Use MediatR for decoupling handlers
- **Explicit Intent**: Operations are clearly commands or queries

## Preparation Checklist
- [ ] Understand CQRS benefits and trade-offs
- [ ] Plan command and query boundaries
- [ ] Choose implementation approach (with/without MediatR)
- [ ] Define DTOs for responses

## Step-by-Step Process
1. **Define Objects**: Create command and query classes
2. **Command Handlers**: Implement handlers for write operations
3. **Query Handlers**: Implement handlers for read operations
4. **Wire Up**: Connect handlers via MediatR or direct
5. **DTOs**: Return DTOs from queries, entities from commands
6. **Execute**: API endpoints call appropriate handlers

## Do's and Don'ts
- ✅ **Do** use MediatR for clean decoupling
- ✅ **Do** keep commands and queries separate
- ✅ **Do** return optimized DTOs for queries
- ❌ **Don't** use CQRS for simple CRUD
- ❌ **Don't** share models between commands and queries unnecessarily
- ❌ **Don't** over-engineer simple scenarios

## Anti-Patterns
- **Fake CQRS**: Using same models for everything
- **Over-Separation**: Applying CQRS where not needed
- **No Mediator**: Tight coupling without decoupling
- **Complex Models**: Over-complicated DTOs
