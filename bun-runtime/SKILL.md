---
name: bun-runtime
description: "Build JavaScript/TypeScript applications using Bun runtime for fast performance."
---

# Bun Runtime

## Overview
Bun is an all-in-one JavaScript runtime designed for speed, with built-in package manager, test runner, and bundler. This skill should be invoked when you need fast JavaScript/TypeScript execution, a streamlined development experience, or want to reduce toolchain complexity.

## Core Principles
- **All-in-One**: Use Bun for runtime, package management, testing, and building
- **Speed First**: Bun is significantly faster than Node.js for most operations
- **Node Compatibility**: Most Node.js code works with Bun
- **Built-in APIs**: Use Bun's native APIs (Bun.file, Bun.serve, etc.)

## Preparation Checklist
- [ ] Install Bun: `curl -fsSL https://bun.sh/install | bash`
- [ ] Verify installation: `bun --version`
- [ ] Review Bun's API differences from Node.js
- [ ] Check compatibility of required packages

## Step-by-Step Process
1. **Initialize**: Run `bun init` to create new project
2. **Install**: Use `bun add <package>` instead of npm install
3. **Write Code**: Use TypeScript directly with Bun APIs
4. **Run**: Execute with `bun run <script>`
5. **Test**: Use `bun test` for running test suites
6. **Deploy**: Deploy to Bun-compatible platforms (Railway, Render, etc.)

## Do's and Don'ts
- ✅ **Do** use Bun's built-in APIs for better performance
- ✅ **Do** use `bun test` for fast test execution
- ✅ **Do** check Bun's compatibility before choosing for production
- ❌ **Don't** assume all Node.js packages work perfectly
- ❌ **Don't** ignore Bun's different global objects
- ❌ **Don't** use npm-specific features not in Bun

## Anti-Patterns
- **Node Assumption**: Assuming all Node.js APIs work identically
- **Package Overlap**: Mixing bun install with npm/yarn
- **Ignoring Warnings**: Not checking Bun's compatibility warnings
- **Production Blindness**: Using Bun in production without testing edge cases
