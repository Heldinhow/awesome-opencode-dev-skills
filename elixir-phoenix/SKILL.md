---
name: elixir-phoenix
description: "Build scalable web applications using Elixir Phoenix framework."
---

# Elixir Phoenix

## Overview
Phoenix is a productive web framework for Elixir that builds on Erlang's strengths. This skill should be invoked when building scalable web applications that benefit from Elixir's concurrency model and Phoenix's real-time capabilities.

## Core Principles
- **Conventions**: Follow Phoenix conventions for structure
- **Context**: Use contexts to encapsulate business logic
- **LiveView**: Leverage LiveView for real-time features
- **Ecto**: Use Ecto for database interactions

## Preparation Checklist
- [ ] Install Elixir and Phoenix
- [ ] Design application structure
- [ ] Plan contexts and schemas
- [ ] Set up database

## Step-by-Step Process
1. **Install**: Run `mix phx.new`
2. **Generate**: Create resources with generators
3. **Context**: Build business logic contexts
4. **Views**: Create views and templates
5. **LiveView**: Add real-time with LiveView
6. **Deploy**: Configure for deployment

## Do's and Don'ts
- ✅ **Do** use contexts for business logic
- ✅ **Do** leverage LiveView for interactivity
- ✅ **Do** follow Phoenix conventions
- ❌ **Don't** put logic in views
- ❌ **Don't** skip Ecto for complex queries
- ❌ **Don't** ignore Phoenix documentation

## Anti-Patterns
- **Fat Controllers**: Putting logic in controllers
- **No Contexts**: Not using application contexts
- **Missing LiveView**: Not leveraging real-time
- **Skip Testing**: Not writing Elixir tests
