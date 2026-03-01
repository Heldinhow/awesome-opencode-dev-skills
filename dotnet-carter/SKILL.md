---
name: dotnet-carter
description: "Build minimal .NET APIs using Carter framework with declarative routing."
---

# .NET Carter Framework

## Overview
Carter is a framework that provides minimal API functionality with declarative, organized routing for .NET applications. This skill should be invoked when building lightweight REST APIs in .NET that benefit from cleaner route definitions compared to traditional controller-based approaches. Carter is ideal for microservices and small-to-medium APIs where you want reduced boilerplate.

## Core Principles
- **Declarative Routing**: Define routes using fluent methods rather than attributes, improving readability
- **Module Organization**: Group related routes into module classes implementing ICarterModule
- **Minimal Footprint**: Carter adds minimal overhead compared to full MVC frameworks
- **Composition**: Modules can be composed together, enabling clean separation of concerns

## Preparation Checklist
- [ ] Install Carter NuGet package: `Install-Package Carter`
- [ ] Understand the endpoint routing model in .NET
- [ ] Plan your route module organization by domain/feature
- [ ] Decide if you need MediatR integration for command/query separation

## Step-by-Step Process
1. **Install Package**: Add Carter to your .NET project
2. **Create Module**: Create a class implementing ICarterModule
3. **Define Routes**: Use Before and After hooks, and route methods (Get, Post, Put, Delete)
4. **Configure**: Register the module in Program.cs with AddCarter()
5. **Add Grouping**: Use RouteGroupBuilder to organize related endpoints
6. **Optional Integration**: Add MediatR for request handling if needed

## Do's and Don'ts
- ✅ **Do** organize endpoints by feature/domain in separate modules
- ✅ **Do** use request/response DTOs for strong typing
- ✅ **Do** leverage Carter's Before/After hooks for logging, auth checks
- ❌ **Don't** put all routes in a single huge module - lose organization benefits
- ❌ **Don't** skip validation - Carter doesn't include built-in model validation
- ❌ **Don't** use Carter for complex scenarios where MVC's feature set is needed

## Anti-Patterns
- **The Monolith Module**: Putting all endpoints in one massive CarterModule
- **Ignoring Error Handling**: Not implementing global exception handling middleware
- **Missing Health Checks**: Not adding /health endpoint for container orchestration
- **No Versioning**: Not planning for API versioning from the start
