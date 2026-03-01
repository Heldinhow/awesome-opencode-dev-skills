{
  "title": "dotnet-cqrs",
  "description": "Implement CQRS (Command Query Responsibility Segregation) pattern in .NET for separated read/write operations.",
  "trigger": "When you need scalable architectures with different models for reads and writes",
  "input": "Domain entities, command/query definitions, MediatR library",
  "steps": [
    "Define separate command and query objects",
    "Implement command handlers for write operations",
    "Implement query handlers for read operations",
    "Use MediatR for decoupling",
    "Return DTOs from queries, entities from commands"
  ],
  "output": "CQRS implementation with separated command and query handling",
  "use_cases": [
    "Scalable APIs with different read/write models",
    "Event sourcing architectures",
    "Complex business logic separation"
  ],
  "limitations": "Overkill for simple CRUD applications"
}
