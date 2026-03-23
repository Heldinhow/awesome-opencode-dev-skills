---
name: code-review
description: Use when reviewing code changes, pull requests, or diffs. Provides a structured review framework covering correctness, security, performance, readability, and test coverage.
---

# Code Review

## Review Order

Always review in this order to catch the most critical issues first:

1. **Correctness** — Does it do what it's supposed to?
2. **Security** — Does it introduce vulnerabilities?
3. **Performance** — Are there obvious bottlenecks?
4. **Maintainability** — Is it readable and well-structured?
5. **Tests** — Is the change adequately tested?

## Correctness Checklist
- [ ] Logic matches the stated requirements
- [ ] Edge cases handled (empty input, nulls, boundary values)
- [ ] Error paths are handled, not silently swallowed
- [ ] No off-by-one errors in loops/slices
- [ ] Async code awaited correctly, no race conditions
- [ ] State mutations are intentional and isolated

## Security Checklist
- [ ] No secrets, tokens, or credentials in code
- [ ] User input is validated and sanitized before use
- [ ] SQL queries use parameterized statements (no string concatenation)
- [ ] No eval() or dynamic code execution with user data
- [ ] Auth checks happen server-side, not just client-side
- [ ] Sensitive data not logged
- [ ] Dependencies are not introducing known CVEs

## Performance Checklist
- [ ] No N+1 query problems (batch or eager-load where needed)
- [ ] Large datasets paginated, not loaded entirely into memory
- [ ] Expensive operations cached when appropriate
- [ ] No unnecessary re-renders (React: check deps arrays)
- [ ] Database queries have appropriate indexes

## Maintainability Checklist
- [ ] Functions and variables have clear, descriptive names
- [ ] Functions do one thing (single responsibility)
- [ ] No duplication — shared logic is extracted
- [ ] No magic numbers or unexplained constants
- [ ] Complex logic has a brief comment explaining the *why*
- [ ] Dead code removed

## Test Checklist
- [ ] New behavior is covered by tests
- [ ] Bug fixes have a regression test
- [ ] Tests are readable — clear setup, assertion, and test name
- [ ] Tests don't depend on external state or execution order
- [ ] Edge cases are tested, not just the happy path

## Feedback Tone
- Be specific: "This query will N+1 on `users.posts` — use `include: { posts: true }`" not "fix the query"
- Distinguish severity: use `[blocker]`, `[suggestion]`, `[nit]` prefixes
- Explain the *why* behind concerns, not just what to change
- Acknowledge good decisions: "Good call extracting this into a hook"

## Output Format

```
## Summary
[1-3 sentence overall assessment]

## Blockers
- [blocker] <file>:<line> — <issue and why it matters>

## Suggestions
- [suggestion] <file>:<line> — <improvement and rationale>

## Nits
- [nit] <file>:<line> — <minor style/naming note>

## Positive Notes
- <what was done well>
```
