---
name: webapp-testing
description: "Test web applications using Playwright for end-to-end browser testing."
---

# Web Application Testing

## Overview
Playwright provides automated browser testing for web applications with multi-browser support. This skill should be invoked when performing end-to-end testing, regression testing, or validating user flows.

## Core Principles
- **Browser Automation**: Control browsers programmatically
- **Multi-Browser**: Test across Chromium, Firefox, WebKit
- **Page Objects**: Use page object models for maintainability
- **Assertions**: Verify expected behavior

## Preparation Checklist
- [ ] Install Playwright: `npm init playwright`
- [ ] Install browsers: `npx playwright install`
- [ ] Identify test scenarios
- [ ] Plan page object structure

## Step-by-Step Process
1. **Install**: Set up Playwright and browsers
2. **Write Tests**: Create test scripts
3. **Model**: Define page objects
4. **Run**: Execute tests
5. **Report**: Generate test reports
6. **CI/CD**: Integrate with pipeline

## Do's and Don'ts
- ✅ **Do** use page object models
- ✅ **Do** run tests in parallel
- ✅ **Do** use appropriate assertions
- ❌ **Don't** write flaky tests
- ❌ **Don't** skip test isolation
- ❌ **Don't** ignore test maintenance

## Anti-Patterns
- **Flaky Tests**: Unreliable test behavior
- **No Isolation**: Tests depending on each other
- **Hardcoded Waits**: Using sleep instead of waits
- **No Maintenance**: Abandoning test suite
