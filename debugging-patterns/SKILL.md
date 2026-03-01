---
name: debugging-patterns
description: "Apply systematic debugging strategies and use appropriate tools to identify and fix issues."
---

# Debugging Patterns

## Overview
Debugging is the systematic process of identifying, analyzing, and resolving defects in software. This skill should be invoked when encountering unexpected behavior, errors, or failures in code. Effective debugging requires a methodical approach rather than random trial-and-error. Invoke this skill when fixing production bugs, troubleshooting test failures, or analyzing runtime errors.

## Core Principles
- **Reproducibility**: A bug that cannot be reproduced cannot be reliably fixed. Always aim to create a consistent reproduction case.
- **Hypothesis-Driven**: Form testable hypotheses about the root cause before making changes. Never guess.
- **Isolation**: Isolate variables by removing noise and focusing on the minimal code path that reproduces the issue.
- **Observability**: Use logs, breakpoints, and debugging tools to observe system state rather than assuming.

## Preparation Checklist
- [ ] Gather the exact error message, stack trace, and relevant logs
- [ ] Identify the environment where the bug occurs (dev, staging, production)
- [ ] Ensure you have access to debugging tools appropriate for the language/framework
- [ ] Understand the expected behavior vs. actual behavior

## Step-by-Step Process
1. **Reproduce**: Create a minimal test case that consistently reproduces the issue
2. **Gather Evidence**: Collect error messages, stack traces, logs, and relevant code
3. **Form Hypothesis**: Based on evidence, hypothesize the root cause
4. **Isolate**: Simplify the reproduction case to its essential elements
5. **Test Hypothesis**: Use debugging tools (breakpoints, logging, REPL) to verify your hypothesis
6. **Fix**: Implement the minimal change to resolve the issue
7. **Verify**: Confirm the fix works and does not break existing functionality

## Do's and Don'ts
- ✅ **Do** read the full stack trace from bottom to top - the root cause is often at the bottom
- ✅ **Do** use binary search by commenting out code halves to isolate the problematic section
- ✅ **Do** check recent changes (git diff) when a bug suddenly appears
- ❌ **Don't** randomly change code hoping something works
- ❌ **Don't** ignore warning messages - they often indicate the root cause
- ❌ **Don't** fix symptoms rather than root causes - the bug will resurface

## Anti-Patterns
- **The Shotgun Debugger**: Making random changes across multiple files without understanding the problem
- **Debugging by Printf**: Scattering console.log statements everywhere instead of using proper debugging tools
- **Ignoring Warnings**: Treating compiler warnings or linter errors as unimportant
- **Assuming Without Testing**: Believing you know the cause without verifying with evidence
