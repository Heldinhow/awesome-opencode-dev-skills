---
name: awesome-copilot
description: >
  GitHub Copilot Agent Skills catalog from awesome-copilot repository.
  Trigger: When user wants to browse, search, or use Agent Skills from the awesome-copilot collection.
license: Apache-2.0
metadata:
  author: helder
  version: "1.0"
---

## When to Use

- Browse available Agent Skills for GitHub Copilot
- Search for specific skill by name or category
- Fetch detailed instructions for a specific skill
- Understand what bundled assets a skill includes
- Find skills for specific technologies or workflows

## How Agent Skills Work

Agent Skills are self-contained folders with instructions and bundled resources that enhance AI capabilities for specialized tasks. Each skill contains a `SKILL.md` file with detailed instructions that agents load on-demand.

**Structure:**
- Each skill is a folder containing a `SKILL.md` instruction file
- Skills may include helper scripts, code templates, or reference data
- Skills follow the Agent Skills specification for maximum compatibility

## Skill Categories

### Development Workflows
- `autoresearch` - Autonomous iterative experimentation loop
- `boost-prompt` - Interactive prompt refinement workflow
- `context-map` - Generate map of relevant files before making changes
- `create-implementation-plan` - Create implementation plan files
- `create-specification` - Create specification files optimized for AI
- `git-commit` - Intelligent git commit with conventional messages
- `git-flow-branch-creator` - Git Flow branch creation

### Microsoft & Azure
- `aspire` - Aspire distributed applications
- `azure-deployment-preflight` - Bicep deployment validation
- `azure-devops-cli` - Azure DevOps management
- `azure-pricing` - Azure cost estimation
- `azure-resource-health-diagnose` - Azure resource diagnosis
- `azure-resource-visualizer` - Mermaid architecture diagrams
- `azure-role-selector` - Least privilege Azure role guidance
- `azure-static-web-apps` - Azure Static Web Apps deployment
- `appinsights-instrumentation` - Azure App Insights telemetry

### GitHub & Code Management
- `create-github-action-workflow-specification` - GitHub Actions specs
- `create-github-issue-feature-from-specification` - GitHub Issues from specs
- `create-github-issues-feature-from-implementation-plan` - Bulk issue creation
- `create-github-pull-request-from-specification` - PRs from specs
- `dependabot` - Dependabot configuration
- `gh-cli` - GitHub CLI comprehensive reference
- `github-issues` - GitHub issues management
- `github-copilot-starter` - GitHub Copilot setup

### Cloud & Infrastructure
- `aws-cdk-python-setup` - AWS CDK Python setup
- `az-cost-optimize` - Azure cost optimization
- `cloud-design-patterns` - 42 distributed system patterns
- `import-infrastructure-as-code` - Azure to Terraform import
- `devops-rollout-plan` - Deployment rollout plans

### .NET & C#
- `aspnet-minimal-api-openapi` - ASP.NET Minimal APIs
- `containerize-aspnet-framework` - ASP.NET Framework containerization
- `containerize-aspnetcore` - ASP.NET Core containerization
- `csharp-async` - C# async best practices
- `csharp-docs` - C# XML documentation
- `csharp-mcp-server-generator` - C# MCP server generation
- `csharp-mstest`, `csharp-nunit`, `csharp-tunit`, `csharp-xunit` - Unit testing
- `dotnet-best-practices` - .NET best practices
- `dotnet-design-pattern-review` - Design pattern review
- `dotnet-upgrade` - .NET framework upgrade
- `ef-core` - Entity Framework Core

### Java & JVM
- `java-add-graalvm-native-image-support` - GraalVM Native Image
- `java-docs` - Javadoc best practices
- `java-junit` - JUnit 5 testing
- `java-mcp-server-generator` - Java MCP server
- `java-refactoring-extract-method` - Extract method refactoring
- `java-springboot` - Spring Boot best practices
- `create-spring-boot-java-project` - Spring Boot project skeleton
- `create-spring-boot-kotlin-project` - Spring Boot Kotlin skeleton

### Python & Data
- `datanalysis-credit-risk` - Credit risk data pipeline
- `eval-driven-dev` - Eval-driven development for LLM apps
- `dataverse-python-advanced-patterns` - Dataverse SDK advanced
- `dataverse-python-production-code` - Dataverse production code
- `dataverse-python-quickstart` - Dataverse SDK quickstart
- `bigquery-pipeline-audit` - BigQuery pipeline audit

### Documentation & Writing
- `documentation-writer` - Diátaxis documentation framework
- `create-readme` - README creation
- `create-llms` - llms.txt file creation
- `create-tldr-page` - tldr page from docs
- `markdown-to-html` - Markdown to HTML conversion
- `convert-plaintext-to-md` - Plaintext to Markdown

### Architecture & Planning
- `architecture-blueprint-generator` - Architecture documentation
- `breakdown-epic-arch` - Epic technical architecture
- `breakdown-epic-pm` - Epic PRD creation
- `breakdown-feature-implementation` - Feature implementation plan
- `breakdown-feature-prd` - Feature PRD
- `breakdown-plan` - Issue planning and automation
- `breakdown-test` - Test planning
- `create-architectural-decision-record` - ADR creation
- `folder-structure-blueprint-generator` - Folder structure analysis
- `code-exemplars-blueprint-generator` - Code quality scanning
- `copilot-instructions-blueprint-generator` - Copilot instructions

### Testing
- `javascript-typescript-jest` - Jest best practices
- `playwright` - E2E testing
- `pytest` - Python testing
- `codeql` - CodeQL security scanning
- `doublecheck` - AI output verification

### Specialized Skills
- `agent-governance` - AI agent governance and trust controls
- `agentic-eval` - AI agent evaluation
- `ai-prompt-engineering-safety-review` - Prompt safety review
- `chrome-devtools` - Browser automation
- `cli-mastery` - GitHub Copilot CLI training
- `codeql` - Security code scanning
- `copilot-sdk` - GitHub Copilot SDK
- `declarative-agents` - Microsoft 365 Copilot agents
- `game-engine` - Web game development
- `mcp-cli` - MCP server CLI interface
- `excalidraw-diagram-generator` - Excalidraw diagrams

### Linux Triage
- `arch-linux-triage` - Arch Linux issues
- `centos-linux-triage` - CentOS issues
- `debian-linux-triage` - Debian issues
- `fedora-linux-triage` - Fedora issues

### Go-to-Market (GTM)
- `gtm-0-to-1-launch` - Product launch
- `gtm-ai-gtm` - AI product positioning
- `gtm-board-and-investor-communication` - Board communication
- `gtm-developer-ecosystem` - Developer programs
- `gtm-enterprise-account-planning` - Enterprise sales
- `gtm-enterprise-onboarding` - Enterprise onboarding
- `gtm-operating-cadence` - Meeting rhythms
- `gtm-partnership-architecture` - Partner ecosystems
- `gtm-positioning-strategy` - Market positioning
- `gtm-product-led-growth` - PLG strategies
- `gtm-technical-product-pricing` - Technical pricing

## Fetching a Skill

To fetch a specific skill from the awesome-copilot repository:

1. Use `WebFetch` to get the skill content from:
   ```
   https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/{skill-name}/SKILL.md
   ```

2. Or browse the full catalog at:
   ```
   https://github.com/github/awesome-copilot/blob/main/docs/README.skills.md
   ```

## Bundled Assets

Some skills include additional files:

| Skill | Assets |
|-------|--------|
| `aspire` | `references/*.md` - Architecture, CLI, dashboard docs |
| `azure-devops-cli` | `references/*.md` - Advanced usage, pipelines, repos |
| `cli-mastery` | `references/*.md` - 8 learning modules |
| `cloud-design-patterns` | `references/*.md` - 42 pattern references |
| `codeql` | `references/*.md` - CLI, SARIF, workflow config |
| `copilot-usage-metrics` | `*.sh` - Metric gathering scripts |
| `excalidraw-diagram-generator` | `references/*.md`, `scripts/*.py`, `templates/` |
| `game-engine` | `assets/*.md`, `references/*.md` - Game templates |
| `github-issues` | `references/*.md` - Issue fields, templates |

## Resources

- **Repository**: https://github.com/github/awesome-copilot
- **Skills Catalog**: https://github.com/github/awesome-copilot/blob/main/docs/README.skills.md
- **Agent Skills Spec**: https://agentskills.io/specification
