---
name: go-api
description: "Build scalable REST APIs with Go. Perfect for high-performance backends."
---

# Go API Development

## Overview
Go is excellent for building high-performance APIs. Its concurrency model, fast compilation, and simple deployment make it ideal for microservices and REST APIs.

## Process

### 1. Project Setup
```bash
mkdir myapi && cd myapi
go mod init github.com/username/myapi
# Choose router: chi, gin, fiber, or stdlib
go get github.com/go-chi/chi/v5
```

### 2. Structure
```
├── cmd/
│   └── api/main.go
├── internal/
│   ├── handlers/
│   ├── models/
│   └── repository/
├── go.mod
└── go.sum
```

### 3. Handlers
```go
func GetUsers(w http.ResponseWriter, r *http.Request) {
    users, err := repository.GetAll()
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    json.NewEncoder(w).Encode(users)
}
```

### 4. Middleware
- Logging (zerolog, zap)
- Authentication (JWT, OAuth)
- Rate limiting
- CORS

### 5. Database
- Use GORM, sqlx, or raw SQL
- Implement repository pattern
- Connection pooling built-in

## Examples

- **REST API**: CRUD with chi router
- **Microservice**: gRPC + HTTP gateway
- **Auth Service**: JWT + Redis sessions

## Limitations

- Learning curve for goroutines/channels
- Error handling verbose without helpers
- Dependency management requires discipline
- Not as expressive as Python/Ruby for quick prototyping
