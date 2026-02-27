---
name: dispatching-parallel-agents
description: Run multiple independent tasks in parallel. Spawns separate processes for each task and aggregates results.
---

# Dispatching Parallel Agents

Run multiple independent tasks in parallel for faster execution.

## Overview

Dispatch multiple independent tasks to sub-agents running in parallel. This is powerful for:
- Fixing multiple unrelated bugs
- Building multiple features simultaneously  
- Running independent tests
- Processing multiple items

## When to Use

**Use when:**
- 3+ independent tasks that can run concurrently
- Each task is self-contained
- No shared state between tasks
- Want to speed up execution

**Don't use when:**
- Tasks depend on each other
- Need shared context
- Tasks modify the same files

## The Pattern

### 1. Identify Independent Tasks

Break down the work:
```
Task A: Fix login bug
Task B: Add search feature
Task C: Update tests
```

### 2. Spawn Parallel Agents

Use parallel execution:
```bash
# Run 3 tasks in parallel
task1 &
task2 &
task3
wait
```

### 3. Wait for Results

Each task runs independently and returns when complete.

### 4. Aggregate Results

Review each result and integrate the changes.

## Good Prompts

**Bad:**
```
Fix everything
```

**Good:**
```
Fix login tests

1. "should login with valid credentials" - returns 401
2. "should logout properly" - session not cleared

Your task:
1. Read the test file
2. Find root cause
3. Fix the bugs

Return: Summary of fixes.
```

## Common Mistakes

❌ **Too broad:** "Fix everything" - gets lost
✅ **Specific:** "Fix login tests" - focused

❌ **No context:** "Fix the bug" - doesn't know where
✅ **Context:** "Error in auth/login.ts line 42"

## Key Principles

1. **Independent domains only** - No shared state
2. **Focused prompts** - One task per agent
3. **Clear output** - Know what changed
4. **Verify results** - Check each fix works
