---
name: n8n-automation
description: "Automate workflows and connect services using n8n, a powerful workflow automation tool."
---

# n8n Workflow Automation

## Overview
n8n is a powerful workflow automation tool that connects services and automates processes. This skill should be invoked when automating business processes, connecting APIs, or building no-code integrations.

## Core Principles
- **Nodes**: Use nodes to connect different services
- **Triggers**: Start workflows with various triggers
- **Expressions**: Use JavaScript for data transformation
- **Error Handling**: Implement proper error workflows

## Preparation Checklist
- [ ] Set up n8n (self-hosted or cloud)
- [ ] Identify automation requirements
- [ ] Map out workflow steps
- [ ] Gather API credentials

## Step-by-Step Process
1. **Create**: Start new workflow in n8n
2. **Trigger**: Set up trigger (webhook, schedule, etc.)
3. **Nodes**: Add and configure nodes
4. **Transform**: Use expressions for data
5. **Test**: Run workflow to verify
6. **Deploy**: Activate workflow

## Do's and Don'ts
- ✅ **Do** use descriptive names
- ✅ **Do** implement error handling
- ✅ **Do** test thoroughly before activating
- ❌ **Don't** expose credentials in logs
- ❌ **Don't** skip error workflows
- ❌ **Don't** create overly complex workflows

## Anti-Patterns
- **No Error Handling**: Missing error workflows
- **Hardcoded Credentials**: Not using credentials store
- **Complex Flows**: Overly complicated workflows
- **No Testing**: Activating without testing
