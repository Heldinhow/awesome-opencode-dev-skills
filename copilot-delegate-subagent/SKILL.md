---
name: copilot-delegate-subagent
description: "Orchestrate and delegate tasks to subagents in GitHub Copilot CLI for parallel or focused execution."
---

# Copilot Delegate Subagent

## Overview
Copilot subagent delegation enables orchestrating specialized agents for focused or parallel execution. This skill should be invoked when offloading work to specialized subagents, running parallel independent tasks, or breaking complex tasks into focused subtasks.

## Core Principles
- **Delegation Patterns**: Choose direct, fleet, or sequential
- **Specialization**: Use agents with specific expertise
- **Task Decomposition**: Break complex tasks into independent pieces
- **Result Aggregation**: Combine outputs from multiple agents

## Preparation Checklist
- [ ] Identify tasks suitable for delegation
- [ ] Define delegation pattern (direct, fleet, sequential)
- [ ] Set up custom agents if needed
- [ ] Plan result integration

## Step-by-Step Process
1. **Define**: Specify task or use custom agent
2. **Delegate**: Choose delegation pattern
3. **Execute**: Run subagent with full context
4. **Monitor**: Track progress with /tasks
5. **Review**: Examine results
6. **Integrate**: Combine into main workflow

## Do's and Don'ts
- ✅ **Do** use appropriate delegation pattern
- ✅ **Do** provide sufficient context to agents
- ✅ **Do** monitor execution progress
- ❌ **Don't** delegate tasks requiring main context
- ❌ **Don't** ignore result verification
- ❌ **Don't** over-delegate small tasks

## Anti-Patterns
- **Wrong Pattern**: Using fleet for sequential tasks
- **Context Loss**: Not providing enough context
- **No Verification**: Accepting results without check
- **Over-Delegation**: Delegating trivial tasks
