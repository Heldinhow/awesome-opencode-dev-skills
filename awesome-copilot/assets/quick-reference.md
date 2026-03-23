# Awesome Copilot Skills Quick Reference

## Top 10 Must-Know Skills

| Skill | Use Case |
|-------|----------|
| `context-map` | Generate map of relevant files before making changes |
| `git-commit` | Intelligent git commit with conventional messages |
| `create-specification` | Create AI-optimized spec files |
| `create-implementation-plan` | Create implementation plans |
| `breakdown-plan` | Epic > Feature > Story hierarchy planning |
| `documentation-writer` | Diátaxis framework for docs |
| `dependabot` | Dependency update configuration |
| `dotnet-best-practices` | .NET code quality |
| `eval-driven-dev` | Eval-driven development for LLM apps |
| `github-issues` | GitHub issues management |

## Skill Naming Patterns

```
{technology}-{action}     → azure-devops-cli, git-flow-branch-creator
{technology}-{component}  → ef-core, spring-boot, flutter
{action}-{target}         → create-readme, create-specification
{domain}-{category}       → gtm-product-led-growth
```

## Quick Fetch Commands

```bash
# Fetch any skill raw content
https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/{skill-name}/SKILL.md

# Examples:
https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/context-map/SKILL.md
https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/git-commit/SKILL.md
https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/create-specification/SKILL.md
```

## Bundled Assets Location

```
skills/{skill-name}/
├── SKILL.md              # Main instruction file
├── assets/               # Templates, examples
├── references/           # Detailed references
└── scripts/              # Helper scripts (.sh, .py)
```
