---
name: terraform-iac
description: "Manage infrastructure as code using Terraform for reproducible and version-controlled deployments."
---

# Terraform Infrastructure as Code

## Overview
Terraform provides infrastructure as code for managing cloud resources declaratively. This skill should be invoked when creating, modifying, or managing cloud infrastructure programmatically with version control and reproducibility.

## Core Principles
- **Declarative**: Define desired state, not steps
- **State Management**: Track infrastructure in state files
- **Plan/Apply**: Review changes before applying
- **Modules**: Reusable infrastructure components

## Preparation Checklist
- [ ] Install Terraform
- [ ] Configure cloud provider credentials
- [ ] Plan infrastructure structure
- [ ] Set up remote state (recommended)

## Step-by-Step Process
1. **Init**: Run `terraform init`
2. **Write**: Create .tf files with resources
3. **Plan**: Review with `terraform plan`
4. **Apply**: Execute with `terraform apply`
5. **Show**: Verify with `terraform show`
6. **State**: Manage state appropriately

## Do's and Don'ts
- ✅ **Do** use remote state for teams
- ✅ **Do** review plan before applying
- ✅ **Do** use modules for reusability
- ❌ **Don't** commit state files to git
- ❌ **Don't** skip plan review
- ❌ **Don't** use resources in wrong order

## Anti-Patterns
- **Local State**: Using local state in teams
- **No Plan**: Applying without reviewing plan
- **Monolith**: Single massive .tf file
- **Hardcoded Values**: Not using variables
