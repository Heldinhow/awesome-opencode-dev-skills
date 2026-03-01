---
name: dispatching-parallel-agents
description: "Run multiple independent tasks in parallel using subagents for faster execution."
---

# dispatching-parallel-agents

## Overview
When you have 3+ independent tasks that can run concurrently

## Process
1. Identify independent tasks that don't share state
2. Break down work into focused subtasks
3. Spawn subagents in parallel
4. Wait for all results
5. Aggregate and integrate results

## Examples
- Fixing multiple unrelated bugs
- Building multiple features simultaneously
- Running independent tests

## Limitations
Not suitable for dependent tasks or shared context
