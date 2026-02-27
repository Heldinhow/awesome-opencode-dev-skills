---
name: copilot-cli-subagents
description: GitHub Copilot CLI with /fleet parallel execution, subagent orchestration, custom agents, and multi-agent workflows.
metadata:
  clawdbot:
    emoji: "🤖"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# GitHub Copilot CLI - Fleet & Subagents

Official documentation-based guide for /fleet command and subagent orchestration.

## Installation

```bash
# Via npm
npm install -g @github/copilot

# Or via GitHub CLI
gh extension install github/copilot-cli
```

---

## /fleet Command

The `/fleet` command breaks complex requests into smaller tasks and runs them in **parallel** using subagents.

### Basic Usage

```bash
# Enter fleet mode
/fleet implement user authentication
```

### Workflow

1. **Plan Mode** (Shift+Tab)
   - Create implementation plan
   - Review and refine

2. **Execute with /fleet**
   - `/fleet implement the plan`
   - Copilot uses subagents for parallel execution

### Monitoring

```bash
/tasks    # See all background tasks
# Press Enter for details
# Press k to kill
# Press r to remove completed
```

---

## How Subagents Work

### Context Isolation
- Each subagent has **own context window**
- Separate from main agent
- Focuses on specific task
- Doesn't overwhelm with full context

### Delegation
Main agent acts as **orchestrator**:
- Analyzes prompt
- Breaks into subtasks
- Assesses dependencies
- Delegates to specialized subagents

### Parallel Execution
- Subtasks run **concurrently**
- Dependencies managed by orchestrator
- Faster completion for complex tasks

---

## Custom Agents

### Create Agent

`~/.copilot/agents/expert-name.yaml`:

```yaml
name: security-expert
description: Security vulnerability researcher
instructions: |
  You are a security expert.
  - Check for OWASP vulnerabilities
  - Validate authentication
  - Review authorization
tools:
  - git
  - code-review
model: gpt-4o
```

### Locations

| Scope | Path |
|-------|------|
| User | `~/.copilot/agents/` |
| Project | `.github/agents/` |
| Org | `{org}/.github/agents/` |

### Use Custom Agent

```bash
# Direct invocation
copilot --agent security-expert "audit payment code"

# Using @mention in fleet
/fleet implement auth @test-writer create unit tests
```

---

## Fleet + Custom Agents

### Specialization
- Subagents can use **custom agents**
- Each subtask gets best-suited agent
- Example: @frontend, @backend, @tests

### Model Selection

```bash
# Use specific model for subtask
Use GPT-5.3-Codex to create API
Use Claude Opus 4.5 to analyze security
```

### Default Behavior
- Subagents use **low-cost model** by default
- Override with model specification

---

## When to Use /fleet

### Best For
- Large/complex tasks
- Multiple independent steps
- Parallelizable work (refactoring, tests, updates)
- Automated workflows (autopilot mode)

### Not For
- Sequential tasks with dependencies
- Simple one-step requests

---

## Important Considerations

### Premium Requests
- Each subagent LLM interaction = premium request
- `/fleet` may use **more requests** than single agent
- Use `/model` to check multiplier

### Cost Optimization
```bash
# Check current model and cost
/model

# Use cheaper model for subagents
/model gpt-4o-mini
```

### Task Composition
- Best for **independent subtasks**
- Sequential tasks won't benefit from /fleet

---

## Fleet + Autopilot

```bash
# 1. Plan (Shift+Tab)
# 2. Accept plan

# Option A: Full autopilot
Accept plan and build on autopilot + /fleet

# Option B: Manual
/fleet implement the plan
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `/fleet` | Run subtasks in parallel |
| `/tasks` | List background tasks |
| `/model` | Check/change model |
| `/agent` | Use specific agent |
| Shift+Tab | Enter plan mode |

---

## Best Practices

1. **Use Plan Mode** first for complex tasks
2. **Define custom agents** for team conventions
3. **Leverage /fleet** for parallelizable work
4. **Monitor with /tasks** for progress
5. **Consider cost** - more subagents = more requests
6. **Review output** - AI can make mistakes

---

## Examples

```bash
# Full feature with tests and docs
/fleet implement user auth, @test-writer add tests, @docs-writer update API docs

# Multi-module refactor
/fleet refactor auth-module, refactor payment-module, refactor user-module

# Security audit + fixes
/fleet audit security, fix vulnerabilities

# Quick parallel tasks
/fleet update dependencies, run tests, build
```

---

## Documentation

- [Fleet Concept](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)
- [Speeding Up Tasks](https://docs.github.com/en/copilot/how-tos/copilot-cli/speeding-up-task-completion)
- [Custom Agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
