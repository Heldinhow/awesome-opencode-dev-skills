---
name: graphql-api
description: "Design and implement GraphQL APIs with proper schema design, resolvers, and best practices."
---

# GraphQL API

## Overview
GraphQL provides a flexible query language for APIs with precise data requirements. This skill should be invoked when building flexible APIs needing nested data fetching, multiple data source aggregation, or client-controlled queries.

## Core Principles
- **Schema-Driven**: Define types, queries, mutations in schema
- **Resolver Implementation**: Map schema fields to data sources
- **DataLoader**: Prevent N+1 queries with batching
- **Validation**: Validate inputs and handle errors properly

## Preparation Checklist
- [ ] Choose GraphQL server (Apollo, GraphQL Yoga, Mercury)
- [ ] Design schema with types, queries, mutations
- [ ] Plan resolver structure
- [ ] Set up DataLoader for optimization

## Step-by-Step Process
1. **Define Schema**: Write SDL with types, queries, mutations
2. **Implement Resolvers**: Create resolver functions
3. **Optimize**: Add DataLoader for batching
4. **Validate**: Add input validation
5. **Document**: Set up Playground/GraphiQL
6. **Monitor**: Add query complexity analysis

## Do's and Don'ts
- ✅ **Do** use DataLoader to prevent N+1 queries
- ✅ **Do** validate all inputs
- ✅ **Do** set query complexity limits
- ❌ **Don't** expose internal database IDs
- ❌ **Don't** skip error handling
- ❌ **Don't** allow unbounded queries

## Anti-Patterns
- **N+1 Queries**: Not using DataLoader
- **No Limits**: Allowing unbounded queries
- **Internal Exposure**: Leaking implementation details
- **Error Leaks**: Exposing stack traces
