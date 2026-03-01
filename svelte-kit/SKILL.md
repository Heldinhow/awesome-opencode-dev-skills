---
name: svelte-kit
description: "Build full-stack web applications using SvelteKit with server-side rendering."
---

# SvelteKit Development

## Overview
SvelteKit provides a full-stack framework for Svelte with built-in routing, SSR, and API endpoints. This skill should be invoked when building modern web applications that benefit from Svelte's compilation approach and server-side rendering.

## Core Principles
- **File-Based Routing**: Routes defined by file structure
- **SSR**: Server-side rendering with hydration
- **API Routes**: Server endpoints as +server.js files
- **Adapter Pattern**: Deploy to various platforms

## Preparation Checklist
- [ ] Initialize: `npm create svelte@latest`
- [ ] Choose TypeScript or JavaScript
- [ ] Plan routing structure
- [ ] Select deployment adapter

## Step-by-Step Process
1. **Initialize**: Create SvelteKit project
2. **Routes**: Create pages with +page.svelte
3. **Layouts**: Build layouts with +layout.svelte
4. **API**: Create server endpoints
5. **SSR**: Configure server-side rendering
6. **Deploy**: Set up adapter for deployment

## Do's and Don'ts
- ✅ **Do** use SSR for initial page load
- ✅ **Do** leverage form actions
- ✅ **Do** use +server.js for API routes
- ❌ **Don't** ignore SSR considerations
- ❌ **Don't** skip error handling
- ❌ **Don't** use client-side only when SSR works

## Anti-Patterns
- **No SSR**: Disabling SSR unnecessarily
- **Missing Error Pages**: Not handling errors
- **Client Only**: Ignoring server capabilities
- **No Loading States**: Not handling async data
