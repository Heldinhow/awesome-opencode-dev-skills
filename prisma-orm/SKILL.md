{
  "title": "prisma-orm",
  "description": "Use Prisma ORM for type-safe database access in TypeScript/JavaScript applications.",
  "trigger": "When working with databases in TypeScript/Node.js applications",
  "input": "Database schema, Prisma schema file, connection string",
  "steps": [
    "Initialize Prisma project",
    "Define schema in schema.prisma",
    "Generate Prisma client",
    "Use generated client for queries",
    "Run migrations to apply schema"
  ],
  "output": "Type-safe database operations with Prisma",
  "use_cases": [
    "Type-safe database access",
    "Database migrations",
    "Rapid prototyping with ORMs"
  ],
  "limitations": "Additional abstraction layer; migration lock-in"
}
