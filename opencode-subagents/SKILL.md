---
name: opencode-subagents
description: OpenCode subagent patterns - create specialized subagents with clean context for peak intelligence.
---

# OpenCode Subagents

Create specialized subagents in OpenCode for focused tasks with clean context.

## Concepts

| Concept | Use |
|---------|-----|
| **Skills** | Context loaded automatically |
| **Commands** | Quick shortcuts ("/fix-tests") |
| **Agents** | Subagents with own context |

## Why Subagents

> *"Subagents have their own context - operate at peak intelligence!"*

Benefits:
- Clean context = maximum model capability
- Each subagent focused on one task
- Don't clutter main agent's session
- Independent execution

## Creating Subagents

### AGENTS.md

Create `AGENTS.md` in project root:

```markdown
# AGENTS.md

## @reviewer
Expert code reviewer.
- Focus on security, performance, bugs
- Use specific examples
- Provide actionable feedback

## @tester
Testing specialist.
- Unit tests, integration tests, E2E
- Aim for 80% coverage
- Use Vitest/Playwright

## @docs
Technical writer.
- Clear explanations
- Code examples
- API documentation
```

### Custom Agent Definition

Create agent file:

```yaml
# .opencode/agents/reviewer.yaml
name: reviewer
description: Expert code reviewer
instructions: |
  You are a code review expert.

  Focus on:
  - Security vulnerabilities
  - Performance issues
  - Bug detection
  - Code quality

  Guidelines:
  - Be specific with examples
  - Provide code snippets
  - Suggest fixes, not just problems

model: gpt-4o
tools:
  - git
  - read
  - grep
```

## Using Subagents

### Invoke with @mention

```bash
# Call reviewer
@reviewer "review src/auth/"

# Call tester
@tester "add tests for user module"

# Call docs
@docs "document the API"
```

### Direct Invocation

```bash
opencode --agent reviewer "review login code"
opencode --agent tester "test payment flow"
```

## Agent Setup Examples

### Typical Setup

| Agent | Model | Purpose |
|-------|-------|---------|
| **Plan** | GPT-5.x Codex (high reasoning) | Planning |
| **Build** | Sonnet 4.5 | Implementation |
| **Code** | Haiku | Quick edits |
| **Review** | Sonnet | Code review |
| **Test** | Haiku | Test generation |

### Project-Specific Agents

For monorepos:

```
AGENTS.md
├── @frontend - React expert
├── @backend - API specialist
├── @mobile - iOS/Android
└── @infra - DevOps
```

## Best Practices

1. **Define clear expertise** - Each agent has focus
2. **Use @mention** - Easy invocation
3. **Keep context clean** - Subagent's strength
4. **Group related skills** - Agent = bundle of skills
5. **Specify tools** - Control what agent can do

## Example Workflow

```bash
# 1. Plan with main agent
opencode "build user authentication"

# 2. Delegate to specialist
@backend "create auth endpoints"
@frontend "build login UI"
@tester "add auth tests"

# 3. Review
@reviewer "audit auth code"

# 4. Aggregate results
```

## Tools Control

Control subagent capabilities via YAML:

```yaml
name: restricted-agent
description: Limited agent
tools:
  - read
  - grep
  # No write, no git
```

## See Also

- [Commands vs Skills vs Agents](https://www.reddit.com/r/opencodeCLI/comments/1qkh19k/)
- [Writing Skills Guide](https://www.reddit.com/r/opencodeCLI/comments/1qdypv9/)
