---
name: openapi-swagger
description: Use when documenting REST APIs with OpenAPI 3.x spec, generating Swagger UI, creating typed API clients, or setting up API docs in Node.js/Hono/Fastify/Express projects.
---

# OpenAPI / Swagger

## OpenAPI 3.x Spec Structure

```yaml
# openapi.yaml
openapi: 3.1.0
info:
  title: My API
  version: 1.0.0
  description: API description

servers:
  - url: https://api.example.com/v1
  - url: http://localhost:3000

paths:
  /users:
    get:
      summary: List users
      operationId: listUsers
      tags: [Users]
      parameters:
        - name: page
          in: query
          schema: { type: integer, default: 1 }
        - name: limit
          in: query
          schema: { type: integer, default: 20, maximum: 100 }
      responses:
        '200':
          description: Paginated user list
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
    post:
      summary: Create user
      operationId: createUser
      tags: [Users]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: Created user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '422':
          $ref: '#/components/responses/ValidationError'

  /users/{id}:
    get:
      summary: Get user
      operationId: getUser
      tags: [Users]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          $ref: '#/components/responses/NotFound'

components:
  schemas:
    User:
      type: object
      required: [id, name, email, createdAt]
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: Alice
        email:
          type: string
          format: email
          example: alice@example.com
        createdAt:
          type: string
          format: date-time

    CreateUser:
      type: object
      required: [name, email]
      properties:
        name:
          type: string
          minLength: 1
        email:
          type: string
          format: email

    UserList:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/User'
        total:
          type: integer
        page:
          type: integer

  parameters:
    IdParam:
      name: id
      in: path
      required: true
      schema:
        type: integer

  responses:
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ValidationError:
      description: Validation failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    Error:
      type: object
      properties:
        error:
          type: string
        details:
          type: array
          items:
            type: object

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

## Hono + Zod OpenAPI

```bash
bun add @hono/zod-openapi @hono/swagger-ui
```

```ts
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const UserSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'Alice' }),
  email: z.string().email(),
})

const route = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  request: {
    params: z.object({ id: z.coerce.number() }),
  },
  responses: {
    200: { content: { 'application/json': { schema: UserSchema } }, description: 'User found' },
    404: { description: 'Not found' },
  },
})

app.openapi(route, async (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: 'Alice', email: 'alice@example.com' })
})

// Serve spec
app.doc('/openapi.json', { openapi: '3.1.0', info: { title: 'My API', version: '1.0.0' } })

// Serve Swagger UI
import { swaggerUI } from '@hono/swagger-ui'
app.get('/docs', swaggerUI({ url: '/openapi.json' }))
```

## Fastify + Swagger

```bash
bun add @fastify/swagger @fastify/swagger-ui
```

```ts
import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

const app = fastify()

await app.register(swagger, {
  openapi: {
    info: { title: 'My API', version: '1.0.0' },
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
    },
  },
})

await app.register(swaggerUI, { routePrefix: '/docs' })

app.get('/users/:id', {
  schema: {
    params: { type: 'object', properties: { id: { type: 'integer' } } },
    response: {
      200: {
        type: 'object',
        properties: { id: { type: 'integer' }, name: { type: 'string' } },
      },
    },
  },
}, async (req) => {
  return { id: Number(req.params.id), name: 'Alice' }
})
```

## Generate Typed Client from Spec

```bash
# openapi-ts
bun add -D @hey-api/openapi-ts

bunx @hey-api/openapi-ts \
  --input openapi.yaml \
  --output src/client \
  --client @hey-api/client-fetch
```

```ts
// Generated client usage
import { client, getUser, createUser } from './client'

client.setConfig({ baseUrl: 'https://api.example.com' })

const { data, error } = await getUser({ path: { id: 1 } })
const { data: newUser } = await createUser({ body: { name: 'Bob', email: 'bob@example.com' } })
```
