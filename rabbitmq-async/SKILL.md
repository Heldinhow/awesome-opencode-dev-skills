{
  "title": "rabbitmq-async",
  "description": "Implement asynchronous messaging using RabbitMQ for distributed systems.",
  "trigger": "When building async message-based systems",
  "input": "RabbitMQ connection, message format, queue definitions",
  "steps": [
    "Set up RabbitMQ connection",
    "Define exchanges and queues",
    "Implement publishers",
    "Implement consumers",
    "Handle message acknowledgments"
  ],
  "output": "Async messaging system with RabbitMQ",
  "use_cases": [
    "Decoupled service communication",
    "Task queues",
    "Event-driven architectures"
  ],
  "limitations": "Requires RabbitMQ infrastructure; message ordering challenges"
}
