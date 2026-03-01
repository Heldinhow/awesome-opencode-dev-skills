---
name: mcp-builder
description: "Build high-quality MCP (Model Context Protocol) servers for LLM tool integration."
---

# MCP Server Builder

## Overview
MCP (Model Context Protocol) servers enable LLMs to interact with external tools and APIs. This skill should be invoked when building MCP servers to integrate external services, create LLM tool integrations, or extend AI agent capabilities.

## Core Principles
- **Tool Design**: Create clear, composable tool definitions
- **Schema Validation**: Define input/output schemas for each tool
- **Error Handling**: Implement comprehensive error handling
- **Testing**: Write evaluation tests for reliability

## Preparation Checklist
- [ ] Understand target API or service
- [ ] Design tool schema structure
- [ ] Choose MCP SDK (Python, TypeScript)
- [ ] Plan error handling strategy

## Step-by-Step Process
1. **Research**: Study target API and MCP patterns
2. **Design**: Plan tool definitions with schemas
3. **Implement**: Build MCP server with tools
4. **Handle Errors**: Add comprehensive error handling
5. **Test**: Create evaluation tests
6. **Document**: Document tool usage

## Do's and Don'ts
- ✅ **Do** design clear, focused tools
- ✅ **Do** validate all inputs
- ✅ **Do** implement proper error messages
- ❌ **Don't** create monolithic tools
- ❌ **Don't** skip error handling
- ❌ **Don't** ignore response schemas

## Anti-Patterns
- **Monolithic Tools**: Creating tools that do too much
- **No Validation**: Skipping input validation
- **Poor Errors**: Vague error messages
- **No Testing**: Deploying without evaluation
