---
name: copilot-cli-subagents
description: "Use GitHub Copilot CLI with /fleet for parallel subagent execution and custom agent workflows."
---

# Copilot CLI Subagents

## Overview
GitHub Copilot CLI enables parallel task execution through subagents, allowing multiple independent tasks to run simultaneously. This skill should be invoked when executing multiple independent tasks that can run in parallel, leveraging /fleet for coordinated multi-agent execution.

## Core Principles
- **Plan Mode**: Use Shift+Tab for complex task planning
- **Fleet Execution**: Use /fleet to execute multiple subagents
- **Task Monitoring**: Track progress with /tasks command
- **Result Integration**: Combine outputs from multiple agents

## Preparation Checklist
- [ ] Install GitHub Copilot CLI extension
- [ ] Understand /fleet command capabilities
- [ ] Plan task breakdown for parallel execution
- [ ] Set up custom agents if needed

## Step-by-Step Process
1. **Plan**: Enter plan mode with Shift+Tab
2. **Define**: Break down implementation into subtasks
3. **Execute**: Run with /fleet command
4. **Monitor**: Track with /tasks command
5. **Review**: Examine outputs from each agent
6. **Integrate**: Combine results into unified solution

## Do's and Don'ts
- ✅ **Do** use /fleet for independent parallel tasks
- ✅ **Do** monitor task completion
- ✅ **Do** verify integration of results
- ❌ **Don't** use for sequential dependent tasks
- ❌ **Don't** ignore API costs with multiple agents
- ❌ **Don't** skip result verification

## Anti-Patterns
- **Sequential Fleet**: Trying to use fleet for dependent tasks
- **No Monitoring**: Not tracking fleet execution progress
- **Result Ignorance**: Accepting outputs without verification
- **Over-Fleet**: Spawning too many concurrent agents
