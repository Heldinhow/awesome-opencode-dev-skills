# design-md Skill

A skill for creating and managing DESIGN.md files — a format specification for describing visual identity to coding agents, developed by Google Labs.

## Overview

DESIGN.md combines machine-readable design tokens (YAML front matter) with human-readable design rationale (markdown prose). Tokens give agents exact values; prose tells them *why* those values exist and how to apply them.

## File Structure

A DESIGN.md has two layers:

1. **YAML front matter** — Machine-readable design tokens, delimited by `---` fences at top
2. **Markdown body** — Human-readable design rationale organized into `##` sections

## Token Schema

```yaml
version: "alpha"  # optional, current: "alpha"
name: <string>
description: <string>  # optional
colors:
  <token-name>: "#<hex>"  # sRGB hex color
typography:
  <token-name>:
    fontFamily: <string>
    fontSize: <string>  # e.g., "1rem", "24px"
    fontWeight: <number>
    lineHeight: <string>
    letterSpacing: <string>
    fontFeature: <string>
    fontVariation: <string>
rounded:
  <scale-level>: <Dimension>  # e.g., "4px", "8px"
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    backgroundColor: <Color | token ref>
    textColor: <Color | token ref>
    typography: <Typography token>
    rounded: <Dimension | token ref>
    padding: <Dimension>
    size: <Dimension>
    height: <Dimension>
    width: <Dimension>
```

## Token Types

| Type | Format | Example |
|:-----|:-------|:--------|
| Color | `#` + hex | `"#1A1C1E"` |
| Dimension | number + unit | `48px`, `-0.02em` |
| Token Reference | `{path.to.token}` | `{colors.primary}` |
| Typography | object | `{ fontFamily: "Public Sans", fontSize: "1rem" }` |

## Section Order

Sections use `##` headings and must appear in this order:

1. Overview (aliases: Brand & Style)
2. Colors
3. Typography
4. Layout (aliases: Layout & Spacing)
5. Elevation & Depth (aliases: Elevation)
6. Shapes
7. Components
8. Do's and Don'ts

## Design Token Interoperability

Export to other formats:

```bash
# Tailwind theme config
npx @google/design.md export --format tailwind DESIGN.md > tailwind.theme.json

# DTCG tokens.json (W3C format)
npx @google/design.md export --format dtcg DESIGN.md > tokens.json
```

## CLI Reference

Install:
```bash
npm install @google/design.md
```

### `lint` — Validate DESIGN.md

```bash
npx @google/design.md lint DESIGN.md
cat DESIGN.md | npx @google/design.md lint -
```

### `diff` — Compare two versions

```bash
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

### `spec` — Output full specification

```bash
npx @google/design.md spec
npx @google/design.md spec --rules
```

## Linting Rules

| Rule | Severity | What it checks |
|:-----|:---------|:---------------|
| `broken-ref` | error | Token references that don't resolve |
| `missing-primary` | warning | No `primary` color defined |
| `contrast-ratio` | warning | WCAG AA minimum (4.5:1) not met |
| `orphaned-tokens` | warning | Color tokens never referenced |
| `token-summary` | info | Token counts per section |
| `missing-sections` | info | Optional sections absent |
| `missing-typography` | warning | No typography tokens |
| `section-order` | warning | Sections out of canonical order |

## Example DESIGN.md

```md
---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 3rem
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
---

## Overview

Architectural Minimalism meets Journalistic Gravitas. The UI evokes a
premium matte finish — a high-end broadsheet or contemporary gallery.

## Colors

The palette is rooted in high-contrast neutrals and a single accent color.

- **Primary (#1A1C1E):** Deep ink for headlines and core text.
- **Secondary (#6C7278):** Sophisticated slate for borders, captions, metadata.
- **Tertiary (#B8422E):** "Boston Clay" — the sole driver for interaction.
- **Neutral (#F7F5F2):** Warm limestone foundation, softer than pure white.
```

## Usage

When a user asks you to design or build UI components:

1. Check for existing `DESIGN.md` in the project
2. If none exists, ask if they want to create one using this format
3. When creating, use exact token values — no vague descriptions
4. Apply tokens consistently across components
5. Validate with `npx @google/design.md lint DESIGN.md`

## Programmatic API

```typescript
import { lint } from '@google/design.md/linter';

const report = lint(markdownString);
console.log(report.findings);
console.log(report.summary);  // { errors, warnings, info }
console.log(report.designSystem);  // Parsed DesignSystemState
```

## Reference

- Spec: https://github.com/google-labs/design.md
- npm: `npm install @google/design.md`