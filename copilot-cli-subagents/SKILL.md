{
  "title": "copilot-cli-subagents",
  "description": "Use GitHub Copilot CLI with /fleet for parallel subagent execution and custom agent workflows.",
  "trigger": "When you need to execute multiple independent tasks in parallel using Copilot",
  "input": "Task description, custom agent definitions, model selection",
  "steps": [
    "Enter plan mode (Shift+Tab) for complex tasks",
    "Define implementation plan with subtasks",
    "Execute with /fleet command",
    "Monitor with /tasks command",
    "Review and integrate results"
  ],
  "output": "Parallel execution results from multiple subagents",
  "use_cases": [
    "Implementing multiple features simultaneously",
    "Running independent refactoring tasks",
    "Coordinating custom agents for specialized work"
  ],
  "limitations": "Higher API costs with multiple subagents; not for sequential dependent tasks"
}
