---
name: dotnet-cqrs
description: "Implement CQRS (Command Query Responsibility Segregation) pattern in .NET for separated read/write operations."
---

# dotnet-cqrs

## Overview
When you need scalable architectures with different models for reads and writes

## Process
1. Define separate command and query objects
2. Implement command handlers for write operations
3. Implement query handlers for read operations
4. Use MediatR for decoupling
5. Return DTOs from queries, entities from commands

## Examples
- Scalable APIs with different read/write models
- Event sourcing architectures
- Complex business logic separation

## Limitations
Overkill for simple CRUD applications
