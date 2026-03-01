---
name: database-migrations
description: "Manage database schema changes using migration tools and version control."
---

# Database Migrations

## Overview
Database migrations manage schema changes in a controlled, versioned manner, enabling safe evolution of database structure. This skill should be invoked when evolving database schema, managing team database development, or rolling back problematic changes.

## Core Principles
- **Version Control**: Store migrations in version control alongside code
- **Idempotency**: Migrations should be safe to run multiple times
- **Forward and Backward**: Support both applying and rolling back changes
- **Small Batches**: Prefer small, focused migrations over large ones

## Preparation Checklist
- [ ] Choose migration tool (Alembic, Prisma, TypeORM, Flyway)
- [ ] Initialize migration system in project
- [ ] Set up migration tracking table
- [ ] Define naming convention for migrations

## Step-by-Step Process
1. **Initialize**: Set up migration system for your ORM/tool
2. **Create**: Generate migration file for schema changes
3. **Review**: Verify migration SQL before applying
4. **Run**: Execute migrations in correct order
5. **Rollback**: Test rollback procedures
6. **Verify**: Confirm migration success

## Do's and Don'ts
- ✅ **Do** test migrations in staging before production
- ✅ **Do** back up production database before running migrations
- ✅ **Do** keep migrations small and focused
- ❌ **Don't** edit applied migrations - create new ones
- ❌ **Don't** skip testing rollbacks
- ❌ **Don't** run manual SQL outside of migrations

## Anti-Patterns
- **Manual Changes**: Making schema changes directly in production
- **Lost Migrations**: Not version-controlling migration files
- **No Rollback**: Not planning for reversibility
- **Large Migrations**: Trying to do too much in one migration
