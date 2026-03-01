{
  "title": "database-migrations",
  "description": "Manage database schema changes using migration tools and version control.",
  "trigger": "When you need to evolve database schema safely over time",
  "input": "Database type, migration tool, schema changes",
  "steps": [
    "Initialize migration system",
    "Create migration files for schema changes",
    "Run migrations in correct order",
    "Handle rollbacks when needed",
    "Verify migration success"
  ],
  "output": "Database schema updated with versioned migrations",
  "use_cases": [
    "Schema evolution for applications",
    "Team database development",
    "Rolling back problematic changes"
  ],
  "limitations": "Migration conflicts in team environments; requires downtime for large changes"
}
