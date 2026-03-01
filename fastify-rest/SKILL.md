---
name: fastify-rest
description: "Build high-performance REST APIs using Fastify framework for Node.js."
---

# Fastify REST API

## Overview
Fastify is a high-performance web framework for Node.js with low overhead and built-in schema validation. This skill should be invoked when creating performant REST APIs that require high throughput, low latency, or strong type safety through schema validation.

## Core Principles
- **Schema First**: Define JSON schemas for validation and serialization
- **Plugin System**: Extend functionality through plugins
- **Performance**: Built for speed with minimal overhead
- **Type Safety**: Full TypeScript support with type inference

## Preparation Checklist
- [ ] Initialize project: `npm init fastify`
- [ ] Choose TypeScript or JavaScript
- [ ] Plan route structure and schemas
- [ ] Select required plugins

## Step-by-Step Process
1. **Initialize**: Create Fastify project
2. **Schema**: Define JSON schemas for routes
3. **Routes**: Implement route handlers
4. **Plugins**: Add functionality via plugins
5. **Configure**: Set up logging and error handling
6. **Start**: Run with `fastify.listen()`

## Do's and Don'ts
- ✅ **Do** use schemas for validation and serialization
- ✅ **Do** use plugins for feature organization
- ✅ **Do** leverage TypeScript for type safety
- ❌ **Don't** skip schema validation
- ❌ **Don't** ignore request validation errors
- ❌ **Don't** use Express middleware directly

## Anti-Patterns
- **No Schemas**: Skipping schema definition
- **Middleware Madness**: Using Express middleware without compatibility
- **Sync Plugins**: Creating blocking plugins
- **Missing Errors**: Not handling errors properly
