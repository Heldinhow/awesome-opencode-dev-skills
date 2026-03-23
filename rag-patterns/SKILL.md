---
name: rag-patterns
description: Use when building Retrieval-Augmented Generation (RAG) systems, chatbots with document context, semantic search, or AI apps that query a knowledge base before generating responses.
---

# RAG Patterns (Retrieval-Augmented Generation)

## Core Architecture

```
User Query
    ↓
[Embed query] → vector
    ↓
[Vector DB search] → top-k relevant chunks
    ↓
[Build prompt: system + context chunks + user query]
    ↓
[LLM generate] → answer grounded in retrieved docs
```

## Step 1: Document Ingestion Pipeline

```ts
import { openai } from '@ai-sdk/openai'
import { embedMany } from 'ai'

async function ingestDocument(text: string, metadata: Record<string, any>) {
  // 1. Chunk the document
  const chunks = chunkText(text, { size: 512, overlap: 64 })

  // 2. Embed each chunk
  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: chunks,
  })

  // 3. Store in vector DB
  await vectorDB.upsert(
    chunks.map((chunk, i) => ({
      id: `${metadata.docId}-${i}`,
      values: embeddings[i],
      metadata: { ...metadata, text: chunk },
    }))
  )
}
```

## Step 2: Text Chunking Strategies

```ts
function chunkText(text: string, options: { size: number; overlap: number }) {
  const { size, overlap } = options
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = start + size
    chunks.push(text.slice(start, end))
    start += size - overlap
  }

  return chunks
}

// Strategy selection:
// - Fixed-size chunks (512 tokens) → general purpose
// - Sentence/paragraph splitting → better coherence
// - Recursive text splitting → handles code, markdown
// - Semantic chunking → split at topic boundaries (advanced)
```

## Step 3: Query + Retrieval

```ts
import { embed } from 'ai'

async function retrieve(query: string, topK = 5) {
  // Embed the query
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  })

  // Search vector DB
  const results = await vectorDB.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  })

  return results.matches
    .filter(m => m.score > 0.75) // relevance threshold
    .map(m => m.metadata.text as string)
}
```

## Step 4: Augmented Generation

```ts
import { generateText } from 'ai'

async function ragQuery(userQuestion: string) {
  const contextChunks = await retrieve(userQuestion)

  const context = contextChunks.join('\n\n---\n\n')

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: `You are a helpful assistant. Answer questions based ONLY on the provided context.
If the context doesn't contain enough information, say so — do not make up answers.

Context:
${context}`,
    prompt: userQuestion,
  })

  return text
}
```

## Advanced Patterns

### Hybrid Search (vector + keyword)
```ts
// Combine semantic + BM25/full-text for better recall
const [semanticResults, keywordResults] = await Promise.all([
  vectorDB.query({ vector: embedding, topK: 10 }),
  db.fullTextSearch(query, { limit: 10 }),
])
// Re-rank combined results with RRF or cross-encoder
```

### Query Rewriting
```ts
// Improve retrieval by rewriting ambiguous queries
const rewrittenQuery = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `Rewrite this question to be more specific for document search: "${userQuestion}"`,
})
```

### Multi-Query Retrieval
```ts
// Generate multiple query variants and merge results
const queries = await generateQueries(userQuestion) // 3-5 variants
const allResults = await Promise.all(queries.map(retrieve))
const deduped = deduplicateByContent(allResults.flat())
```

### Contextual Compression
```ts
// After retrieval, compress chunks to only relevant sentences
const compressed = await compressContext(chunks, userQuestion)
```

## Evaluation Metrics
- **Faithfulness**: Does the answer stay grounded in context?
- **Answer relevance**: Does the answer address the question?
- **Context recall**: Did retrieval find the right chunks?
- **Context precision**: Are retrieved chunks relevant (no noise)?

## Common Pitfalls
- Chunks too large → dilute relevance signal
- Chunks too small → lose context needed for coherent answers
- No overlap between chunks → truncated sentences at boundaries
- No relevance threshold → low-quality context degrades answers
- Embedding mismatch → use same model for ingestion and query
