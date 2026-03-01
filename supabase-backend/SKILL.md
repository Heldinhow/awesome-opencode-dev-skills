---
name: supabase-backend
description: "Build backend services using Supabase for database, auth, and real-time features."
---

# Supabase Backend

## Overview
Supabase provides an open-source Firebase alternative with PostgreSQL, authentication, and real-time capabilities. This skill should be invoked when building backends needing quick setup, real-time features, or PostgreSQL power.

## Core Principles
- **PostgreSQL Power**: Full PostgreSQL capabilities
- **Row Level Security**: Fine-grained access control
- **Real-Time**: Live subscriptions to database changes
- **Auth Built-in**: User authentication included

## Preparation Checklist
- [ ] Create Supabase project
- [ ] Design database schema
- [ ] Plan RLS policies
- [ ] Choose authentication providers

## Step-by-Step Process
1. **Setup**: Create Supabase project
2. **Schema**: Define tables and relationships
3. **RLS**: Configure Row Level Security policies
4. **Auth**: Set up authentication
5. **Real-Time**: Implement subscriptions
6. **Deploy**: Connect frontend

## Do's and Don'ts
- ✅ **Do** use RLS for all tables
- ✅ **Do** design proper schema
- ✅ **Do** leverage real-time features
- ❌ **Don't** skip RLS policies
- ❌ **Don't** expose admin keys
- ❌ **Don't** ignore vendor lock-in

## Anti-Patterns
- **No RLS**: Leaving tables unprotected
- **Admin Exposure**: Using service role incorrectly
- **Poor Schema**: Not using proper PostgreSQL
- **No Backups**: Not planning data recovery
