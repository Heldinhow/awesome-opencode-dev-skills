---
name: security-audit
description: "Perform security vulnerability scanning and audits to identify and fix security issues."
---

# Security Audit

## Overview
Security auditing identifies vulnerabilities and security issues in applications. This skill should be invoked when assessing application security, before production deployment, or for compliance requirements.

## Core Principles
- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Minimal permissions required
- **Dependency Scanning**: Check for vulnerable libraries
- **OWASP**: Focus on common vulnerability classes

## Preparation Checklist
- [ ] Choose security tools
- [ ] Define audit scope
- [ ] Gather application architecture
- [ ] Review authentication flow

## Step-by-Step Process
1. **Scan Dependencies**: Run npm audit, OWASP dependency check
2. **Check OWASP**: Test for injection, XSS, CSRF
3. **Review Auth**: Analyze authentication/authorization
4. **Analyze Config**: Check security configurations
5. **Report**: Document findings and remediation

## Do's and Don'ts
- ✅ **Do** scan dependencies regularly
- ✅ **Do** test for OWASP Top 10
- ✅ **Do** review authentication flow
- ❌ **Don't** ignore scanner warnings
- ❌ **Don't** skip manual review
- ❌ **Don't** delay remediation

## Anti-Patterns
- **No Scanning**: Not checking dependencies
- **Ignoring Warnings**: Not fixing scan results
- **Single Layer**: Relying on only one security measure
- **No Documentation**: Not documenting findings
