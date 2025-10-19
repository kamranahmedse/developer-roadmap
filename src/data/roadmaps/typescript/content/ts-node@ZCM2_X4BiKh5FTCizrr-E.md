# ts-node

## What is ts-node?

**ts-node** allows you to run TypeScript code directly in Node.js without manually compiling it to JavaScript first. It's a tool that executes TypeScript files on-the-fly, making development faster and easier.

## Why Use ts-node?

- **No compilation step**: Write TypeScript and run it immediately - no need for `tsc` compilation
- **Interactive REPL**: Test TypeScript code in an interactive shell, just like Node.js REPL
- **Faster development**: Great for scripts, prototyping, and testing

## Basic Usage

```bash
# Install ts-node
npm install --save-dev ts-node

# Run a TypeScript file directly
npx ts-node script.ts

# Start an interactive TypeScript REPL
npx ts-node
```

## Key Features

- Automatically compiles TypeScript to JavaScript in memory
- Supports source maps for better debugging
- Works with ES modules (ESM) natively
- Perfect for backend development with Node.js

## When to Use ts-node

- Running scripts and utilities
- Development and prototyping
- Building CLI tools
- Testing TypeScript code quickly

Learn more from the following resources:

- [@opensource@ts-node - GitHub Project](https://github.com/TypeStrong/ts-node)
- [@article@How To Run TypeScript Scripts with ts-node](https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node)
- [@feed@Explore top posts about TypeScript](https://app.daily.dev/tags/typescript?ref=roadmapsh)
