---
name: copilot-cli-subagents
description: GitHub Copilot CLI with built-in agents, custom agents, fleet mode, and subagent orchestration. Use for AI-powered coding tasks.
metadata:
  clawdbot:
    emoji: "🤖"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# GitHub Copilot CLI - Subagents & Agents

GitHub Copilot CLI has powerful built-in agents and supports custom agents for specialized tasks.

## Installation

```bash
# Via npm
npm install -g @github/copilot

# Or via GitHub CLI
gh extension install github/copilot-cli
```

## Built-in Specialized Agents

Copilot automatically delegates to these agents:

| Agent | Purpose |
|-------|---------|
| **Explore** | Fast codebase analysis |
| **Task** | Running builds and tests |
| **Code Review** | High-signal change review |
| **Plan** | Implementation planning |

## Usage

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
- Outline the work before execution
- Use `/model` to compare approaches

### Autopilot Mode

- Press **Shift+Tab** after planning
- Copilot executes without step-by-step approval

## Fleet Mode (Subagent Orchestration)

```bash
# Enter fleet mode
/fleet

# Fleet coordinates subagents in background
/fleet implement user auth
```

## Custom Agents

### Create Agent

Create `~/.copilot/agents/my-agent.yaml`:

```yaml
name: my-agent
description: Agent for frontend tasks
instructions: |
  You are a frontend expert.
  - Use React + TypeScript
  - Follow team conventions
  - Always add tests
tools:
  - git
  - npm
  - tests
model: gpt-4o
```

### Use Custom Agent

```bash
copilot -t my-agent "create login component"
```

### Organization Agents

Define agents in:
- Repository: `.github/agents/`
- Organization: `{org}/.github/agents/`

## AGENTS.md

Define custom instructions in project:

```markdown
# AGENTS.md

## Project Context
- Tech: React + Node.js
- Testing: Vitest
- Style: Tailwind CSS

## Guidelines
- Always write tests
- Use TypeScript
- Follow conventional commits
```

## Single Command Workflow

```bash
# One command to:
# 1. Create branch
# 2. Implement changes
# 3. Open PR
copilot pr "add user authentication"
```

## Flags

| Flag | Description |
|------|-------------|
| `-t, --template` | Use specific agent |
| `-m, --model` | Specify model |
| `--verbose` | Enable verbose |
| `--no-stream` | Disable streaming |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `COPILOT_MODEL` | Default model |
| `GITHUB_TOKEN` | Auth token |

## Best Practices

1. Use **Plan mode** for complex tasks
2. Create **custom agents** for team conventions
3. Use **AGENTS.md** for project context
4. Leverage **Fleet** for multi-step tasks
5. Always **review** AI-generated code

## Examples

```bash
# Code review
copilot review ./src

# Fix bug
copilot fix "login redirect loop"

# Create feature
copilot "add password reset flow"

# Explore codebase
copilot "how does payment work"

# Run tests
copilot test ./src --coverage
```
