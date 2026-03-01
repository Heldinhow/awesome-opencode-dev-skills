---
name: cicd-github-actions
description: "Create CI/CD pipelines using GitHub Actions for automated builds, tests, and deployments."
---

# GitHub Actions CI/CD

## Overview
GitHub Actions provides powerful CI/CD capabilities directly within GitHub repositories. This skill should be invoked when setting up continuous integration and deployment workflows to automate testing, building, and deploying applications.

## Core Principles
- **Workflow as Code**: Define pipelines in version-controlled YAML files
- **Trigger Control**: Configure precise triggers for when workflows run
- **Job Isolation**: Separate concerns into independent jobs
- **Secret Management**: Use GitHub Secrets for sensitive data

## Preparation Checklist
- [ ] Identify CI/CD requirements (test, build, deploy)
- [ ] Create `.github/workflows/` directory
- [ ] Determine trigger events (push, PR, schedule)
- [ ] Plan job dependencies and matrix strategies

## Step-by-Step Process
1. **Create Directory**: Make `.github/workflows/` in repository root
2. **Define YAML**: Create workflow file with name and triggers
3. **Configure Jobs**: Add jobs with steps for each pipeline stage
4. **Set Triggers**: Define when workflow runs (push, PR, schedule)
5. **Add Secrets**: Configure environment variables and secrets
6. **Test Workflow**: Trigger workflow to verify it works

## Do's and Don'ts
- ✅ **Do** use meaningful workflow and job names
- ✅ **Do** enable concurrency to cancel outdated runs
- ✅ **Do** cache dependencies for faster execution
- ❌ **Don't** commit secrets directly in workflow files
- ❌ **Don't** run workflows on every single push
- ❌ **Don't** skip error handling in steps

## Anti-Patterns
- **No Caching**: Downloading dependencies every run
- **Secret Exposure**: Hardcoding sensitive values
- **Overly Complex**: Single workflow trying to do too much
- **No Notifications**: Not setting up failure alerts
