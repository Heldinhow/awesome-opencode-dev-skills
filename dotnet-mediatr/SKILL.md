{
  "title": "dotnet-mediatr",
  "description": "Implement MediatR mediator pattern in .NET for decoupled request handling.",
  "trigger": "When implementing CQRS, need decoupled handlers, or pipeline behaviors",
  "input": "Request/command definitions, handler implementations",
  "steps": [
    "Install MediatR package",
    "Define request/command records",
    "Implement request handlers",
    "Add pipeline behaviors (logging, validation)",
    "Use in controllers for clean code"
  ],
  "output": "Decoupled request handling with MediatR",
  "use_cases": [
    "CQRS implementation",
    "Clean controller architecture",
    "Pipeline behaviors for cross-cutting concerns"
  ],
  "limitations": "Additional abstraction layer; may be overkill for simple apps"
}
