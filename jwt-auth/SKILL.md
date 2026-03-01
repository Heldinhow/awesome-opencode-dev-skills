{
  "title": "jwt-auth",
  "description": "Implement JWT (JSON Web Token) authentication for secure API access.",
  "trigger": "When you need stateless authentication for APIs",
  "input": "User credentials, secret key, token expiration requirements",
  "steps": [
    "Generate JWT with payload (user ID, claims)",
    "Sign token with secret or private key",
    "Implement token validation middleware",
    "Handle token refresh and expiration",
    "Store tokens securely (httpOnly cookies)"
  ],
  "output": "JWT authentication system for APIs",
  "use_cases": [
    "API authentication",
    "Single sign-on (SSO)",
    "Stateless session management"
  ],
  "limitations": "Token storage and revocation challenges; requires secure key management"
}
