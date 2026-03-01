{
  "title": "redis-cache",
  "description": "Implement Redis caching strategies to improve application performance and reduce database load.",
  "trigger": "When you need to cache frequently accessed data or session data",
  "input": "Redis connection details, cache keys, TTL requirements",
  "steps": [
    "Connect to Redis server",
    "Define cache strategy (write-through, write-behind, look-aside)",
    "Implement cache operations (get, set, delete)",
    "Set appropriate TTL values",
    "Handle cache invalidation"
  ],
  "output": "Cached data accessible with improved read performance",
  "use_cases": [
    "Caching API responses",
    "Session storage",
    "Rate limiting counters"
  ],
  "limitations": "Not suitable for data requiring strong consistency or complex queries"
}
