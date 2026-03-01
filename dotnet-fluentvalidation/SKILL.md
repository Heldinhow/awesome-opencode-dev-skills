{
  "title": "dotnet-fluentvalidation",
  "description": "Implement declarative validation rules using FluentValidation in .NET.",
  "trigger": "When validating input models, commands, DTOs, or needing complex validation",
  "input": "Models to validate, validation rules",
  "steps": [
    "Install FluentValidation package",
    "Create validator classes inheriting from AbstractValidator",
    "Define validation rules fluently",
    "Integrate with MediatR pipeline",
    "Handle validation errors"
  ],
  "output": "Validation rules for input models",
  "use_cases": [
    "API input validation",
    "Command validation in CQRS",
    "Complex business rule validation"
  ],
  "limitations": "Additional library dependency; learning curve for fluent syntax"
}
