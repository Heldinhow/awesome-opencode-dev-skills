{
  "title": "nginx-proxy",
  "description": "Configure Nginx as a reverse proxy for routing traffic to backend services.",
  "trigger": "When you need to route external traffic to internal services or load balance",
  "input": "Nginx configuration, upstream server definitions, domain names",
  "steps": [
    "Install and configure Nginx",
    "Define upstream backend servers",
    "Set up location blocks for routing",
    "Configure SSL/TLS termination",
    "Test configuration and reload Nginx"
  ],
  "output": "Configured reverse proxy routing traffic to backend services",
  "use_cases": [
    "Routing to multiple backend services",
    "SSL termination for HTTPS",
    "Load balancing across servers"
  ],
  "limitations": "Not a full application server; limited dynamic service discovery"
}
