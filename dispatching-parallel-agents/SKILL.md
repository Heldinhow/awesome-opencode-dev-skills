{
  "title": "dispatching-parallel-agents",
  "description": "Run multiple independent tasks in parallel using subagents for faster execution.",
  "trigger": "When you have 3+ independent tasks that can run concurrently",
  "input": "List of independent tasks, context for each task",
  "steps": [
    "Identify independent tasks that don't share state",
    "Break down work into focused subtasks",
    "Spawn subagents in parallel",
    "Wait for all results",
    "Aggregate and integrate results"
  ],
  "output": "Completed results from all parallel tasks",
  "use_cases": [
    "Fixing multiple unrelated bugs",
    "Building multiple features simultaneously",
    "Running independent tests"
  ],
  "limitations": "Not suitable for dependent tasks or shared context"
}
