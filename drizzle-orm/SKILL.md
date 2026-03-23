---
name: drizzle-orm
description: Use when working with Drizzle ORM for TypeScript database access. Covers schema definition, migrations, queries, relations, and integration with PostgreSQL, MySQL, SQLite, and edge runtimes.
---

# Drizzle ORM

## Setup

```bash
bun add drizzle-orm
bun add -D drizzle-kit
# driver (pick one):
bun add @neondatabase/serverless  # Neon PostgreSQL
bun add postgres                   # node-postgres
bun add better-sqlite3             # SQLite
```

## Schema Definition

```ts
// db/schema.ts
import { pgTable, serial, varchar, integer, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  authorId: integer('author_id').notNull().references(() => users.id),
  published: boolean('published').default(false).notNull(),
})

// Relations (for query builder, not enforced by DB)
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}))
```

## Connection

```ts
// db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema })
```

## Queries

```ts
import { db } from './db'
import { users, posts } from './db/schema'
import { eq, and, like, desc, count } from 'drizzle-orm'

// Select all
const allUsers = await db.select().from(users)

// Where clause
const user = await db.select().from(users).where(eq(users.email, 'a@b.com'))

// Multiple conditions
const results = await db.select()
  .from(posts)
  .where(and(eq(posts.authorId, 1), eq(posts.published, true)))
  .orderBy(desc(posts.createdAt))
  .limit(10)
  .offset(20)

// Join
const postsWithAuthors = await db.select({
  postTitle: posts.title,
  authorName: users.name,
}).from(posts).leftJoin(users, eq(posts.authorId, users.id))

// With relations (requires schema relations defined)
const usersWithPosts = await db.query.users.findMany({
  with: { posts: true },
})

// Insert
const [newUser] = await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com',
}).returning()

// Insert many
await db.insert(users).values([
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'Carol', email: 'carol@example.com' },
])

// Update
await db.update(users)
  .set({ name: 'Alice Updated' })
  .where(eq(users.id, newUser.id))

// Delete
await db.delete(users).where(eq(users.id, 1))

// Count
const [{ total }] = await db.select({ total: count() }).from(users)
```

## Migrations

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
```

```bash
# Generate migration files
bunx drizzle-kit generate

# Apply migrations
bunx drizzle-kit migrate

# Push schema directly (dev only — no migration files)
bunx drizzle-kit push

# Open Drizzle Studio
bunx drizzle-kit studio
```

## Transactions

```ts
await db.transaction(async (tx) => {
  const [user] = await tx.insert(users).values({ name: 'Dave', email: 'dave@example.com' }).returning()
  await tx.insert(posts).values({ title: 'First Post', authorId: user.id })
})
```

## Edge / Serverless

```ts
// Neon serverless (Vercel Edge, Cloudflare Workers)
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
```

## Type Inference

```ts
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { users } from './db/schema'

type User = InferSelectModel<typeof users>
type NewUser = InferInsertModel<typeof users>
```
