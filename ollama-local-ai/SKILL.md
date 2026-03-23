---
name: ollama-local-ai
description: Use when running LLMs locally with Ollama, integrating local models into apps, or building AI features without sending data to external APIs. Covers model management, API usage, and integration with AI SDK.
---

# Ollama — Local AI

## Installation & Setup

```bash
# macOS
brew install ollama

# Start the server (runs on http://localhost:11434)
ollama serve

# Pull a model
ollama pull llama3.2          # 3B — fast, general purpose
ollama pull llama3.2:1b       # 1B — ultra-fast, low RAM
ollama pull mistral           # 7B — strong reasoning
ollama pull codellama         # code-specialized
ollama pull nomic-embed-text  # embeddings
ollama pull phi4-mini         # Microsoft, small and capable
```

## Model Management

```bash
ollama list                   # list installed models
ollama show llama3.2          # model info
ollama rm llama3.2            # remove model
ollama run llama3.2           # interactive chat in terminal
```

## REST API

```bash
# Chat completion
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "stream": false
}'

# Generate (single turn)
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?",
  "stream": false
}'

# Embeddings
curl http://localhost:11434/api/embed -d '{
  "model": "nomic-embed-text",
  "input": "Text to embed"
}'
```

## Integration with Vercel AI SDK

```ts
import { ollama } from 'ollama-ai-provider'
import { generateText, streamText } from 'ai'

// Text generation
const { text } = await generateText({
  model: ollama('llama3.2'),
  prompt: 'Explain quantum computing in one paragraph',
})

// Streaming
const stream = streamText({
  model: ollama('llama3.2'),
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Write a haiku about TypeScript.' },
  ],
})

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk)
}

// Embeddings
import { embed } from 'ai'

const { embedding } = await embed({
  model: ollama.embedding('nomic-embed-text'),
  value: 'Some text to embed',
})
```

```bash
bun add ollama-ai-provider ai
```

## Direct Ollama SDK

```ts
import { Ollama } from 'ollama'

const ollama = new Ollama({ host: 'http://localhost:11434' })

// Chat
const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Hello' }],
})
console.log(response.message.content)

// Streaming
const stream = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true,
})
for await (const chunk of stream) {
  process.stdout.write(chunk.message.content)
}

// Embeddings
const { embedding } = await ollama.embed({
  model: 'nomic-embed-text',
  input: 'text to embed',
})
```

## Modelfile (Custom Models)

```dockerfile
# Modelfile
FROM llama3.2

SYSTEM """
You are a senior TypeScript developer.
Always return typed, idiomatic TypeScript.
Prefer functional patterns and avoid classes.
"""

PARAMETER temperature 0.3
PARAMETER num_ctx 8192
```

```bash
ollama create my-ts-assistant -f Modelfile
ollama run my-ts-assistant
```

## Model Selection Guide

| Use case | Recommended model |
|---|---|
| General chat | `llama3.2` (3B) or `mistral` (7B) |
| Fast/low RAM | `llama3.2:1b` or `phi4-mini` |
| Code generation | `codellama` or `qwen2.5-coder` |
| Embeddings | `nomic-embed-text` or `mxbai-embed-large` |
| Long context | `mistral` with `num_ctx 32768` |
| Math/reasoning | `phi4` or `qwen2.5` |

## Privacy & Performance Notes
- All inference runs locally — no data leaves your machine
- GPU acceleration: Ollama auto-detects Metal (macOS), CUDA, ROCm
- RAM requirements: 4GB for 3B models, 8GB for 7B, 16GB+ for 13B+
- Set `OLLAMA_NUM_PARALLEL` env var to serve multiple requests
