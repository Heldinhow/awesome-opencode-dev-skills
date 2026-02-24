# Awesome OpenCode Skills for Developers (2026)

A curated collection of **the most useful Agent Skills for OpenCode developers in 2026**.

This repo is not a replacement for the original skill repositories. Instead, it is:

- A **map of the ecosystem** – where to find the best skills
- A **practical guide** – when to use which skill
- A **setup helper** – how to install skills for OpenCode (global or per‑project)

The focus is on **backend + full‑stack developers** (e.g. .NET, Node, Python) who want to:

- Automate code + review + testing workflows
- Prototype and test front‑ends quickly
- Analyze data, logs and metrics
- Search the web and run deep research
- Generate and maintain documentation
- Orchestrate multiple agents and tools

> This repo only contains **documentation and links**. You still install skills from their original repositories.

---

## Categories

This curation is organized into the following categories:

1. **Development & Code Automation**  
   Code, testing, MCP servers, skill authoring, dev workflows.

2. **Data, Logs & Observability**  
   Databases, CSVs, metrics, log analysis.

3. **Web Search & Research**  
   Search APIs, deep research pipelines.

4. **Docs, Content & Communication**  
   Office docs, PDFs, slides, technical writing.

5. **Productivity & Organization**  
   File organization, invoices, general automation.

6. **Creative & Media**  
   Video/image generation, editing, design.

7. **Knowledge Management (PKM)**  
   Obsidian, Markdown, canvas, note‑taking.

8. **Agents, Orchestration & Meta‑skills**  
   Multi‑agent systems, orchestration runtimes, skill creation.

Each category lives under `skills/<category>/INDEX.md`.

---

## How to Use This Repo

1. **Browse categories** under `skills/` to discover relevant skills.  
2. For each skill, follow the **link to the original repository**.  
3. Use the **installation snippets** to install skills for OpenCode:
   - **Globally** – available to all projects
   - **Per‑project** – only within a specific repo

> For full details on OpenCode skills, see the official docs:  
> https://opencode.ai/docs/skills

---

## OpenCode Skill Locations (2026)

OpenCode follows the Agent Skills standard paths (see also: [libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)).

Common locations:

- **Global skills** (all projects):
  - Linux/macOS: `~/.config/opencode/skills/` or `~/.config/opencode/skill/` (depending on version)
- **Project‑local skills** (per repository):
  - At project root: `skill/` (preferred in recent OpenCode versions)
  - Legacy: `.opencode/skills/`

When in doubt, check your `opencode.json` and the official docs for the version you are running.

---

## Recommended Sources

This curation draws heavily from these excellent projects:

- **[TheArchitectit/awesome-opencode-skills](https://github.com/TheArchitectit/awesome-opencode-skills)**  
  High‑quality, well‑documented skills for documents, dev workflows, testing, and more.

- **[zrt-ai-lab/opencode-skills](https://github.com/zrt-ai-lab/opencode-skills)**  
  A broad skill library for data analysis, logs, video/media, research, and orchestration.

- **[libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)**  
  The definitive guide to Agent Skills, with links to Anthropic, Cloudflare, ClickHouse, Browser Use, Expo, etc.

- **[kepano/obsidian-skills](https://github.com/kepano/obsidian-skills)**  
  Agent skills tailored for Obsidian (Markdown, Bases, JSON Canvas, CLI, web‑to‑markdown).

- **[agent-sh/agentsys](https://github.com/agent-sh/agentsys)**  
  A modular runtime and orchestration system for AI agents, with ~30 skills focused on automating software development workflows.

You should star and follow those repos; this one is a **curated index on top** of them.

---

## Status

- ✅ Initial structure
- ✅ Development category scaffolded
- ⏳ Other categories to be added (data, search, docs, productivity, media, PKM, orchestration)

Contributions and suggestions are welcome: PRs that add **well‑documented, broadly useful skills** are preferred over long lists.
