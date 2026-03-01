---
name: debugging
description: "Apply systematic debugging patterns and strategies to identify and fix software issues efficiently."
---

# Debugging

## Overview
Debugging is the systematic process of finding and fixing defects in software. This skill should be invoked when encountering bugs, errors, or unexpected behavior that requires methodical investigation and resolution.

## Core Principles
- **Reproducibility**: Create consistent reproduction steps before fixing
- **Evidence-Based**: Use logs, breakpoints, and error messages as clues
- **Hypothesis Testing**: Form theories, then test them systematically
- **Isolation**: Narrow down the problem space through binary search

## Preparation Checklist
- [ ] Gather full error messages and stack traces
- [ ] Identify the environment where issue occurs
- [ ] Collect relevant logs before and during the issue
- [ ] Understand expected vs actual behavior

## Step-by-Step Process
1. **Reproduce**: Create minimal steps to reproduce consistently
2. **Gather**: Collect error messages, logs, and relevant code
3. **Isolate**: Use binary search to narrow down the problem
4. **Hypothesize**: Form theories about root cause
5. **Test**: Verify hypothesis with targeted experiments
6. **Fix**: Implement minimal fix
7. **Verify**: Confirm fix resolves the issue

## Do's and Don'ts
- ✅ **Do** read stack traces from bottom to top
- ✅ **Do** check recent git changes when issues appear suddenly
- ✅ **Do** use binary search to isolate problem areas
- ❌ **Don't** randomly change code hoping something works
- ❌ **Don't** ignore warning messages
- ❌ **Don't** fix symptoms instead of root causes

## Anti-Patterns
- **Shotgun Debugging**: Making random changes everywhere
- **Confirmation Bias**: Only looking for evidence that supports your theory
- **Assuming**: Believing you know the cause without verification
- **Ignoring Warnings**: Treating warnings as unimportant
