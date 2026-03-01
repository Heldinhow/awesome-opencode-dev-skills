{
  "title": "prometheus-monitoring",
  "description": "Implement Prometheus metrics and monitoring for applications.",
  "trigger": "When you need to collect and expose application metrics",
  "input": "Metric definitions, endpoint configuration, scrape targets",
  "steps": [
    "Add Prometheus client library",
    "Define metrics (counters, gauges, histograms)",
    "Expose /metrics endpoint",
    "Configure Prometheus to scrape metrics",
    "Create alerts and dashboards"
  ],
  "output": "Application with exposed Prometheus metrics",
  "use_cases": [
    "Application performance monitoring",
    "Infrastructure metrics",
    "Custom business metrics"
  ],
  "limitations": "Requires Prometheus infrastructure; additional overhead"
}
