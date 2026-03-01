{
  "title": "delegate-subagent",
  "description": "Delegate focused tasks to a subagent for specialized execution while maintaining main context.",
  "trigger": "When a task needs focused attention, specialized knowledge, or independent execution",
  "input": "Task description, relevant context files, expected output format",
  "steps": [
    "Identify independent task suitable for delegation",
    "Provide clear task description with context",
    "Invoke subagent execution",
    "Review returned results",
    "Integrate changes into main workflow"
  ],
  "output": "Completed subagent task result ready for integration",
  "use_cases": [
    "Running focused refactoring in isolation",
    "Executing specialized tasks (tests, docs, migrations)",
    "Parallel independent work items"
  ],
  "limitations": "Not suitable for tasks requiring main context or real-time collaboration"
}
