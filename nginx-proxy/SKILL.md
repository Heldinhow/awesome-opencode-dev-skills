---
name: nginx-proxy
description: "Configure Nginx as a reverse proxy for routing traffic to backend services."
---

# Nginx Reverse Proxy

## Overview
Nginx is a high-performance web server that excels as a reverse proxy for routing traffic to backend services. This skill should be invoked when routing external traffic to internal services, implementing SSL termination, or setting up load balancing.

## Core Principles
- **Reverse Proxy**: Forward requests to backend services
- **Upstream**: Define backend server groups
- **Location Routing**: Use location blocks for path-based routing
- **SSL/TLS**: Terminate HTTPS for backends

## Preparation Checklist
- [ ] Install Nginx
- [ ] Plan routing structure
- [ ] Identify backend services
- [ ] Prepare SSL certificates

## Step-by-Step Process
1. **Install**: Set up Nginx
2. **Define Upstreams**: Configure backend servers
3. **Route**: Set up location blocks
4. **SSL**: Configure TLS termination
5. **Test**: Validate configuration
6. **Reload**: Apply changes

## Do's and Don'ts
- ✅ **Do** use upstream blocks for backends
- ✅ **Do** include security headers
- ✅ **Do** validate config before reload
- ❌ **Don't** skip SSL configuration
- ❌ **Don't** ignore upstream health checks
- ❌ **Don't** forget to reload after changes

## Anti-Patterns
- **No Upstreams**: Hardcoding backend URLs
- **Missing Headers**: Not adding security headers
- **No Health Checks**: Not monitoring backends
- **Config Errors**: Reloading invalid config
