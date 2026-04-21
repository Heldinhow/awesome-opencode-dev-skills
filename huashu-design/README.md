<sub>🌐 <a href="README.en.md">English</a> · <b>Default README</b></sub>

<div align="center">

# Huashu Design

> *"Type. Hit enter. A finished design lands in your lap."*
> *"Type. Hit enter. A finished design lands in your lap."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**Say one sentence to your agent and get back a finished design.**

<br>

In 3 to 30 minutes, you can ship a **product launch animation**, a clickable App prototype, an editable PPT deck, or a print-grade infographic.

This is not "pretty good for AI" quality. It looks like a real product design team made it. Give the skill your brand assets (logo, palette, UI screenshots) and it reads your brand's voice; give it nothing and the built-in 20 design vocabularies still keep you out of AI slop territory.

**Every animation in this README was made by huashu-design itself.** No Figma, no After Effects, just a one-line prompt and the skill. If your next launch needs a promo film, now you can make that too.

```
npx skills add alchaincyf/huashu-design
```

Agent-agnostic: works in Claude Code, Cursor, Codex, OpenClaw, Hermes, and similar environments.

[See it work](#demo-gallery) · [Install](#install) · [What it does](#what-it-does) · [Core mechanics](#core-mechanics) · [vs. Claude Design](#vs-claude-design)

</div>

---

<p align="center">
  <img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.gif" alt="huashu-design Hero · type -> choose direction -> gallery expands -> focus -> brand reveal" width="100%">
</p>

<p align="center"><sub>
  ▲ 25 seconds · Terminal -> 4 directions -> Gallery ripple -> 4 focus shifts -> Brand reveal<br>
  👉 <a href="https://www.huasheng.ai/huashu-design-hero/">Open the interactive HTML version with sound</a> ·
  <a href="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.mp4">Download MP4 (with BGM + SFX · 10MB)</a>
</sub></p>

---

## Install

```bash
npx skills add alchaincyf/huashu-design
```

Then just talk to Claude Code:

```
"Make a keynote for AI psychology. Give me 3 style directions to choose from."
"Build an iOS prototype for an AI Pomodoro app with 4 actually clickable core screens."
"Turn this logic into a 60-second animation and export MP4 and GIF."
"Run a 5-dimension critique on this design."
```

No buttons, no panels, no Figma plugin.

---

## Star History

<p align="center">
  <a href="https://star-history.com/#alchaincyf/huashu-design&Date">
    <img src="https://api.star-history.com/svg?repos=alchaincyf/huashu-design&type=Date" alt="huashu-design Star History" width="80%">
  </a>
</p>

---

## What It Does

| Capability | Deliverable | Typical Time |
|------|--------|----------|
| Interactive prototype (App / Web) | Single-file HTML · real iPhone bezel · clickable · Playwright-verified | 10–15 min |
| Slide decks | HTML deck (browser presentation) + editable PPTX (text frames preserved) | 15–25 min |
| Timeline animation | MP4 (25fps / 60fps interpolation) + GIF (palette optimized) + BGM | 8–12 min |
| Design variations | 3+ side-by-side comparisons · Tweaks live tuning · cross-dimension exploration | 10 min |
| Infographic / visualization | Print-grade layout · exportable to PDF/PNG/SVG | 10 min |
| Design direction advisor | 5 schools × 20 design philosophies · recommends 3 directions · generates demos in parallel | 5 min |
| 5-dimension expert critique | Radar chart + Keep/Fix/Quick Wins · actionable repair list | 3 min |

---

## Demo Gallery

### Design Direction Advisor

Fallback for vague briefs: choose 3 differentiated directions from 5 schools × 20 design philosophies, generate all 3 demos in parallel, and let the user choose.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w3-fallback-advisor.gif" width="100%"></p>

### iOS App Prototype

Pixel-accurate iPhone 15 Pro body (Dynamic Island / status bar / Home Indicator) · state-driven multi-screen navigation · real images from Wikimedia/Met/Unsplash · automatic Playwright click tests.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c1-ios-prototype.gif" width="100%"></p>

### Motion Design Engine

Stage + Sprite time-slice model · `useTime` / `useSprite` / `interpolate` / `Easing` cover all animation needs in four APIs · one command exports MP4 / GIF / 60fps interpolation / BGM-scored final videos.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c3-motion-design.gif" width="100%"></p>

### HTML Slides -> Editable PPTX

HTML deck for browser presentation · `html2pptx.js` reads DOM computed styles and translates each element into PowerPoint objects · exports are **real text boxes**, not image-backed fakes.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c2-slides-pptx.gif" width="100%"></p>

### Tweaks · Live Variant Switching

Colors / typography / information density parameterized · side-panel switching · pure frontend + `localStorage` persistence · survives refreshes.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c4-tweaks.gif" width="100%"></p>

### Infographic / Data Visualization

Magazine-grade layout · precise CSS Grid columns · `text-wrap: pretty` typographic details · driven by real data · exports to vector PDF / 300dpi PNG / SVG.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c5-infographic.gif" width="100%"></p>

### 5-Dimension Expert Critique

Philosophical coherence · visual hierarchy · execution craft · functionality · innovation, each scored 0-10 · radar chart visualization · outputs a Keep / Fix / Quick Wins list.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c6-expert-review.gif" width="100%"></p>

### Junior Designer Workflow

No heroic one-shot attempts: start with assumptions + placeholders + reasoning, show the work early, then iterate. Fixing a misunderstanding early is 100x cheaper than fixing it late.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w2-junior-designer.gif" width="100%"></p>

### Core Asset Protocol · 5-Step Hard Process

Mandatory when a specific brand is involved: ask -> search -> download (three fallback paths) -> grep color values -> write `brand-spec.md`.

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w1-brand-protocol.gif" width="100%"></p>

---

## Core Mechanics

### Core Asset Protocol

The strictest rule in the skill. When the task involves a specific brand (Stripe, Linear, Anthropic, your own company, etc.), these 5 steps are mandatory:

| Step | Action | Purpose |
|------|------|------|
| 1 · Ask | Does the user have brand guidelines? | Respect existing resources |
| 2 · Search official brand pages | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | Get authoritative color values |
| 3 · Download assets | SVG files -> official site HTML -> sample colors from product screenshots | Three fallback paths; if one fails, move to the next immediately |
| 4 · Grep color values | Extract all `#xxxxxx` values from assets, sort by frequency, filter black/white/gray | **Never guess brand colors from memory** |
| 5 · Freeze the spec | Write `brand-spec.md` + CSS variables, and reference `var(--brand-*)` everywhere in HTML | Unfrozen knowledge gets forgotten |

A/B tested (v1 vs v2, 6 agents each): **v2 reduced stability variance by 5x**. Stability of stability is the real moat of this skill.

### Design Direction Advisor (Fallback)

Triggered when the user's brief is too vague to execute directly:

- Do not force it using generic intuition; enter Fallback mode
- Recommend 3 differentiated directions from 5 schools × 20 design philosophies, **each from a different school**
- Give each direction reference works, tonal keywords, and representative designers
- Generate 3 visual demos in parallel for the user to choose from
- Once one is chosen, continue into the main Junior Designer flow

### Junior Designer Workflow

The default working mode across all tasks:

- Before starting, send the full question list in one batch and wait for the answers
- Write assumptions + placeholders + reasoning comments into the HTML first
- Show the work early to the user, even if it is just gray blocks
- Show the user again after these three stages: real content -> variations -> Tweaks
- Before delivery, manually inspect the browser once with Playwright

### Anti AI-Slop Rules

Avoid the obvious visual common denominator of AI output (purple gradients / emoji icons / rounded corners + left border accents / SVG faces / Inter used for display). Use `text-wrap: pretty` + CSS Grid + carefully chosen serif display faces + oklch colors.

---

## vs. Claude Design

I will say it plainly: the philosophy behind the Core Asset Protocol was learned from Claude Design prompts that circulated publicly. Those prompts keep emphasizing one idea: **great high-fidelity design does not start from a blank page, it grows out of existing design context**. That principle is the dividing line between a 65-point piece and a 90-point piece.

Positioning differences:

| | Claude Design | huashu-design |
|---|---|---|
| Form | Web product (used in the browser) | Skill (used in Claude Code) |
| Quota | Subscription quota | API usage · parallel agents are not quota-blocked |
| Output | In-canvas + exportable to Figma | HTML / MP4 / GIF / editable PPTX / PDF |
| Interaction model | GUI (click, drag, edit) | Conversation (say it, wait for the agent) |
| Complex animation | Limited | Stage + Sprite timeline · 60fps export |
| Cross-agent use | Claude.ai only | Any skill-compatible agent |

Claude Design is the **better graphics tool**. Huashu-design is about **making the graphics-tool layer disappear**. Two paths, different audiences.

---

## Limitations

- **No layer-editable PPTX-to-Figma round trip.** The output is HTML: you can screenshot it, record it, or export images, but you cannot drag it into Keynote and tweak text positions.
- **Framer Motion-tier complex animation is out of scope.** 3D, physics simulation, and particle systems exceed the skill boundary.
- **Design quality for completely blank brands drops to 60–65 points.** Building hi-fi from nothing is always a last resort.

This is an 80-point skill, not a 100-point product. For people who do not want to open a graphical UI, an 80-point skill can be more useful than a 100-point product.

---

## Repository Structure

```
huashu-design/
├── SKILL.md                 # Main document (read by the agent)
├── README.md                # This file (for users)
├── assets/                  # Starter Components
│   ├── animations.jsx       # Stage + Sprite + Easing + interpolate
│   ├── ios_frame.jsx        # iPhone 15 Pro bezel
│   ├── android_frame.jsx
│   ├── macos_window.jsx
│   ├── browser_window.jsx
│   ├── deck_stage.js        # HTML slide engine
│   ├── deck_index.html      # Multi-file deck assembler
│   ├── design_canvas.jsx    # Side-by-side variation display
│   ├── showcases/           # 24 prebuilt samples (8 scenes × 3 styles)
│   └── bgm-*.mp3            # 6 scene-specific background music tracks
├── references/              # Task-specific deep-dive docs
│   ├── animation-pitfalls.md
│   ├── design-styles.md     # Detailed library of 20 design philosophies
│   ├── slide-decks.md
│   ├── editable-pptx.md
│   ├── critique-guide.md
│   ├── video-export.md
│   └── ...
├── scripts/                 # Export toolchain
│   ├── render-video.js      # HTML → MP4
│   ├── convert-formats.sh   # MP4 → 60fps + GIF
│   ├── add-music.sh         # MP4 + BGM
│   ├── export_deck_pdf.mjs
│   ├── export_deck_pptx.mjs
│   ├── html2pptx.js
│   └── verify.py
└── demos/                   # 9 capability demos (c*/w*), bilingual GIF/MP4/HTML + hero v10
```

---

## Origin Story

The day Anthropic launched Claude Design, I stayed up with it until 4 a.m. A few days later I realized I had not opened it again. Not because it was bad, it is the most mature product in the category, but because I would rather have an agent work for me in the terminal than open any graphical interface.

So I had an agent dissect Claude Design itself, including the system prompts circulating in the community, the brand asset protocol, and the component mechanics, distill that into a structured spec, and then write it into a skill installed in my own Claude Code.

Thanks to Anthropic for writing the Claude Design prompts so clearly. This kind of derivative work inspired by other products is a new form of open-source culture in the AI era.

---

## License · Usage Rights

**Personal use is free and unrestricted**: study, research, personal creation, making things for yourself, writing articles, side projects, personal social posts. Use it freely, no need to ask.

**Enterprise / commercial use is restricted**: any company, team, or for-profit organization that wants to integrate this skill into a product, external service, or client delivery workflow **must obtain authorization from Huasheng first**. Including but not limited to:
- Using the skill as part of internal company tooling
- Using outputs from the skill as the primary creation method for external deliverables
- Building a commercial product on top of the skill
- Using it in paid client projects

**Commercial licensing contact**: use any of the social platforms listed below.

---

## Connect · Huasheng (Huashu)

Huasheng is an AI-native coder, indie developer, and AI content creator. Notable work includes Cat Fill Light (App Store paid-chart No. 1), *A Book on DeepSeek*, and Nüwa.skill (12,000+ GitHub stars). Combined social following: 300,000+.

| Platform | Handle | Link |
|---|---|---|
| X / Twitter | @AlchainHust | https://x.com/AlchainHust |
| WeChat Official Account | 花叔 | Search for "花叔" in WeChat |
| Bilibili | 花叔 | https://space.bilibili.com/14097567 |
| YouTube | 花叔 | https://www.youtube.com/@Alchain |
| Xiaohongshu | 花叔 | https://www.xiaohongshu.com/user/profile/5abc6f17e8ac2b109179dfdf |
| Official Site | huasheng.ai | https://www.huasheng.ai/ |
| Developer Homepage | bookai.top | https://bookai.top |

For commercial licensing, collaboration inquiries, or sponsored content, DM Huasheng on any of the above platforms.
