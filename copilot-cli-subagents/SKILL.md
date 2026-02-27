---
name: copilot-cli-subagents
description: GitHub Copilot CLI with subagents, multi-agent workflows, fleet mode, and orchestration. Use for AI-powered complex coding tasks.
metadata:
  clawdbot:
    emoji: "🤖"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# GitHub Copilot CLI - Subagents & Multi-Agent Workflows

GitHub Copilot CLI has powerful subagent support with context isolation, parallel execution, and orchestration.

## Installation

```bash
# Via npm
npm install -g @github/copilot

# Or via GitHub CLI
gh extension install github/copilot-cli
```

## How Subagents Work

### Context Isolation
- Subagents operate with a **clean context**
- Tasks don't affect the main agent's working context
- Useful for large/complex tasks
- Parts of work can be offloaded efficiently

### Delegation
Main agent delegates tasks to subagents as **specialists**:
- Security auditor
- Documentation writer
- Frontend expert
- Backend specialist

## Built-in Specialized Agents

| Agent | Purpose |
|-------|---------|
| **Explore** | Fast codebase analysis |
| **Task** | Running builds and tests |
| **Code Review** | High-signal change review |
| **Plan** | Implementation planning |

## Usage Modes

### Interactive Mode

```bash
copilot
```

### With Prompt

```bash
copilot "explain the auth system"
```

### Plan Mode
- Press **Shift+Tab** to enter plan mode
- Outline work before execution
- Use `/model` to compare approaches

### Autopilot Mode
- Press **Shift+Tab** after planning
- Copilot executes without step-by-step approval

## Fleet Mode (Parallel Execution)

```bash
# Enter fleet mode
/fleet

# Fleet coordinates multiple subagents in parallel
/fleet implement user auth + tests + docs
```

### How Fleet Works
1. Main agent breaks down task into subtasks
2. Multiple subagents execute **concurrently**
3. Main agent orchestrates workflow and dependencies
4. Results are aggregated

## Custom Agents

### Create Custom Agent

Create `~/.copilot/agents/my-agent.yaml`:

```yaml
name: frontend-expert
description: Expert in React and modern frontend
instructions: |
  You are a frontend development expert.
  
  Tech Stack:
  - React 18 + TypeScript
  - Tailwind CSS
  - Vitest for testing
  
  Guidelines:
  - Use functional components with hooks
  - Write tests for all components
  - Follow team conventions
  - Use TypeScript strictly

tools:
  - git
  - npm
  - tests
  - lint

model: gpt-4o
```

### Agent Definition Locations

| Scope | Location |
|-------|----------|
| Project | `.github/agents/` |
| User | `~/.copilot/agents/` |
| Organization | `{org}/.github/agents/` |

### Use Custom Agent

```bash
# Explicit invocation
copilot --agent frontend-expert "create login component"

# Or use -t shorthand
copilot -t frontend-expert "build dashboard"
```

## Invocation Methods

### 1. Explicit Invocation
```bash
copilot /agent security-audit "check for vulnerabilities"
copilot --agent docs-writer "generate API docs"
```

### 2. Inference (Automatic)
Main agent automatically detects when to use a subagent based on:
- Your prompt
- Agent description in profile file

### 3. Slash Commands
```bash
/fleet              # Parallel execution
/agent <name>      # Use specific agent
/plan               # Enter planning mode
```

## AGENTS.md for Project Context

Create `AGENTS.md` in project root:

```markdown
# AGENTS.md

## Project Context
- **Tech Stack**: Node.js, React, PostgreSQL
- **Testing**: Vitest, Playwright
- **Code Style**: ESLint, Prettier

## Team Conventions
- Use TypeScript strict mode
- Write tests for all new features
- Follow conventional commits
- Add JSDoc for complex functions

## Custom Instructions
- Frontend: Use React Server Components
- Backend: Use Prisma ORM
- API: REST with OpenAPI docs
```

## Orchestration Pattern

### Multi-Agent Workflow

```bash
# Task: Full feature implementation
copilot "implement user authentication"

# Copilot automatically:
# 1. Plan (uses Plan agent)
# 2. Delegate to backend agent (auth logic)
# 3. Delegate to frontend agent (login UI)
# 4. Delegate to test agent (coverage)
# 5. Aggregate results
```

### Sequential Delegation

```bash
# Agent 1: Creates feature
PR=$(copilot "add user profile endpoint")

# Agent 2: Reviews
copilot "review $PR"

# Agent 3: Tests
copilot "run integration tests on $PR"
```

## Single Command Workflow

```bash
# One command to:
# 1. Create branch
# 2. Implement changes
# 3. Run tests
# 4. Open PR
copilot pr "add password reset flow"
```

## Best Practices

1. **Use Plan Mode** for complex tasks before execution
2. **Create Custom Agents** for team conventions
3. **Leverage Fleet** for parallel subtasks
4. **Define AGENTS.md** for project context
5. **Review Always** - AI can make mistakes

## Examples

```bash
# Security audit
copilot --agent security "audit payment code"

# Documentation
copilot -t docs-writer "generate SDK docs"

# Complex task with fleet
/fleet "refactor auth system, add tests, update docs"

# Quick fix
copilot fix "memory leak in worker"

# Full implementation
copilot "build e-commerce checkout flow"
```

## Troubleshooting

```bash
# Check agents
copilot agents list

# Agent status
copilot status

# Clear context
copilot reset

# Debug mode
copilot --verbose "your task"
```
