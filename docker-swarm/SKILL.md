{
  "title": "docker-swarm",
  "description": "Orchestrate containerized applications using Docker Swarm for clustering and service management.",
  "trigger": "When you need to deploy and manage containers across multiple hosts",
  "input": "Dockerfile, service definitions, swarm configuration",
  "steps": [
    "Initialize Docker Swarm cluster",
    "Create overlay network for service communication",
    "Define services in docker-compose.yml",
    "Deploy services with docker stack deploy",
    "Scale services and manage replicas"
  ],
  "output": "Running containerized services managed by Docker Swarm",
  "use_cases": [
    "Multi-container application deployment",
    "Service scaling and load balancing",
    "Container orchestration without Kubernetes"
  ],
  "limitations": "Less feature-rich than Kubernetes; not ideal for complex microservice architectures"
}
