---
name: copilot-delegate-subagent
description: Orchestrate and delegate tasks to subagents in GitHub Copilot CLI. Use when you need to offload work to specialized subagents for parallel or focused execution.
---

# Copilot CLI - Delegating to Subagents

This skill shows how to orchestrate and delegate work to subagents in GitHub Copilot CLI.

## Installation

```bash
npm install -g @github/copilot
```

## Delegation Patterns

### 1. Direct Delegation

Tell Copilot to use a subagent explicitly:

```bash
copilot "Use the security-audit agent to check payment code"
copilot "Delegate to test-writer to create unit tests"
copilot "Have the docs-agent generate API documentation"
```

### 2. Fleet Delegation (Parallel)

For multiple subtasks:

```bash
/fleet implement login, create tests, write docs
```

Copilot automatically:
- Breaks into subtasks
- Assigns to subagents
- Runs in parallel
- Aggregates results

### 3. Sequential Delegation

Chain multiple delegated tasks:

```bash
# Step 1: Create feature
copilot "Create user profile endpoint"

# Step 2: Delegate to tests
copilot "Generate tests for the profile endpoint"

# Step 3: Delegate to docs
copilot "Document the profile API"
```

### 4. Custom Agent Delegation

Create custom agent first, then delegate:

```yaml
# ~/.copilot/agents/backend-expert.yaml
name: backend-expert
description: Backend API specialist
instructions: |
  You are a backend expert.
  - Use Node.js/Express or Python/FastAPI
  - Follow REST conventions
  - Add input validation
tools:
  - git
  - code
  - tests
model: gpt-4o
```

Then delegate:

```bash
copilot --agent backend-expert "Create auth endpoints"
copilot -t backend-expert "Build user CRUD"
```

## Subagent Context Isolation

Each subagent gets clean context:
- Doesn't see other subagents' work
- Focused on specific task
- No context pollution

## Real-World Delegation Examples

### Example 1: Full Feature Delegation

```bash
# Delegate entire feature to subagents
copilot "I need a user authentication system"

# Copilot will:
# 1. Create auth endpoints (subagent)
# 2. Write tests (subagent)
# 3. Generate docs (subagent)
```

### Example 2: Specific Delegation

```bash
# Delegate specific tasks
/fleet fix auth bug, add rate limiting, update swagger docs
```

### Example 3: Expert Delegation

```bash
# Use specific experts
copilot "Use @security-expert to audit the login"
copilot "Use @frontend-expert to build the login UI"
copilot "Use @test-expert to write E2E tests"
```

## Creating Subagents for Delegation

### For Specific Domains

```yaml
# ~/.copilot/agents/security-expert.yaml
name: security-expert
description: Security vulnerability researcher
instructions: |
  You are an application security expert.
  
  Focus on:
  - OWASP Top 10 vulnerabilities
  - Input validation
  - Authentication/Authorization
  - Data protection
  
  Always:
  - Suggest fixes, not just problems
  - Provide code examples
tools:
  - git
  - code-review
  - dependencies
```

```yaml
# ~/.copilot/agents/test-expert.yaml
name: test-expert
description: Test automation specialist
instructions: |
  You are a testing expert.
  
  Focus on:
  - Unit tests
  - Integration tests
  - E2E tests
  
  Guidelines:
  - Use Vitest/Jest for unit
  - Use Playwright for E2E
  - Aim for 80% coverage
tools:
  - git
  - tests
  - coverage
```

### For Team Conventions

```yaml
# ~/.copilot/agents/react-expert.yaml
name: react-expert
description: React specialist for frontend
instructions: |
  You are a React expert.
  
  Tech Stack:
  - React 18 + TypeScript
  - Tailwind CSS
  - TanStack Query
  
  Patterns:
  - Use hooks
  - Follow compound components
  - Use TypeScript strictly
tools:
  - git
  - npm
  - tests
  - lint
```

## Delegation Workflow

### 1. Define Task
```bash
copilot "Build user management API"
```

### 2. Copilot Analyzes
- Breaks into subtasks
- Identifies dependencies
- Selects appropriate subagents

### 3. Delegation
```bash
# Subtask 1: API endpoints
# Subtask 2: Database schema
# Subtask 3: Tests
# Subtask 4: Documentation
```

### 4. Execution (Parallel)
```bash
# All subtasks run concurrently
```

### 5. Aggregation
- Results combined
- Conflicts resolved
- Final output delivered

## Monitoring Delegated Tasks

```bash
/tasks    # List background tasks
# Enter - View details
# k       - Kill task
# r       - Remove from list
```

## Best Practices

1. **Be Specific** - "Use @security-expert" is better than "make it secure"
2. **Define Custom Agents** - Team conventions = custom agents
3. **Use Fleet** - For parallel independent tasks
4. **Monitor** - Use /tasks to track progress
5. **Review** - Always review delegated work

## Quick Reference

```bash
# Direct delegation
copilot "Create tests for auth"

# Fleet (parallel)
/fleet create tests, build API, write docs

# Custom agent
copilot -t security-expert "Audit code"

# Sequential
copilot "Create API" && copilot "Test API"
```

## See Also

- [Fleet Documentation](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)
- [Custom Agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
