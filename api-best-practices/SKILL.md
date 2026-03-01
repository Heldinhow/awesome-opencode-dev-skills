---
name: api-best-practices
description: "Apply modern standards and best practices for designing scalable, secure, and maintainable REST APIs."
---

# REST API Best Practices

## Overview
Designing a robust REST API is critical for frontend-backend communication and third-party integrations. This skill covers the structural rules, status codes, naming conventions, and security measures essential for building professional APIs. Invoke this skill when architecting a new backend service, refactoring existing endpoints, or reviewing API designs.

## Core Principles
- **Resource-Oriented**: URLs should represent nouns (resources), not verbs (actions).
- **Statelessness**: Each request must contain all the information the server needs to fulfill it. The server should not store request state between calls.
- **Predictability**: A consumer should be able to guess endpoint structures based on existing patterns.
- **Idempotency**: Operations like PUT and DELETE should produce the same result no matter how many times they are called.

## Preparation Checklist
- [ ] Identify the core domain entities that will be exposed as resources.
- [ ] Decide on the API versioning strategy (e.g., URL path `/v1/`, header, or query param).
- [ ] Establish the standardization for response formats (e.g., JSON API standard, wrapper objects).

## Step-by-Step Process
1. **Model Resources**: Define the nouns (e.g., `/users`, `/orders`, `/products`). Use plurals consistently.
2. **Map HTTP Methods**:
   - `GET`: Retrieve a resource or collection.
   - `POST`: Create a new resource.
   - `PUT`: Completely replace an existing resource.
   - `PATCH`: Partially update an existing resource.
   - `DELETE`: Remove a resource.
3. **Structure the URLs**: Use nested structures for relationships, but keep it shallow (max 2 levels deep). Example: `/users/123/orders` is good; `/users/123/orders/456/items/789` is bad.
4. **Define Standard Responses**: Standardize pagination (offset/limit or cursor), sorting, and filtering via query parameters.
5. **Implement Error Handling**: Define a consistent error payload structure (e.g., `{ "error": { "code": 404, "message": "Not found" } }`). Use correct HTTP status codes (2xx for success, 4xx for client errors, 5xx for server errors).
6. **Add Security**: Enforce HTTPS, implement authentication (e.g., JWT, OAuth), and add rate limiting to prevent abuse.

## Do's and Don'ts
- ✅ **Do** use HTTP status codes correctly. Don't return a 200 OK with an error message in the body.
- ✅ **Do** provide pagination for any endpoint that returns a list.
- ❌ **Don't** use verbs in URLs (e.g., use `POST /articles`, not `POST /createArticle`).
- ❌ **Don't** expose internal database IDs if security is a concern; use UUIDs.

## Anti-Patterns
- **The Everything Endpoint**: Creating a single endpoint that returns massive, complex payloads trying to satisfy every frontend requirement in one call.
- **Ignoring Caching**: Failing to use standard HTTP caching headers (ETag, Cache-Control), leading to unnecessary server load.
- **Version Breaking**: Changing the response structure of an existing endpoint without bumping the API version.
