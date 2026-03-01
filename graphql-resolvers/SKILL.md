{
  "title": "graphql-resolvers",
  "description": "Implement GraphQL resolver functions for data fetching and mutation handling.",
  "trigger": "When building GraphQL APIs requiring data resolution",
  "input": "GraphQL schema, data sources, resolver functions",
  "steps": [
    "Define GraphQL types and fields",
    "Implement resolver functions for each field",
    "Handle async data fetching with DataLoader",
    "Implement mutations with input types",
    "Handle errors and edge cases"
  ],
  "output": "GraphQL resolvers connected to data sources",
  "use_cases": [
    "Building GraphQL API backends",
    "Connecting to multiple data sources",
    "Handling complex data relationships"
  ],
  "limitations": "N+1 query problems without DataLoader; requires GraphQL understanding"
}
