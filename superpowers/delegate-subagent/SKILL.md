---
name: delegate-subagent
description: "Delegate focused tasks to a subagent for specialized execution while maintaining main context."
---

# Delegate to Subagent

## Overview
Subagent delegation enables focused task execution by offloading specific work to specialized agents. This skill should be invoked when tasks need focused attention, specialized knowledge, or independent execution that can proceed without constant main context.

## Core Principles
- **Clear Scope**: Define specific, bounded tasks for delegation
- **Sufficient Context**: Provide enough information for the subagent to succeed
- **Independent Execution**: Tasks should be self-contained
- **Result Integration**: Plan how results will merge back

## Preparation Checklist
- [ ] Identify task boundaries - what can be delegated vs. what must stay in main
- [ ] Determine what context the subagent needs
- [ ] Define success criteria for the delegated task
- [ ] Plan integration approach

## Step-by-Step Process
1. **Identify**: Select independent task suitable for delegation
2. **Define**: Write clear task description with required context
3. **Invoke**: Execute subagent with full instructions
4. **Review**: Examine returned results for completeness
5. **Integrate**: Merge changes into main workflow
6. **Verify**: Ensure integration works correctly

## Do's and Don'ts
- ✅ **Do** give clear, specific instructions
- ✅ **Do** include relevant files and context
- ✅ **Do** verify results before accepting
- ❌ **Don't** delegate tasks that require main context
- ❌ **Don't** give vague or incomplete instructions
- ❌ **Don't** skip verification of delegated work

## Anti-Patterns
- **Vague Instructions**: "Fix the bug" without specifics
- **Too Much Context**: Overloading subagent with unnecessary info
- **No Verification**: Trusting delegations without review
- **Wrong Granularity**: Delegating either too small or too large tasks
