---
name: grpc-microservices
description: "Implement gRPC communication between microservices using protocol buffers."
---

# gRPC Microservices

## Overview
gRPC is a high-performance RPC framework using Protocol Buffers for efficient, type-safe service communication. This skill should be invoked when building microservices requiring high performance, type-safe communication, or real-time streaming between services.

## Core Principles
- **Contract-First**: Define services in .proto files
- **Code Generation**: Generate strongly-typed clients and servers
- **Streaming**: Support server, client, and bidirectional streaming
- **Performance**: Binary serialization is more efficient than JSON

## Preparation Checklist
- [ ] Install protobuf compiler (protoc)
- [ ] Choose gRPC library for your language
- [ ] Design .proto service definitions
- [ ] Plan message structures

## Step-by-Step Process
1. **Define**: Write .proto files with messages and services
2. **Generate**: Create code with protoc compiler
3. **Implement Server**: Build gRPC server implementing services
4. **Implement Client**: Create client stubs
5. **Configure**: Set up service discovery
6. **Handle Streaming**: Implement streaming logic

## Do's and Don'ts
- ✅ **Do** version .proto files carefully
- ✅ **Do** use streaming for large data
- ✅ **Do** implement proper error handling
- ❌ **Don't** break backward compatibility
- ❌ **Don't** use for browser-facing APIs
- ❌ **Don't** skip error codes mapping

## Anti-Patterns
- **No Versioning**: Breaking changes in .proto
- **Big Payloads**: Sending too much data at once
- **No Error Handling**: Ignoring gRPC status codes
- **Sync Only**: Not using streaming when beneficial
