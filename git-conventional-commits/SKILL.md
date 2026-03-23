---
name: git-conventional-commits
description: Use when writing git commit messages, planning commits, or setting up commit conventions. Enforces Conventional Commits format with proper types, scopes, breaking changes, and semantic versioning compatibility.
---

# Git Conventional Commits

## Format

```
<type>(<scope>): <subject>

[body]

[footer(s)]
```

## Types

| Type | When to use |
|---|---|
| `feat` | New feature (triggers MINOR version bump) |
| `fix` | Bug fix (triggers PATCH version bump) |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons — no logic change |
| `refactor` | Code change that's not a feat or fix |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or external dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks, no production code change |
| `revert` | Revert a previous commit |

## Subject Rules
- Lowercase, no period at end
- Imperative mood: "add feature" not "added feature"
- Max 72 characters
- No generic messages like "fix bug" or "update code"

## Breaking Changes
Add `!` after type/scope OR add `BREAKING CHANGE:` footer:

```
feat(api)!: remove deprecated /v1 endpoint

BREAKING CHANGE: /v1/users endpoint removed. Migrate to /v2/users.
```

Breaking changes trigger MAJOR version bump.

## Body (optional)
- Wrap at 72 characters
- Explain **what** and **why**, not how
- Separate from subject with blank line

## Footer (optional)
```
Closes #123
Co-authored-by: Name <email>
Reviewed-by: Name
```

## Examples

```
feat(auth): add OAuth2 login with Google

fix(cart): prevent duplicate items on rapid clicks

Closes #89

refactor(api): extract validation middleware into shared module

docs(readme): update installation steps for Node 20

ci: add GitHub Actions workflow for automated releases

feat!: drop support for Node 16

BREAKING CHANGE: minimum Node version is now 18
```

## Scopes
Use consistent scopes matching your project structure:
- `auth`, `api`, `ui`, `db`, `cache`, `config`, `infra`, `ci`
- Or feature areas: `cart`, `checkout`, `profile`, `dashboard`

## Multi-commit Guidelines
- One logical change per commit
- Don't mix unrelated changes in a single commit
- Squash WIP commits before merging: `git rebase -i`

## Semantic Release Compatibility
- `feat` → minor release
- `fix`, `perf` → patch release
- `BREAKING CHANGE` → major release
- `docs`, `chore`, `style`, `refactor`, `test`, `build`, `ci` → no release
