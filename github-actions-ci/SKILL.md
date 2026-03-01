{
  "title": "github-actions-ci",
  "description": "Set up continuous integration workflows using GitHub Actions.",
  "trigger": "When setting up CI/CD with GitHub",
  "input": "Workflow definitions, GitHub repository, test/build scripts",
  "steps": [
    "Create .github/workflows directory",
    "Define workflow YAML with triggers",
    "Configure jobs for build/test",
    "Set up matrix strategies",
    "Add artifact publishing"
  ],
  "output": "GitHub Actions CI workflow",
  "use_cases": [
    "Automated testing on PRs",
    "Code quality checks",
    "Build verification"
  ],
  "limitations": "GitHub-specific; usage limits apply"
}
