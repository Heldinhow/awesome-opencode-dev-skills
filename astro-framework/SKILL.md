---
name: astro-framework
description: "Build fast websites with Astro framework. Perfect for content-focused sites, blogs, and landing pages."
---

# Astro Framework

## Overview
Astro is a web framework that ships zero JavaScript to the client by default. It uses a component-based architecture with support for multiple frontend frameworks (React, Vue, Svelte, etc.) in the same project.

## Process

### 1. Project Setup
```bash
npm create astro@latest
# Choose template (blog, docs, portfolio, etc.)
# Install dependencies
```

### 2. Create Pages
- Pages go in `src/pages/`
- File-based routing
- Support for dynamic routes with `[param]` syntax

### 3. Components
- Create reusable components in `src/components/`
- Use any supported framework (--- astro/react/vue/svelte ---)
- Share state with Nano Stores

### 4. Data & Content
- Use Content Collections for type-safe markdown/MDX
- Fetch data at build time with getStaticPaths
- Connect to databases, APIs, CMS

### 5. Deployment
- Deploy to Vercel, Netlify, Cloudflare Pages, or any adapter
- Build with `npm run build`
- SSR available when needed with `output: 'server'`

## Examples

- **Blog**: Content Collections + Markdown + RSS feed
- **Landing Page**: Static generation + partial hydration
- **Documentation**: Starlight theme integration
- **E-commerce**: SSR + database + payment integration

## Limitations

- Not ideal for highly interactive apps (use Next.js instead)
- Client-side state management limited without Nano Stores
- SSR adds complexity - only use when needed
- Some React libraries don't work well with island architecture
