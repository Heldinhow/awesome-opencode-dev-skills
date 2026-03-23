---
name: mongodb-mongoose
description: Use when working with MongoDB and Mongoose ODM in Node.js or TypeScript projects. Covers schema design, models, queries, aggregation pipelines, indexes, and connection management.
---

# MongoDB + Mongoose

## Setup

```bash
bun add mongoose
bun add -D @types/mongoose  # if needed
```

## Connection

```ts
// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

// Next.js / serverless: cache connection across hot reloads
let cached = (global as any).mongoose ?? { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  })

  cached.conn = await cached.promise
  return cached.conn
}
```

## Schema & Model

```ts
// models/User.ts
import mongoose, { Schema, model, models, InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 0, max: 150 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  tags: [String],
  address: {
    street: String,
    city: String,
    country: { type: String, default: 'BR' },
  },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true, // auto-adds createdAt, updatedAt
})

// Indexes
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ name: 'text' }) // text search

// Virtual
userSchema.virtual('displayName').get(function () {
  return `${this.name} <${this.email}>`
})

// Type inference
export type User = InferSchemaType<typeof userSchema>

// Avoid re-compiling model in Next.js hot reload
export const UserModel = models.User ?? model('User', userSchema)
```

## CRUD

```ts
import { UserModel } from './models/User'

// Create
const user = await UserModel.create({ name: 'Alice', email: 'alice@example.com' })

// Find
const allUsers = await UserModel.find()
const user = await UserModel.findById(id)
const user = await UserModel.findOne({ email: 'alice@example.com' })

// Query operators
const users = await UserModel.find({
  age: { $gte: 18, $lte: 65 },
  role: { $in: ['user', 'admin'] },
  name: { $regex: /alice/i },
})

// Select fields
const users = await UserModel.find().select('name email -_id')

// Sort, limit, skip
const users = await UserModel.find().sort({ createdAt: -1 }).limit(10).skip(20)

// Update
await UserModel.findByIdAndUpdate(id, { $set: { name: 'Alice Updated' } }, { new: true })
await UserModel.updateMany({ role: 'user' }, { $set: { verified: true } })

// Delete
await UserModel.findByIdAndDelete(id)
await UserModel.deleteMany({ role: 'banned' })

// Count
const total = await UserModel.countDocuments({ role: 'user' })
```

## Population (Relations)

```ts
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
})

// Populate author
const posts = await PostModel.find().populate('author', 'name email')
```

## Aggregation Pipeline

```ts
const result = await UserModel.aggregate([
  { $match: { role: 'user' } },
  { $group: { _id: '$country', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 },
])
```

## Transactions

```ts
const session = await mongoose.startSession()
try {
  session.startTransaction()
  await UserModel.create([{ name: 'Bob', email: 'bob@test.com' }], { session })
  await OrderModel.create([{ userId: 'xxx' }], { session })
  await session.commitTransaction()
} catch (err) {
  await session.abortTransaction()
  throw err
} finally {
  session.endSession()
}
```

## Schema Design Principles
- Embed documents when data is accessed together and has 1:few or 1:1 relationships
- Reference (ObjectId) when data is large, shared across documents, or 1:many/many:many
- Avoid deeply nested arrays that grow unboundedly
- Add indexes for all frequently queried fields
- Use `timestamps: true` on every schema
