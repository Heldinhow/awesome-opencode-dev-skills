---
name: vector-databases
description: Use when integrating vector databases for semantic search, embeddings storage, or RAG systems. Covers Pinecone, Qdrant, Chroma, pgvector, and Weaviate with TypeScript examples.
---

# Vector Databases

## Options Overview

| DB | Best for | Hosting |
|---|---|---|
| **Pinecone** | Production, fully managed, simple API | Cloud only |
| **Qdrant** | Self-hosted, rich filtering, open source | Self-hosted / Cloud |
| **Chroma** | Local dev, prototyping, embedded | Local / Self-hosted |
| **pgvector** | Already using PostgreSQL | Self-hosted (Postgres ext) |
| **Weaviate** | GraphQL API, multi-modal | Self-hosted / Cloud |

---

## Pinecone

```bash
bun add @pinecone-database/pinecone
```

```ts
import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })

// Create index (one-time setup)
await pc.createIndex({
  name: 'my-index',
  dimension: 1536, // match your embedding model
  metric: 'cosine',
  spec: { serverless: { cloud: 'aws', region: 'us-east-1' } },
})

const index = pc.index('my-index')

// Upsert vectors
await index.upsert([
  { id: 'doc-1', values: embeddingArray, metadata: { text: 'content', source: 'file.pdf' } },
  { id: 'doc-2', values: embeddingArray2, metadata: { text: 'more content' } },
])

// Query
const results = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true,
  filter: { source: { $eq: 'file.pdf' } }, // metadata filtering
})

// Delete
await index.deleteOne('doc-1')
await index.deleteMany({ filter: { source: { $eq: 'old-file.pdf' } } })
```

---

## Qdrant

```bash
# Run locally
docker run -p 6333:6333 qdrant/qdrant

bun add @qdrant/js-client-rest
```

```ts
import { QdrantClient } from '@qdrant/js-client-rest'

const client = new QdrantClient({ url: 'http://localhost:6333' })

// Create collection
await client.createCollection('my-collection', {
  vectors: { size: 1536, distance: 'Cosine' },
})

// Upsert points
await client.upsert('my-collection', {
  points: [
    { id: 1, vector: embeddingArray, payload: { text: 'content', category: 'tech' } },
  ],
})

// Search
const results = await client.search('my-collection', {
  vector: queryEmbedding,
  limit: 5,
  filter: {
    must: [{ key: 'category', match: { value: 'tech' } }],
  },
  with_payload: true,
})

results.forEach(r => console.log(r.score, r.payload?.text))
```

---

## Chroma (Local Dev)

```bash
pip install chromadb  # server
bun add chromadb      # client
```

```ts
import { ChromaClient } from 'chromadb'

const client = new ChromaClient()

// Get or create collection
const collection = await client.getOrCreateCollection({ name: 'docs' })

// Add documents (Chroma handles embedding if you configure an embedding function)
await collection.add({
  ids: ['id1', 'id2'],
  documents: ['First document text', 'Second document text'],
  metadatas: [{ source: 'file1.txt' }, { source: 'file2.txt' }],
})

// Or add pre-computed embeddings
await collection.add({
  ids: ['id3'],
  embeddings: [embeddingArray],
  documents: ['Third document'],
})

// Query
const results = await collection.query({
  queryEmbeddings: [queryEmbedding],
  nResults: 5,
})
```

---

## pgvector (PostgreSQL)

```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB
);

-- Create index for fast ANN search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
-- Or HNSW (better recall):
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Insert
INSERT INTO documents (content, embedding) VALUES ('text', '[0.1, 0.2, ...]'::vector);

-- Cosine similarity search
SELECT id, content, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS similarity
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

```ts
// With Drizzle ORM
import { vector } from 'drizzle-orm/pg-core'

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }),
})
```

---

## Embedding Models

| Model | Dimensions | Best for |
|---|---|---|
| `text-embedding-3-small` | 1536 | Cost-efficient, OpenAI |
| `text-embedding-3-large` | 3072 | Best quality, OpenAI |
| `nomic-embed-text` | 768 | Free, local via Ollama |
| `mxbai-embed-large` | 1024 | Strong open source, local |

## Distance Metrics
- **Cosine** → most common for text (measures angle, ignores magnitude)
- **Dot product** → fast, use when vectors are normalized
- **Euclidean** → for spatial/image embeddings
