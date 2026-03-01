---
name: TDD-workflows
description: "Advanced Test-Driven Development (TDD) patterns and workflows for maintaining high quality software with confidence."
---

# TDD Workflows

## Overview
This skill outlines advanced Test-Driven Development (TDD) patterns and workflows. It moves beyond the basic Red-Green-Refactor cycle into practical patterns for complex systems, legacy codebases, and team environments. You should invoke this skill when defining testing strategies, setting up CI/CD test gates, or tackling tricky testing scenarios like external dependencies or stateful systems.

## Core Principles
- **Test Behavior, Not Implementation**: Tests should not break if the internal private implementation details change, only if the public behavior changes.
- **Fast Feedback Loop**: Unit tests must run in milliseconds. A slow test suite discourages developers from running it.
- **Isolate the Subject Under Test (SUT)**: Use test doubles (mocks, stubs, fakes) judiciously to isolate the code being tested.
- **Tests as Documentation**: A well-structured test suite serves as executable documentation of the system's requirements.

## Preparation Checklist
- [ ] Ensure a fast, reliable test runner is configured (e.g., Jest, Pytest, xUnit).
- [ ] Determine the boundaries of the unit or module you are about to test.
- [ ] Identify any external dependencies (databases, APIs) that need to be mocked or faked.

## Step-by-Step Process
1. **Identify the Pattern:** Choose the right TDD approach (e.g., Outside-In (London style) vs. Inside-Out (Chicago style)).
2. **Write the Failing Test (Red):** Define the exact behavior and assertions. See it fail to ensure the test is valid.
3. **Make it Pass (Green):** Write the simplest, ugliest code possible to make the test pass. Do not over-engineer here.
4. **Clean up the Code (Refactor):** Remove duplication, extract methods, apply design patterns. The tests ensure you didn't break anything.
5. **Review Coverage and Edge Cases:** Ask "What if inputs are null? What if the network fails?" Add tests for these edge cases.

## Do's and Don'ts
- ✅ **Do** name tests clearly (e.g., `Should_ReturnFalse_When_InputIsEmpty()`).
- ✅ **Do** arrange, act, and assert (AAA pattern) cleanly in your test methods.
- ❌ **Don't** write "flakey" tests that fail randomly due to timing or shared state.
- ❌ **Don't** test private methods directly; test them through the public API.

## Anti-Patterns
- **The Ice Cream Cone:** Having more end-to-end tests than unit tests, making the suite brittle and slow.
- **Mocking the World:** Over-mocking everything so that the test no longer tests realistic behavior, just the interaction of mocks.
- **Assertion Roulette:** Having multiple assertions in a single test without clear messages, making it hard to know why it failed.
- **The Lonely Test:** Tests that don't actually test anything meaningful because they're too simple or always pass.
