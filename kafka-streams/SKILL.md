---
name: kafka-streams
description: "Process streaming data using Apache Kafka Streams for real-time analytics."
---

# Kafka Streams

## Overview
Kafka Streams is a client library for building real-time streaming applications. This skill should be invoked when building real-time data processing pipelines, event processing systems, or stream transformations.

## Core Principles
- **Stream Processing**: Process data in real-time as it arrives
- **Topology**: Define source, processor, and sink operations
- **State Management**: Handle stateful operations with state stores
- **Windowing**: Process data in time windows for aggregations

## Preparation Checklist
- [ ] Set up Kafka cluster
- [ ] Define input and output topics
- [ ] Plan processing topology
- [ ] Choose state management approach

## Step-by-Step Process
1. **Setup**: Configure Kafka cluster and topics
2. **Create**: Build Kafka Streams application
3. **Define**: Create processing topology
4. **Transform**: Implement maps, filters, joins
5. **Aggregate**: Use windowing for time-based aggregations
6. **Deploy**: Run as distributed application

## Do's and Don'ts
- ✅ **Do** use exactly-once processing
- ✅ **Do** handle state store backup
- ✅ **Do** plan for rebalancing
- ❌ **Don't** ignore processing semantics
- ❌ **Don't** skip error handling
- ❌ **Don't** forget to close resources

## Anti-Patterns
- **No State**: Always using stateless processing
- **Large Windows**: Using excessively large windows
- **No Error Handling**: Ignoring failed records
- **Resource Leaks**: Not closing Kafka producers/consumers
