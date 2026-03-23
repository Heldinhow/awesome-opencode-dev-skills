---
name: storybook
description: Use when setting up or writing Storybook stories for React components, building component documentation, or creating visual test scenarios with controls, decorators, and play functions.
---

# Storybook

## Setup

```bash
# In an existing React/Next.js project
bunx storybook@latest init

# Starts on http://localhost:6006
bun run storybook
```

## Story Format (CSF3)

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',          // navigation path in sidebar
  tags: ['autodocs'],          // auto-generate docs page
  args: {                      // shared default args
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Click me' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
}

export const Loading: Story = {
  args: { isLoading: true, children: 'Saving...' },
}
```

## Play Functions (Interaction Tests)

```tsx
import { expect, fn, userEvent, within } from '@storybook/test'

export const FormSubmit: Story = {
  args: { onSubmit: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText('Email'), 'alice@example.com')
    await userEvent.type(canvas.getByLabelText('Password'), 'secret123')
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }))

    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'secret123',
    })
  },
}
```

## Decorators

```tsx
// Component-level decorator
const meta: Meta<typeof Card> = {
  component: Card,
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-100">
        <Story />
      </div>
    ),
  ],
}

// Global decorator (preview.tsx)
export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
]
```

## preview.tsx Setup

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'  // import global styles

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
}

export default preview
```

## main.ts Setup

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
}

export default config
```

## Story Organization Conventions

```
components/
  Button/
    Button.tsx
    Button.stories.tsx   ← colocate with component
    Button.test.tsx

stories/
  Introduction.mdx       ← overview pages
```

## MDX Documentation

```mdx
{/* Button.mdx */}
import { Meta, Story, Controls, Canvas } from '@storybook/blocks'
import * as ButtonStories from './Button.stories'

<Meta of={ButtonStories} />

# Button

Use the `Button` component for interactive actions.

<Canvas of={ButtonStories.Default} />
<Controls of={ButtonStories.Default} />
```

## Addons Worth Installing

```bash
bunx storybook@latest add @storybook/addon-a11y         # accessibility audit
bunx storybook@latest add @storybook/addon-interactions  # play function runner
bunx storybook@latest add @chromatic-com/storybook       # visual regression tests
```

## Test Runner

```bash
bun add -D @storybook/test-runner
# Runs all play functions as Jest tests
bunx test-storybook
```
