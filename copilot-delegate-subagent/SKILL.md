{
  "title": "copilot-delegate-subagent",
  "description": "Orchestrate and delegate tasks to subagents in GitHub Copilot CLI for parallel or focused execution.",
  "trigger": "When you need to offload work to specialized subagents",
  "input": "Task description, subagent name or type, execution mode (parallel/sequential)",
  "steps": [
    "Define the task or use custom agent",
    "Delegate using direct, fleet, or sequential patterns",
    "Monitor with /tasks command",
    "Review aggregated results",
    "Integrate into main workflow"
  ],
  "output": "Completed subtasks from delegated subagents",
  "use_cases": [
    "Running parallel independent tasks",
    "Using specialized expert agents",
    "Breaking complex tasks into focused subtasks"
  ],
  "limitations": "Context isolation may limit cross-task awareness"
}
