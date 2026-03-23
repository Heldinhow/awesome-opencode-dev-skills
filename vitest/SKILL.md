---
name: vitest
description: Use when writing or running unit tests with Vitest in TypeScript/JavaScript projects. Covers test setup, assertions, mocking, coverage, and integration with React Testing Library.
---

# Vitest

## Setup

```bash
bun add -D vitest @vitest/coverage-v8

# With React
bun add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules', '**/*.config.*', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom'
```

```json
// package.json scripts
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest run --coverage"
}
```

## Basic Tests

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3)
  })
})

// Async
it('fetches user data', async () => {
  const user = await fetchUser(1)
  expect(user.name).toBe('Alice')
})

// Throws
it('throws on invalid input', () => {
  expect(() => parse('')).toThrow('Input cannot be empty')
  await expect(fetchUser(-1)).rejects.toThrow('Not found')
})
```

## Assertions Cheatsheet

```ts
expect(value).toBe(3)               // strict equality (===)
expect(value).toEqual({ a: 1 })     // deep equality
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()
expect(arr).toHaveLength(3)
expect(arr).toContain('item')
expect(str).toMatch(/pattern/)
expect(obj).toHaveProperty('key', 'value')
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith('arg')
expect(fn).toHaveBeenCalledTimes(2)
expect(num).toBeGreaterThan(5)
expect(num).toBeCloseTo(0.3, 5)     // floating point
```

## Mocking

```ts
import { vi } from 'vitest'

// Mock a function
const mockFn = vi.fn().mockReturnValue(42)
const mockFn = vi.fn().mockResolvedValue({ id: 1 }) // async
const mockFn = vi.fn().mockRejectedValue(new Error('fail'))

// Mock implementation
const mockFn = vi.fn().mockImplementation((x: number) => x * 2)

// Spy on object method
const spy = vi.spyOn(obj, 'method').mockReturnValue('mocked')

// Mock a module
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))

// Mock with factory
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/dashboard',
}))

// Reset between tests
beforeEach(() => { vi.clearAllMocks() })
afterAll(() => { vi.restoreAllMocks() })
```

## React Testing Library

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('LoginForm', () => {
  it('submits form with correct values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'alice@example.com')
    await user.type(screen.getByLabelText('Password'), 'secret123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'secret123',
    })
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })
})
```

## Querying Elements (Priority Order)

```ts
// Prefer in this order:
screen.getByRole('button', { name: /submit/i })   // best: accessible
screen.getByLabelText('Email')                     // form fields
screen.getByPlaceholderText('Enter email')
screen.getByText('Submit')
screen.getByTestId('submit-btn')                  // last resort

// Async (waits for element)
await screen.findByText('Loading complete')
await waitFor(() => expect(mockFn).toHaveBeenCalled())
```

## Snapshots

```ts
it('renders correctly', () => {
  const { container } = render(<MyComponent />)
  expect(container).toMatchSnapshot()
})

// Update: bunx vitest --update-snapshots
```
