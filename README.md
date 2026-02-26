# awesome-opencode-dev-skills

Custom skills, agents and configurations for OpenCode and OhMyOpenCode.

## Skills

### .NET Skills

| Skill | Description |
|-------|-------------|
| [dotnet-clean-architecture](./dotnet-clean-architecture/) | Clean Architecture patterns for .NET |
| [dotnet-cqrs](./dotnet-cqrs/) | CQRS pattern implementation |
| [dotnet-mediatr](./dotnet-mediatr/) | MediatR mediator pattern |
| [dotnet-fluentvalidation](./dotnet-fluentvalidation/) | FluentValidation for input validation |
| [dotnet-carter](./dotnet-carter/) | Carter minimal API routing |

### Orchestration

| Skill | Description |
|-------|-------------|
| [dispatching-parallel-agents](./dispatching-parallel-agents/) | Orchestrate multiple sub-agents in parallel |

## Installation

```bash
# Clone and install
git clone https://github.com/Heldinhow/awesome-opencode-dev-skills.git
cd awesome-opencode-dev-skills
cp -r <skill-name> ~/.opencode/skills/
```

## Usage

Each skill has its own README with specific instructions.

## .NET Quick Start

### Clean Architecture Template

```bash
# Install template
dotnet new install Ardalis.CleanArchitecture.Template

# Create project
dotnet new cleanarch -o MyProject
```

### With MediatR + Carter

```bash
dotnet add package MediatR
dotnet add package Carter
dotnet add package FluentValidation
dotnet add package FluentValidation.DependencyInjectionExtensions
```

## Contributing

1. Create a new skill folder
2. Add SKILL.md with documentation
3. Add _meta.json with metadata
4. Submit PR
