---
name: web-artifacts-builder
description: Build complex HTML artifacts using React, Tailwind CSS, and shadcn/ui components
metadata:
  clawdbot:
    emoji: "🎨"
    requires:
      tools: [exec]
      os: [linux, darwin, win32]
---

# Web Artifacts Builder

Build production-quality HTML artifacts using React, Tailwind CSS, and shadcn/ui components.

## When to Use

- Building interactive web UIs as standalone artifacts
- Creating dashboards, forms, data visualizations
- Rapid prototyping with modern stack
- Single-page interactive experiences

## Stack

- React 18+
- Tailwind CSS
- shadcn/ui components
- Radix UI primitives

## Structure

```tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Card>
      <h1>Counter: {count}</h1>
      <Button onClick={() => setCount(c => c + 1)}>
        Increment
      </Button>
    </Card>
  )
}
```

## Best Practices

1. Use shadcn/ui components for consistency
2. Implement proper accessibility (ARIA)
3. Responsive design with Tailwind
4. TypeScript for type safety
5. Export as self-contained HTML
