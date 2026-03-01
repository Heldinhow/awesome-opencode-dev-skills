---
name: elasticsearch-search
description: "Implement full-text search capabilities using Elasticsearch for scalable search solutions."
---

# Elasticsearch Search

## Overview
Elasticsearch provides powerful full-text search with ranking, filtering, and aggregations. This skill should be invoked when building search engines, implementing faceted search, or needing scalable full-text search capabilities.

## Core Principles
- **Index Design**: Plan mappings and analyzers for search effectiveness
- **Query DSL**: Use Elasticsearch's powerful query language
- **Relevance**: Leverage scoring for ranked results
- **Aggregations**: Build faceted search and analytics

## Preparation Checklist
- [ ] Set up Elasticsearch cluster (local or cloud)
- [ ] Plan index structure and mappings
- [ ] Choose appropriate analyzers
- [ ] Design query patterns

## Step-by-Step Process
1. **Setup**: Install and configure Elasticsearch
2. **Define**: Create index with mappings
3. **Index**: Add documents with proper field types
4. **Query**: Build search queries (match, term, bool)
5. **Aggregate**: Implement aggregations for facets
6. **Optimize**: Tune for performance

## Do's and Don'ts
- ✅ **Do** design mappings before indexing
- ✅ **Do** use appropriate analyzers for text fields
- ✅ **Do** leverage aggregations for faceted search
- ❌ **Don't** index everything - only searchable fields
- ❌ **Don't** skip index refresh intervals
- ❌ **Don't** ignore shard/replica planning

## Anti-Patterns
- **No Mapping**: Letting Elasticsearch infer types
- **Over-Indexing**: Indexing unnecessary data
- **Missing Aliases**: Not using aliases for zero-downtime
- **No Backups**: Not planning for data recovery
