{
  "title": "rate-limiting",
  "description": "Implement API rate limiting to control request frequency and prevent abuse.",
  "trigger": "When protecting APIs from abuse or ensuring fair usage",
  "input": "Rate limit configuration, API endpoint definitions",
  "steps": [
    "Choose rate limiting algorithm (token bucket, sliding window, etc.)",
    "Define rate limit parameters (requests per time window)",
    "Implement middleware for rate checking",
    "Add rate limit headers to responses",
    "Handle throttling gracefully"
  ],
  "output": "API with rate limiting implemented",
  "use_cases": [
    "Preventing API abuse",
    "Fair usage enforcement",
    "Protecting backend services"
  ],
  "limitations": "Requires careful tuning; may impact legitimate users"
}
