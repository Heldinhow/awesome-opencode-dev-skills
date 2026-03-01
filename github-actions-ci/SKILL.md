---
name: github-actions-ci
description: "Set up continuous integration workflows using GitHub Actions."
---

# GitHub Actions CI

## Overview
GitHub Actions enables automated build, test, and deployment workflows directly in your GitHub repository. This skill should be invoked when setting up CI/CD pipelines for automated testing, code quality checks, and build verification on pull requests and commits.

## Core Principles
- **Workflow as Code**: Define CI/CD pipelines in YAML files stored in the repository
- **Trigger Selection**: Choose appropriate triggers (push, pull_request, schedule) to balance coverage and speed
- **Matrix Strategy**: Use matrix builds to test across multiple versions/configurations efficiently
- **Artifact Management**: Properly configure artifact retention and caching

## Preparation Checklist
- [ ] Identify the workflows needed (CI, CD, security scans)
- [ ] Ensure build and test scripts exist and work locally
- [ ] Determine required runtime versions (Node, Python, .NET, etc.)
- [ ] Plan secret management for deployment workflows

## Step-by-Step Process
1. **Create Directory**: Create `.github/workflows/` directory
2. **Define YAML**: Write workflow YAML with name, on triggers
3. **Configure Jobs**: Set up jobs with steps for checkout, setup, build, test
4. **Add Matrix**: Configure matrix strategy for multi-version testing
5. **Add Artifacts**: Configure artifact upload for build outputs
6. **Set Permissions**: Ensure appropriate GitHub token permissions

## Do's and Don'ts
- ✅ **Do** use concurrency groups to cancel outdated runs on new pushes
- ✅ **Do** cache dependencies to speed up workflow execution
- ✅ **Do** use paths filter to only run workflows when relevant files change
- ❌ **Don't** commit secrets directly - use GitHub Secrets
- ❌ **Don't** run workflows on every push to main without concurrency control
- ❌ **Don't** skip failure notifications - configure status checks properly

## Anti-Patterns
- **The Slow Workflow**: Not caching dependencies, causing minutes-long builds
- **Secret Exposure**: Hardcoding secrets in workflow files
- **No Timeout**: Workflows that can run indefinitely without limits
- **All Triggers**: Running expensive workflows on every minor event
