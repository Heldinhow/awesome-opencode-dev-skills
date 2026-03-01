---
name: deno-runtime
description: "Build applications using Deno runtime with TypeScript support and built-in tooling."
---

# Deno Runtime

## Overview
Deno is a secure TypeScript runtime built on V8, with built-in tooling and modern JavaScript features. This skill should be invoked when creating JavaScript/TypeScript applications that benefit from TypeScript-first development, built-in testing, and simplified dependency management.

## Core Principles
- **TypeScript First**: Use TypeScript natively without compilation setup
- **URL Imports**: Import dependencies directly from URLs
- **Security by Default**: Explicit permissions for file, network, environment access
- **Built-in Tools**: Use Deno for linting, formatting, testing, and bundling

## Preparation Checklist
- [ ] Install Deno: `curl -fsSL https://deno.land/x/install/install.sh | sh`
- [ ] Verify installation: `deno --version`
- [ ] Review Deno API differences from Node.js
- [ ] Set up editor (VS Code with Deno extension)

## Step-by-Step Process
1. **Initialize**: Create TypeScript files directly
2. **Import**: Use URL imports for dependencies
3. **Write Code**: Leverage TypeScript and Deno APIs
4. **Run**: Execute with `deno run --allow-<perm> <file.ts>`
5. **Test**: Use `deno test` for test suites
6. **Deploy**: Deploy to Deno Deploy or Deno-compatible platforms

## Do's and Don'ts
- ✅ **Do** use explicit permissions flags (--allow-read, --allow-net)
- ✅ **Do** use Deno's built-in formatting: `deno fmt`
- ✅ **Do** use Deno's linter: `deno lint`
- ❌ **Don't** assume all Node.js packages work
- ❌ **Don't** use require() - use ES modules only
- ❌ **Don't** skip permission flags in production

## Anti-Patterns
- **Node Assumption**: Assuming Node.js APIs work identically
- **Missing Permissions**: Running without required permissions
- **NPM Packages**: Trying to use npm packages without compatibility layer
- **Ignoring Security**: Not using Deno's permission system
