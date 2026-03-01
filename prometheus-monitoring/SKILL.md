---
name: prometheus-monitoring
description: "Implement Prometheus metrics and monitoring for applications."
---

# Prometheus Monitoring

## Overview
Prometheus provides metrics collection and alerting for comprehensive application monitoring. This skill should be invoked when collecting application metrics, monitoring performance, or setting up observability.

## Core Principles
- **Metric Types**: Counters, Gauges, Histograms, Summaries
- **Pull Model**: Prometheus scrapes /metrics endpoints
- **Labels**: Use labels for dimensional data
- **Alerts**: Define alert rules for anomalies

## Preparation Checklist
- [ ] Set up Prometheus server
- [ ] Choose client library for your language
- [ ] Plan metrics and labels
- [ ] Design alerting rules

## Step-by-Step Process
1. **Add Library**: Install Prometheus client
2. **Define Metrics**: Create counters, gauges, histograms
3. **Expose**: Implement /metrics endpoint
4. **Configure**: Set up Prometheus scrape config
5. **Visualize**: Create Grafana dashboards
6. **Alert**: Define alerting rules

## Do's and Don'ts
- ✅ **Do** use appropriate metric types
- ✅ **Do** add meaningful labels
- ✅ **Do** set appropriate histogram buckets
- ❌ **Don't** use high-cardinality labels
- ❌ **Don't** expose sensitive data
- ❌ **Don't** forget to instrument code

## Anti-Patterns
- **Cardinality Explosion**: Too many label values
- **Missing Metrics**: Not instrumenting critical paths
- **No Alerts**: Setting up Prometheus without alerting
- **Sensitive Exposure**: Exposing internal metrics
