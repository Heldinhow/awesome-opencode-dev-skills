---
name: docker-swarm
description: "Orchestrate containerized applications using Docker Swarm for clustering and service management."
---

# Docker Swarm

## Overview
Docker Swarm provides native clustering and orchestration for Docker containers, enabling deployment across multiple hosts. This skill should be invoked when deploying and managing containers across multiple hosts with features like load balancing, scaling, and service discovery.

## Core Principles
- **Manager-Worker**: Swarm uses manager nodes for orchestration, workers for workloads
- **Services**: Define services that specify container images and configuration
- **Stacks**: Use stacks to deploy multi-service applications
- **Secrets**: Use Docker secrets for sensitive data

## Preparation Checklist
- [ ] Install Docker on all nodes
- [ ] Plan network architecture (overlay networks)
- [ ] Design service topology
- [ ] Prepare Docker Compose files

## Step-by-Step Process
1. **Initialize**: Run `docker swarm init` on manager node
2. **Join**: Add worker nodes with `docker swarm join`
3. **Network**: Create overlay network: `docker network create -d overlay <name>`
4. **Define**: Write docker-compose.yml with service definitions
5. **Deploy**: Use `docker stack deploy -c compose.yml <name>`
6. **Scale**: Scale with `docker service scale <service>=<replicas>`

## Do's and Don'ts
- ✅ **Do** use multiple manager nodes for high availability
- ✅ **Do** use secrets for sensitive data
- ✅ **Do** implement health checks in services
- ❌ **Don't** put all services on single manager
- ❌ **Don't** skip service replication for critical services
- ❌ **Don't** ignore rolling update configuration

## Anti-Patterns
- **Single Point**: Running with only one manager node
- **No Health Checks**: Not defining container health
- **Secret Exposure**: Using environment variables for secrets
- **No Updates**: Not planning for rolling updates
