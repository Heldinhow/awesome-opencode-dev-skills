---
name: nestjs-api
description: "Build scalable Node.js APIs using NestJS framework with TypeScript."
---

# NestJS API Development

## Overview
NestJS is a progressive Node.js framework for building scalable, enterprise-grade applications using TypeScript. This skill should be invoked when creating enterprise Node.js APIs, microservices, or backend applications that require strong architecture, dependency injection, and modular organization.

## Core Principles
- **Modular Architecture**: Organize code into modules that encapsulate related functionality
- **Dependency Injection**: Leverage NestJS's built-in DI container for loose coupling
- **Decorator-Based**: Use decorators for routing, validation, and authentication
- **TypeScript First**: Benefit from full TypeScript support with static typing

## Preparation Checklist
- [ ] Initialize NestJS project: `nest new project-name`
- [ ] Plan module structure (users, products, orders, etc.)
- [ ] Choose database integration (TypeORM, Prisma, Mongoose)
- [ ] Decide on validation approach (class-validator, built-in pipes)

## Step-by-Step Process
1. **Initialize**: Create new NestJS project
2. **Generate Modules**: Use CLI to create modules: `nest g module users`
3. **Create Components**: Generate controllers and services
4. **Configure DI**: Set up providers and injections
5. **Add Validation**: Implement validation pipes for request bodies
6. **Integrate Database**: Connect TypeORM/Prisma for data persistence

## Do's and Don'ts
- ✅ **Do** use the CLI for generating components to maintain convention
- ✅ **Do** keep business logic in services, not controllers
- ✅ **Do** use guards for authorization and interceptors for logging
- ❌ **Don't** put all logic in one module - loses architectural benefits
- ❌ **Don't** skip validation - always validate incoming data
- ❌ **Don't** ignore exception filters for consistent error handling

## Anti-Patterns
- **The Monolith Module**: Putting everything in a single module
- **Logic in Controllers**: Adding business logic directly in controller methods
- **Missing Error Handling**: Not implementing global exception filters
- **No Validation**: Accepting user input without validation pipes
