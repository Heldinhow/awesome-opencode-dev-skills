---
name: opencode-subagents
description: "Create and use specialized subagents in OpenCode for focused tasks."
---

# OpenCode Subagents

## Overview
OpenCode subagents are specialized AI agents that can be defined and invoked for focused, domain-specific tasks. This skill should be invoked when you need specialized agents with clean context for focused execution, such as code review specialists, testing agents, or documentation agents.

## Core Principles
- **Single Responsibility**: Each subagent should have a clear, focused purpose
- **Clean Context**: Subagents receive focused context, avoiding pollution from unrelated tasks
- **Skill Isolation**: Subagents carry their own skills and tools, independent of parent session
- **Composition**: Multiple subagents can work in parallel on independent tasks

## Preparation Checklist
- [ ] Define the subagent's purpose and scope of expertise
- [ ] Identify the skills the subagent needs to carry
- [ ] Determine which tools the subagent should have access to
- [ ] Choose appropriate model preferences if different from default

## Step-by-Step Process
1. **Define Agent**: Create agent definition in AGENTS.md or YAML file
2. **Specify Expertise**: Define the agent's focus areas and knowledge domains
3. **Configure Tools**: Specify which tools the agent can use
4. **Set Model**: Choose model preferences (temperature, max tokens)
5. **Invoke**: Use @mention or CLI to call the subagent for tasks

## Do's and Don'ts
- ✅ **Do** keep subagent definitions focused - one clear purpose
- ✅ **Do** provide relevant skills that match the subagent's domain
- ✅ **Do** use subagents for parallel execution of independent tasks
- ❌ **Don't** create catch-all agents that try to do everything
- ❌ **Don't** over-configure - simple is often better
- ❌ **Don't** forget to verify subagent outputs - assume they can make mistakes

## Anti-Patterns
- **The Generalist Agent**: Creating an agent with no clear focus
- **Tool Overload**: Giving agents access to too many unrelated tools
- **No Verification**: Trusting subagent outputs without review
- **Context Leakage**: Not utilizing proper session isolation when needed
