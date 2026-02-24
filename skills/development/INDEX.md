# Development & Code Automation Skills (2026)

Core skills for writing, testing, and shipping software with OpenCode.  
Focus: backend + full‑stack developers (.NET, Node, Python, etc.).

Each entry includes:
- **Source** – where the skill lives
- **What it does** – high‑level summary
- **Why use it** – why it matters in 2026
- **Install for OpenCode** – example commands

> Always check each upstream repo for the latest installation instructions and prerequisites.

---

## 1. artifacts-builder

**Source:** https://github.com/TheArchitectit/awesome-opencode-skills/tree/master/artifacts-builder

**What it does**  
Generates rich HTML artifacts and front‑ends (React, Tailwind CSS, shadcn/ui) from natural language prompts. Great for landing pages, dashboards, and UI prototypes.

**Why use it (2026)**  
Starting a UI from scratch is a waste of time. This skill lets you describe the UX and layout, then iterates on a working React/Tailwind implementation under version control.

**Install (global example)**

```bash
# Clone upstream repo
git clone https://github.com/TheArchitectit/awesome-opencode-skills.git
cd awesome-opencode-skills

# Create OpenCode global skills directory (if needed)
mkdir -p ~/.config/opencode/skills/

# Install artifacts-builder globally
cp -r artifacts-builder ~/.config/opencode/skills/
```

**Install (per project)**

```bash
cd /path/to/your/project
mkdir -p skill/

# From the cloned repository
cp -r /path/to/awesome-opencode-skills/artifacts-builder skill/
```

---

## 2. Webapp Testing

**Source:** https://github.com/TheArchitectit/awesome-opencode-skills/tree/master/webapp-testing

**What it does**  
Runs Playwright tests against local web applications: navigation, clicks, forms, screenshots, and assertions – all driven from natural language instructions.

**Why use it (2026)**  
Every serious app has UI flows that break. Automating smoke tests and regression checks via skills is the baseline, not a luxury – especially for full‑stack devs.

**Install (global example)**

```bash
git clone https://github.com/TheArchitectit/awesome-opencode-skills.git
cd awesome-opencode-skills
mkdir -p ~/.config/opencode/skills/
cp -r webapp-testing ~/.config/opencode/skills/
```

**Install (per project)**

```bash
cd /path/to/your/project
mkdir -p skill/
cp -r /path/to/awesome-opencode-skills/webapp-testing skill/
```

> Check the upstream README for Playwright and browser dependencies.

---

## 3. MCP Builder

**Source:**
- TheArchitectit: https://github.com/TheArchitectit/awesome-opencode-skills/tree/master/mcp-builder  
- Also referenced in: https://github.com/zrt-ai-lab/opencode-skills

**What it does**  
Guides you through designing and implementing MCP (Model Context Protocol) servers in Python or TypeScript, so your agent can call external APIs and services.

**Why use it (2026)**  
If you want your agent to do *real* work – talk to your .NET APIs, internal services, observability stack – you need MCP. This skill is the on‑ramp to building robust MCP servers.

**Install (global example)**

```bash
git clone https://github.com/TheArchitectit/awesome-opencode-skills.git
cd awesome-opencode-skills
mkdir -p ~/.config/opencode/skills/
cp -r mcp-builder ~/.config/opencode/skills/
```

**Install (per project)**

```bash
cd /path/to/your/project
mkdir -p skill/
cp -r /path/to/awesome-opencode-skills/mcp-builder skill/
```

---

## 4. Skill Creator

**Source:**
- TheArchitectit: https://github.com/TheArchitectit/awesome-opencode-skills/tree/master/skill-creator  
- Anthropic official examples: https://github.com/anthropics/skills/tree/main/skills/skill-creator

**What it does**  
Meta‑skill that helps you design, structure, and iterate on your own skills: frontmatter, directory layout, supporting scripts, and documentation.

**Why use it (2026)**  
Using other people’s skills is good; building your own is how you get real leverage. Skill Creator reduces friction and enforces good patterns from day one.

**Install (global example)**

```bash
git clone https://github.com/TheArchitectit/awesome-opencode-skills.git
cd awesome-opencode-skills
mkdir -p ~/.config/opencode/skills/
cp -r skill-creator ~/.config/opencode/skills/
```

**Install (per project)**

```bash
cd /path/to/your/project
mkdir -p skill/
cp -r /path/to/awesome-opencode-skills/skill-creator skill/
```

---

## 5. Changelog Generator

**Source:** https://github.com/TheArchitectit/awesome-opencode-skills/tree/master/changelog-generator

**What it does**  
Parses your git history and generates human‑readable changelogs and release notes, translating technical commits into user‑facing language.

**Why use it (2026)**  
Shipping often means communicating often. Automating changelog drafting keeps releases consistent without devs spending hours writing notes.

**Install (global example)**

```bash
git clone https://github.com/TheArchitectit/awesome-opencode-skills.git
cd awesome-opencode-skills
mkdir -p ~/.config/opencode/skills/
cp -r changelog-generator ~/.config/opencode/skills/
```

**Install (per project)**

```bash
cd /path/to/your/project
mkdir -p skill/
cp -r /path/to/awesome-opencode-skills/changelog-generator skill/
```

---

## 6. AgentSys (agentsys)

**Source:** https://github.com/agent-sh/agentsys

**What it is**  
A modular runtime and orchestration suite for AI agents – **14 plugins, ~43 agents, ~30 skills** – focused on automating the entire software development lifecycle: task selection, branching, implementation, review, CI, and shipping.

**Why it belongs here**  
Instead of a single skill, AgentSys is an ecosystem that:
- Defines specialized agents for specific roles (planner, reviewer, tester, etc.)
- Provides skills to analyze drift, code quality, test coverage, and more
- Composes everything into end‑to‑end pipelines that run across sessions

**Install (high‑level)**

AgentSys is installed as a CLI and integrates with OpenCode (and other tools like Claude Code, Codex, Cursor):

```bash
npm install -g agentsys
```

Then follow the upstream documentation for configuring it with OpenCode:  
https://github.com/agent-sh/agentsys

Within this curation, treat AgentSys as a **"development automation bundle"** – it brings many dev‑focused skills under one orchestration runtime.

---

## 7. Obsidian CLI & Markdown (for architecture & notes)

**Source:** https://github.com/kepano/obsidian-skills

Relevant skills for developers:

- `obsidian-markdown` – Work with Obsidian‑flavored Markdown (wikilinks, embeds, callouts, properties).
- `obsidian-bases` – Create and edit Obsidian Bases with views, filters, and formulas.
- `json-canvas` – Create and edit JSON Canvas files (nodes, edges, groups, connections).
- `obsidian-cli` – Interact with Obsidian vaults via the Obsidian CLI.

**Why it matters for devs**  
Architecture diagrams, ADRs, and design notes increasingly live in Obsidian. These skills let your agent treat your vault as a first‑class workspace: read, edit, and generate notes and canvases.

**Install (OpenCode‑style example)**

```bash
git clone https://github.com/kepano/obsidian-skills.git
cd obsidian-skills

# Global skills directory (example)
mkdir -p ~/.config/opencode/skills/
cp -r skills/* ~/.config/opencode/skills/
```

You can also install them per‑project if your OpenCode workspace points at a specific vault path.

---

## 8. Where to Discover More Dev Skills

Beyond the specific skills above, these meta‑resources are essential for discovering new development‑focused skills:

- **libukai/awesome-agent-skills**  
  https://github.com/libukai/awesome-agent-skills  
  Includes links to:
  - `anthropics/skills` – official examples
  - `clickhouse/agent-skills` – database skills
  - `cloudflare/skills` – Cloudflare API skills
  - `browser-use` skills – browser automation
  - `expo/skills` – React Native / Expo skills

Use them alongside this curation to keep your OpenCode dev environment sharp as the ecosystem evolves.
