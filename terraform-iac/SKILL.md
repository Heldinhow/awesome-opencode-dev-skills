{
  "title": "terraform-iac",
  "description": "Manage infrastructure as code using Terraform for reproducible and version-controlled deployments.",
  "trigger": "When you need to create, modify, or manage cloud infrastructure programmatically",
  "input": "Cloud provider credentials, Terraform configuration files (.tf), state file",
  "steps": [
    "Initialize Terraform working directory with terraform init",
    "Create or modify .tf configuration files with desired resources",
    "Review execution plan with terraform plan",
    "Apply changes with terraform apply",
    "Verify infrastructure state with terraform show"
  ],
  "output": "Deployed cloud resources matching the Terraform configuration",
  "use_cases": [
    "Setting up AWS/GCP/Azure infrastructure",
    "Managing reproducible development environments",
    "Infrastructure versioning and auditing"
  ],
  "limitations": "Not suitable for single-server deployments; requires cloud provider access"
}
