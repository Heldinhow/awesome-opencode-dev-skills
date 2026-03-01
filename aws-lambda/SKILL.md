{
  "title": "aws-lambda",
  "description": "Build and deploy serverless functions using AWS Lambda.",
  "trigger": "When you need to create event-driven serverless functions",
  "input": "Function code (Node.js, Python, etc.), handler configuration, event sources",
  "steps": [
    "Create Lambda function with runtime",
    "Define handler function",
    "Configure event triggers",
    "Set up environment variables",
    "Deploy and test with mock events"
  ],
  "output": "Serverless Lambda function responding to events",
  "use_cases": [
    "Event-driven processing",
    "API backends",
    "Data processing pipelines"
  ],
  "limitations": "Cold start latency; limited execution time; vendor lock-in"
}
