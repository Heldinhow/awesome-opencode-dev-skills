---
name: TDD
description: "Apply test-driven development (TDD) methodology to build reliable, maintainable code systematically."
---

# Test-Driven Development (TDD)

## Overview
Test-Driven Development (TDD) is a software development approach where you write tests before you write the production code. Its purpose is to ensure high code coverage, deep understanding of requirements before implementation, and a robust safety net for future refactoring. Invoke this skill when starting a new feature or when asked to write tests for existing code that currently lacks coverage.

## Core Principles
- **Red-Green-Refactor**: This is the heartbeat of TDD.
  - *Red*: Write a test that fails.
  - *Green*: Write the minimal code to pass the test.
  - *Refactor*: Improve the code structure without altering behavior.
- **YAGNI (You Aren't Gonna Need It)**: Only write code that is required to pass the current failing test. Do not anticipate future requirements.
- **Single Responsibility**: Each test should verify exactly one logical concept or behavior.

## Preparation Checklist
- [ ] Have the feature requirements clearly defined.
- [ ] Set up the testing framework in your project environment.
- [ ] Ensure you can easily execute tests from your command line or IDE.

## Step-by-Step Process
1. **Analyze the Requirement**: Break down the feature into small, testable behaviors.
2. **Write a Failing Test (Red)**: Create a test for the first behavior. Run it to confirm it fails (proving the test is testing something that doesn't exist yet).
3. **Write Minimal Code (Green)**: Implement just enough logic to make the test pass. Hardcoding is acceptable at this stage if it satisfies the immediate test.
4. **Refactor Code (Refactor)**: Clean up the implementation. Remove hardcoding, extract variables, rename for clarity. Ensure the test remains green.
5. **Repeat**: Move to the next behavior in your requirement list and repeat the cycle.
6. **Maintain Test Suite**: Organize tests into suites, remove redundant tests, and ensure execution time remains fast.

## Do's and Don'ts
- ✅ **Do** write the test first, always. It forces you to think about the API design.
- ✅ **Do** run the entire test suite frequently to catch regressions immediately.
- ❌ **Don't** skip the refactor step. That leads to messy, hastily written code.
- ❌ **Don't** write a test that immediately passes; it validates nothing.

## Anti-Patterns
- **Testing Implementation Details**: Writing tests that are tightly coupled to how a method works, rather than what it returns. This makes refactoring impossible.
- **The Giant Test**: A single test method spanning hundreds of lines with dozens of assertions.
- **Testing the Framework**: Testing that a database saves a record instead of testing your business logic around saving that record.
