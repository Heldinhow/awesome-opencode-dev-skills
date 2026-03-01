{
  "title": "cicd-github-actions",
  "description": "Create CI/CD pipelines using GitHub Actions for automated builds, tests, and deployments.",
  "trigger": "When setting up continuous integration and deployment workflows",
  "input": "Workflow definitions, GitHub repository, secrets",
  "steps": [
    "Create .github/workflows directory",
    "Define workflow YAML file",
    "Set up triggers (push, pull request)",
    "Configure jobs and steps",
    "Add environment variables and secrets"
  ],
  "output": "GitHub Actions CI/CD pipeline",
  "use_cases": [
    "Automated testing on PRs",
    "Continuous deployment",
    "Release automation"
  ],
  "limitations": "GitHub-specific; may have usage limits"
}
