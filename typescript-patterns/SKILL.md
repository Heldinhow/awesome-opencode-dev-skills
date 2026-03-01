---
name: typescript-patterns
description: "Apply TypeScript design patterns and idioms for type-safe, maintainable code."
---

# TypeScript Design Patterns

## Overview
TypeScript design patterns apply established software design principles within the TypeScript type system to create maintainable, reusable, and type-safe code. This skill should be invoked when writing TypeScript code requiring best practices, building reusable libraries, or creating well-typed application architectures.

## Core Principles
- **Type Safety**: Leverage TypeScript's static typing to catch errors at compile time
- **Generics**: Write reusable code that works with any type
- **Structural Typing**: Use interface composition over inheritance
- **Utility Types**: Leverage built-in utility types (Partial, Pick, Omit, etc.)

## Preparation Checklist
- [ ] Enable strict mode in tsconfig.json
- [ ] Plan type hierarchy for your domain
- [ ] Identify opportunities for generics
- [ ] Define error handling strategy

## Step-by-Step Process
1. **Define Types**: Create interfaces and types for domain models
2. **Apply Generics**: Refactor repetitive code into generic functions/classes
3. **Use Composition**: Build complex types from simpler ones
4. **Handle Errors**: Create discriminated unions for error handling
5. **Leverage Utilities**: Use Partial, Pick, Omit for type transformations
6. **Validate**: Ensure strict mode catches all type errors

## Do's and Don'ts
- ✅ **Do** enable strict mode in TypeScript config
- ✅ **Do** use discriminated unions for error handling
- ✅ **Do** prefer interfaces for object shapes, types for unions
- ❌ **Don't** use `any` - it defeats TypeScript's purpose
- ❌ **Don't** over-engineer simple scripts with complex generics
- ❌ **Don't** ignore generic constraints when needed

## Anti-Patterns
- **Any Abuser**: Using `any` to bypass type checking
- **Type Ignorance**: Not leveraging TypeScript's inference
- **Over-Generics**: Creating complex generic types that are hard to read
- **No Strictness**: Disabling strict checks that catch real bugs
