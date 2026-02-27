---
name: dispatching-parallel-agents
description: Use when you need to run multiple independent tasks in parallel using OpenClaw sub-agents. Spawns separate sessions for each task and aggregates results.

# Dispatching Parallel Agents (OpenClaw)

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

Use `sessions_spawn` to run multiple agents:

```bash
# Spawn 3 agents in parallel
sessions_spawn(task="Fix the login bug in src/auth/login.ts", label="fix-login")
sessions_spawn(task="Add search feature to src/search/", label="add-search")
sessions_spawn(task="Update tests in tests/", label="update-tests")
```

### 3. Wait for Results

Each sub-agent runs independently and returns when complete.

### 4. Aggregate Results

Review each result and integrate the changes.

## Agent Prompt Structure

Good prompts are:

1. **Focused** - One clear task
2. **Self-contained** - All context needed
3. **Specific output** - What to return

```markdown
Task: Fix the 3 failing tests in tests/auth.test.ts

1. "should login with valid credentials" - returns 401 instead of 200
2. "should logout properly" - session not cleared
3. "should handle invalid password" - wrong error message

Your task:
1. Read the test file and understand what's expected
2. Find root cause in src/auth/
3. Fix the bugs
4. Run tests to verify

Return: Summary of what you found and fixed.
```

## Usage in OpenClaw

### Basic Parallel Spawn

```
You can use me to spawn multiple sub-agents for parallel execution.

Example: "Fix all 3 failing tests in parallel"
```

The main agent will:
1. Identify independent tasks
2. Spawn sub-agents with `sessions_spawn`
3. Wait for completion
4. Aggregate results

### Configuration

Sub-agents can be configured:
```json
{
  "model": "minimax-portal/MiniMax-M2.5",
  "timeoutSeconds": 300,
  "cleanup": "delete"
}
```

## Common Mistakes

❌ **Too broad:** "Fix everything" - agent gets lost
✅ **Specific:** "Fix login tests" - focused scope

❌ **No context:** "Fix the bug" - doesn't know where
✅ **Context:** "Error in src/auth/login.ts line 42"

❌ **No constraints:** Agent might change unrelated code
✅ **Constraints:** "Fix tests only, don't change production code"

## Real Example

**Scenario:** 3 independent fixes needed

```
Task 1 → sessions_spawn(task="Fix CORS in server.ts", label="fix-cors")
Task 2 → sessions_spawn(task="Add validation to user model", label="add-validation")
Task 3 → sessions_spawn(task="Update README with new API", label="update-docs")
```

**Results:**
- fix-cors: Added cors middleware
- add-validation: Added Joi schema
- update-docs: Added new endpoints

All ran in parallel, saved ~67% time.

## Key Principles

1. **Independent domains only** - No shared state
2. **Focused prompts** - One task per agent
3. **Clear output** - Know what changed
4. **Verify results** - Check each fix works
