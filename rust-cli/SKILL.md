---
name: rust-cli
description: "Build command-line applications in Rust with proper CLI patterns and argument parsing."
---

# Rust CLI Development

## Overview
Rust provides excellent tools for building high-performance command-line applications. This skill should be invoked when creating CLI tools that require performance, safety, or native binaries.

## Core Principles
- **Clap**: Use clap for argument parsing
- **Error Handling**: Use Result and the ? operator
- **Structopt**: Derive CLI from structs
- **Binary Focus**: Focus on single-purpose tools

## Preparation Checklist
- [ ] Initialize: `cargo new --bin <name>`
- [ ] Add clap: `cargo add clap`
- [ ] Plan CLI structure
- [ ] Design error handling

## Step-by-Step Process
1. **Initialize**: Create Rust binary project
2. **Setup**: Add clap for argument parsing
3. **Define**: Use structopt for CLI structure
4. **Implement**: Write command handlers
5. **Handle Errors**: Implement proper error handling
6. **Build**: Compile and test

## Do's and Don'ts
- ✅ **Do** use clap derive macros
- ✅ **Do** implement proper error messages
- ✅ **Do** use Result for error handling
- ❌ **Don't** skip error handling
- ❌ **Don't** use panics for errors
- ❌ **Don't** make monolithic commands

## Anti-Patterns
- **Manual Parsing**: Not using clap
- **Panic Instead of Errors**: Using unwrap/panic
- **No Help**: Missing --help documentation
- **Monolithic Commands**: Not separating subcommands
