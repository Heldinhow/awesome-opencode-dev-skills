# Design Philosophy Showcases - Sample Asset Index

> 8 scenes x 3 styles = 24 prebuilt design samples
> Used during Phase 3 design-direction recommendations to show what each style actually looks like

## Style Guide

| Code | School | Style Name | Visual Character |
|------|------|---------|---------|
| **Pentagram** | Information architecture | Pentagram / Michael Bierut | Restrained black and white, Swiss grids, strong typographic hierarchy, #E63946 red accents |
| **Build** | Minimalism | Build Studio | Luxury-grade whitespace (70%+), subtle weight shifts (200-600), warm gold #D4A574, refined |
| **Takram** | Eastern philosophy | Takram | Soft technological warmth, natural colors (beige/gray/green), rounded corners, chart-as-art treatment |

## Scene Quick Reference

### Content Design Scenes

| # | Scene | Spec | Pentagram | Build | Takram |
|---|------|------|-----------|-------|--------|
| 1 | WeChat cover | 1200×510 | `cover/cover-pentagram` | `cover/cover-build` | `cover/cover-takram` |
| 2 | PPT data slide | 1920×1080 | `ppt/ppt-pentagram` | `ppt/ppt-build` | `ppt/ppt-takram` |
| 3 | Vertical infographic | 1080×1920 | `infographic/infographic-pentagram` | `infographic/infographic-build` | `infographic/infographic-takram` |

### Website Design Scenes

| # | Scene | Spec | Pentagram | Build | Takram |
|---|------|------|-----------|-------|--------|
| 4 | Personal homepage | 1440×900 | `website-homepage/homepage-pentagram` | `website-homepage/homepage-build` | `website-homepage/homepage-takram` |
| 5 | AI directory site | 1440×900 | `website-ai-nav/ainav-pentagram` | `website-ai-nav/ainav-build` | `website-ai-nav/ainav-takram` |
| 6 | AI writing tool | 1440×900 | `website-ai-writing/aiwriting-pentagram` | `website-ai-writing/aiwriting-build` | `website-ai-writing/aiwriting-takram` |
| 7 | SaaS landing page | 1440×900 | `website-saas/saas-pentagram` | `website-saas/saas-build` | `website-saas/saas-takram` |
| 8 | Developer docs | 1440×900 | `website-devdocs/devdocs-pentagram` | `website-devdocs/devdocs-build` | `website-devdocs/devdocs-takram` |

> Each entry includes both `.html` (source) and `.png` (screenshot) files

## Usage

### Referencing During Phase 3 Recommendations
After recommending a design direction, you can show the matching prebuilt scene screenshot:
```
"This is what a WeChat cover looks like in the Pentagram style -> [show cover/cover-pentagram.png]"
"This is the feel of a PPT data slide in the Takram style -> [show ppt/ppt-takram.png]"
```

### Scene-Matching Priority
1. If the user's requested scene has an exact match -> show that scene directly
2. If there is no exact match but a similar type -> show the closest scene instead (for example, "product website" -> show the SaaS landing page)
3. If there is no match at all -> skip the prebuilt sample and go directly to live generation in Phase 3.5

### Side-by-Side Comparison
The 3 styles for the same scene work well shown side by side, helping the user compare them directly:
- "This is the same WeChat cover executed in three different styles"
- Suggested order: Pentagram (rational, restrained) -> Build (luxury minimal) -> Takram (soft, warm)

## Content Details

### WeChat Cover (`cover/`)
- Content: Claude Code agent workflow - 8-agent parallel architecture
- Pentagram: giant red "8" + Swiss grid lines + data bars
- Build: ultra-light "Agent" floating in 70% whitespace + thin warm-gold rules
- Takram: an 8-node radial flowchart treated like artwork + beige background

### PPT Data Slide (`ppt/`)
- Content: GLM-4.7 open-source model coding breakthroughs (AIME 95.7 / SWE-bench 73.8% / τ²-Bench 87.4)
- Pentagram: 260px "95.7" anchor + red/gray/light-gray comparison bars
- Build: three groups of 120px ultra-light numerals floating + warm-gold comparison bars
- Takram: SVG radar chart + three-color overlays + rounded data cards

### Vertical Infographic (`infographic/`)
- Content: AI memory system `CLAUDE.md` optimized from 93KB to 22KB
- Pentagram: giant "93->22" numerals + numbered blocks + CSS data bars
- Build: extreme whitespace + soft-shadow cards + warm-gold connector lines
- Takram: SVG donut chart + organic curved flowchart + frosted-glass cards

### Personal Homepage (`website-homepage/`)
- Content: portfolio homepage for indie developer Alex Chen
- Pentagram: 112px nameplate + Swiss-grid columns + editorial numerals
- Build: glassmorphism nav + floating stats cards + ultra-light type
- Takram: paper texture + small circular avatar + hairline dividers + asymmetrical layout

### AI Directory Site (`website-ai-nav/`)
- Content: AI Compass - a directory of 500+ AI tools
- Pentagram: square-corner search box + numbered tool list + uppercase category labels
- Build: rounded search box + refined white tool cards + pill labels
- Takram: organic offset card layout + soft category tags + diagram-like connections

### AI Writing Tool (`website-ai-writing/`)
- Content: Inkwell - AI writing assistant
- Pentagram: 86px headline + wireframe editor model + grid-based feature columns
- Build: floating editor cards + warm-gold CTA + luxury writing experience
- Takram: poetic serif headline + organic editor + flowchart elements

### SaaS Landing Page (`website-saas/`)
- Content: Meridian - business intelligence analytics platform
- Pentagram: black-and-white split layout + structured dashboard + 140px "3x" anchor
- Build: floating dashboard cards + SVG area chart + warm-gold gradients
- Takram: rounded bar chart + process nodes + soft earth tones

### Developer Docs (`website-devdocs/`)
- Content: Nexus API - unified AI model gateway
- Pentagram: left sidebar nav + square-corner code blocks + red string highlighting
- Build: centered floating code cards + soft shadows + warm-gold icons
- Takram: beige code blocks + flowchart links + dashed feature cards

## File Stats

- HTML source files: 24
- PNG screenshots: 24
- Total assets: 48 files

---

**Version**: v1.0
**Created**: 2026-02-13
**Applies To**: design-philosophy skill Phase 3 recommendation step
