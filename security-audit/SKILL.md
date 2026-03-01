{
  "title": "security-audit",
  "description": "Perform security vulnerability scanning and audits to identify and fix security issues.",
  "trigger": "When you need to assess application security or before deploying to production",
  "input": "Codebase, dependencies, configuration files",
  "steps": [
    "Run dependency vulnerability scanners",
    "Check for common vulnerabilities (SQL injection, XSS, CSRF)",
    "Review authentication and authorization mechanisms",
    "Analyze configuration for security issues",
    "Generate security report with remediation steps"
  ],
  "output": "Security vulnerability report with identified issues and fixes",
  "use_cases": [
    "Pre-deployment security checks",
    "Identifying vulnerable dependencies",
    "Compliance auditing"
  ],
  "limitations": "Automated scans may miss business logic vulnerabilities"
}
