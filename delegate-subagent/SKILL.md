---
name: delegate-subagent
description: Delegate tasks to a single subagent for focused execution.
---

# Delegate to Subagent

Delegate a specific task to a subagent for focused execution.

## Overview

Instead of doing everything yourself, delegate a focused task to a specialized subagent.

## When to Use

- When a task needs focused attention
- When you need specialized knowledge
- When task is independent
- To keep your context clean

## Basic Delegation

```bash
# Delegate to subagent
delegate "task description"
```

## Patterns

### 1. Direct Delegation

```bash
delegate "Create user authentication"
```

### 2. With Context

```bash
delegate "Add tests for auth module" with context from tests/
```

### 3. Sequential Delegation

```bash
delegate "Create API"
delegate "Add tests"
delegate "Write docs"
```

## Best Practices

1. **Clear task** - Be specific about what you want
2. **Provide context** - Give relevant files/info
3. **Review result** - Always check the output
4. **Iterate** - Refine if needed
