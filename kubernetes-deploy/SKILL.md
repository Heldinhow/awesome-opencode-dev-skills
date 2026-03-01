---
name: kubernetes-deploy
description: "Deploy and manage applications on Kubernetes clusters."
---

# Kubernetes Deployment

## Overview
Kubernetes provides container orchestration for automated deployment, scaling, and management. This skill should be invoked when deploying containerized applications, managing microservices, or implementing auto-scaling.

## Core Principles
- **Declarative**: Define desired state in manifests
- **Self-Healing**: Kubernetes maintains desired state
- **Scaling**: Horizontal pod autoscaling
- **Service Networking**: Services enable pod communication

## Preparation Checklist
- [ ] Containerize application with Dockerfile
- [ ] Push image to registry
- [ ] Design Kubernetes manifests
- [ ] Plan resource requirements

## Step-by-Step Process
1. **Containerize**: Build Docker image
2. **Push**: Push to container registry
3. **Manifest**: Write Deployment, Service, ConfigMap
4. **Apply**: Use kubectl apply -f
5. **Configure**: Set up Ingress for external access
6. **Scale**: Configure HPA for autoscaling

## Do's and Don'ts
- ✅ **Do** use ConfigMaps for configuration
- ✅ **Do** set resource requests and limits
- ✅ **Do** implement health checks
- ❌ **Don't** hardcode secrets in manifests
- ❌ **Don't** skip namespace isolation
- ❌ **Don't** ignore resource limits

## Anti-Patterns
- **No Limits**: Not setting CPU/memory limits
- **Secrets in Code**: Hardcoding secrets
- **No Health Checks**: Missing liveness/readiness probes
- **Single Pod**: No replicas for production
