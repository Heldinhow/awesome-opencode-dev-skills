---
name: jwt-auth
description: "Implement JWT (JSON Web Token) authentication for secure API access."
---

# jwt-auth

## Overview
When you need stateless authentication for APIs

## Process
1. Generate JWT with payload (user ID, claims)
2. Sign token with secret or private key
3. Implement token validation middleware
4. Handle token refresh and expiration
5. Store tokens securely (httpOnly cookies)

## Examples
- API authentication
- Single sign-on (SSO)
- Stateless session management

## Limitations
Token storage and revocation challenges; requires secure key management
