---
name: changelog
description: Use when generating or updating a CHANGELOG.md file, writing release notes, or summarizing changes between versions based on git commits or PR history.
---

# Changelog

## Format: Keep a Changelog

Follow [keepachangelog.com](https://keepachangelog.com) conventions:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.2.0] - 2025-03-15

### Added
- New feature X for users who need Y

### Changed
- Behavior of Z now does W instead of V

### Deprecated
- `oldMethod()` — use `newMethod()` instead, will be removed in v2.0

### Removed
- Dropped support for Node 16

### Fixed
- Cart total incorrectly calculated when coupon applied (#123)

### Security
- Updated `express` to patch CVE-2024-XXXX

## [1.1.0] - 2025-02-01
...

[Unreleased]: https://github.com/owner/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/owner/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/owner/repo/compare/v1.0.0...v1.1.0
```

## Section Types

| Section | What goes here |
|---|---|
| `Added` | New features |
| `Changed` | Changes to existing functionality |
| `Deprecated` | Soon-to-be removed features |
| `Removed` | Removed features |
| `Fixed` | Bug fixes |
| `Security` | Security vulnerability fixes |

## Writing Good Entries
- Write for **users**, not developers: "Users can now export reports as PDF" not "add PDF export handler"
- Group related changes into a single entry
- Reference issue/PR numbers: `(#123)` or `(closes #123)`
- For breaking changes, be explicit about migration: "Renamed `config.timeout` to `config.timeoutMs` — update your config files"

## Generating from Git Commits

When given a range of commits, map Conventional Commits types to changelog sections:

| Commit type | Changelog section |
|---|---|
| `feat` | Added |
| `fix` | Fixed |
| `perf` | Changed |
| `refactor` | Changed (only if user-visible) |
| `docs` | (skip unless user-facing docs) |
| `style`, `test`, `ci`, `chore` | (skip) |
| `BREAKING CHANGE` | Changed + note at top of version |

## Semantic Versioning

- `BREAKING CHANGE` → bump MAJOR (1.x.x → 2.0.0)
- `feat` → bump MINOR (x.1.x → x.2.0)
- `fix`, `perf` → bump PATCH (x.x.1 → x.x.2)
- `docs`, `chore`, `style` → no version bump

## Unreleased Section
Always maintain an `[Unreleased]` section at the top for changes not yet in a release. When releasing, rename it to the new version with a date.
