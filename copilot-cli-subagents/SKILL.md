---
name: copilot-cli-subagents
description: GitHub Copilot CLI for spawning and managing sub-agents. Use when you need to run AI-powered agents locally for coding tasks.
metadata:
  clawdbot:
    emoji: "🤖"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# Copilot CLI - Subagents

GitHub Copilot CLI (`copilot`) allows running AI agents for coding tasks with natural language.

## Installation

```bash
# Install Copilot CLI
npm install -g @github/copilot

# Or via GitHub CLI
gh extension install github/copilot-cli
```

## Basic Usage

### Interactive Mode

```bash
# Start interactive session
copilot

# Or with a specific task
copilot "explain this codebase"
```

### Flags

| Flag | Description |
|------|-------------|
| `-t, --template` | Use a specific agent template |
| `-m, --model` | Specify the model to use |
| `--verbose` | Enable verbose output |
| `--no-stream` | Disable streaming responses |

## Agent Templates

### Code Review

```bash
copilot review ./src --detailed
```

### Bug Fix

```bash
copilot fix "login not working"
```

### Explain

```bash
copilot explain "how does auth work"
```

### Tests

```bash
copilot test ./src/utils --coverage
```

## Spawning Subagents

### Parallel Execution

```bash
# Run multiple tasks in parallel
copilot "fix bug in auth" &
copilot "add tests for utils" &
wait
```

### Chained Agents

```bash
# Agent 1 creates PR
PR=$(copilot pr create --fill)

# Agent 2 reviews
copilot pr review $PR --approve
```

## Configuration

```bash
# Set default model
copilot config set model gpt-4o

# Set verbosity
copilot config set verbose true
```

## Environment Variables

| Variable | Description |
|---------|-------------|
| `COPILOT_MODEL` | Default model |
| `COPILOT_TIMEOUT` | Request timeout |
| `GITHUB_TOKEN` | Authentication token |

## Best Practices

1. **Be Specific** - Clear prompts get better results
2. **Use Context** - Provide relevant files/directories
3. **Iterate** - Refine prompts based on output
4. **Review Always** - AI can make mistakes

## Integration with Workflows

```bash
# Pre-commit hook
copilot pre-commit "check code style"

# CI/CD
copilot ci "run tests and report"
```

## Troubleshooting

```bash
# Check auth
copilot auth status

# Re-authenticate
copilot auth login

# Clear cache
copilot cache clear
```
