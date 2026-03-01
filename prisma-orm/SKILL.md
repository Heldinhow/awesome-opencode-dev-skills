---
name: prisma-orm
description: "Use Prisma ORM for type-safe database access in TypeScript/JavaScript applications."
---

# Prisma ORM

## Overview
Prisma provides type-safe database access with automatic migrations and a modern developer experience. This skill should be invoked when working with databases in TypeScript or Node.js applications that benefit from type safety and rapid development.

## Core Principles
- **Schema-Driven**: Define database schema in schema.prisma
- **Type Safety**: Generated types for all queries
- **Migration Support**: Version-controlled schema changes
- **Prisma Client**: Type-safe query API

## Preparation Checklist
- [ ] Initialize Prisma: `npm init prisma`
- [ ] Choose database (PostgreSQL, MySQL, SQLite)
- [ ] Design schema
- [ ] Configure connection string

## Step-by-Step Process
1. **Initialize**: Run `npm init prisma`
2. **Define Schema**: Write models in schema.prisma
3. **Generate**: Run `npx prisma generate`
4. **Migrate**: Apply schema with `npx prisma db push`
5. **Query**: Use Prisma Client for database operations
6. **Migrate**: Create migrations for schema changes

## Do's and Don'ts
- ✅ **Do** use Prisma Studio for debugging
- ✅ **Do** version control schema.prisma
- ✅ **Do** use transactions for multi-step operations
- ❌ **Don't** mix Prisma with raw SQL unnecessarily
- ❌ **Don't** skip migrations
- ❌ **Don't** ignore connection pooling

## Anti-Patterns
- **Mixed Queries**: Mixing Prisma with raw SQL
- **No Migrations**: Changing schema without migrations
- **Connection Leaks**: Not properly managing connections
- **Ignored Types**: Not leveraging generated types
