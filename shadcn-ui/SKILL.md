---
name: shadcn-ui
description: Use when building UIs with shadcn/ui components in React/Next.js projects. Covers setup, component usage, theming, customization, and composition patterns with Tailwind CSS.
---

# shadcn/ui

## Setup

```bash
# New project
bunx create-next-app@latest my-app --typescript --tailwind --app

# Add shadcn/ui
bunx shadcn@latest init

# Add components
bunx shadcn@latest add button
bunx shadcn@latest add input card dialog form table
bunx shadcn@latest add dropdown-menu sheet sonner
```

Components are copied into `components/ui/` — you own the code.

## Core Components

### Button
```tsx
import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button> // add your own loading prop
```

### Form (with react-hook-form + zod)
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
```

### Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
    </DialogHeader>
    <p>Are you sure?</p>
  </DialogContent>
</Dialog>
```

### Toast (Sonner)
```bash
bunx shadcn@latest add sonner
```

```tsx
// layout.tsx
import { Toaster } from '@/components/ui/sonner'
<Toaster />

// anywhere
import { toast } from 'sonner'
toast.success('Saved!')
toast.error('Something went wrong')
toast.promise(saveData(), { loading: 'Saving...', success: 'Saved!', error: 'Error' })
```

### Table
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell className="text-right">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Theming

```css
/* globals.css — customize CSS variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --destructive: 0 84.2% 60.2%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

## Dark Mode

```tsx
// Install: bun add next-themes
// providers.tsx
import { ThemeProvider } from 'next-themes'
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>

// Toggle
import { useTheme } from 'next-themes'
const { theme, setTheme } = useTheme()
<Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle</Button>
```

## Composition Pattern

```tsx
// Compose primitives into domain components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <Badge variant={user.active ? 'default' : 'secondary'}>
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardContent>
    </Card>
  )
}
```

## cn() Utility

```ts
// Always use cn() for conditional classes
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class', className)} />
```
