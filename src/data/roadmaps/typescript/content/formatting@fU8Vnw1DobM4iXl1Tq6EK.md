# Formatting

Format your code automatically so you don't have to think about spacing, quotes, or indentation.

## What is Code Formatting?

Code formatting is about making your code look consistent—things like indentation, spacing, and quote style. A formatter automatically fixes these so you can focus on writing logic, not debating style.

## Why Use a Formatter?

- **No more style debates** - The tool decides the style, everyone follows it
- **Save time** - You don't manually fix spacing or indentation
- **Consistent code** - All code in your project looks the same
- **Better focus** - Stop worrying about how code looks, focus on what it does

## Popular Formatters

### Prettier

An easy-to-use formatter that works with JavaScript, TypeScript, HTML, CSS, and more.

**Pros:**
- Very simple to set up and use
- Works with many file types
- Extremely popular (used by thousands of projects)

**When to use:** When you want a quick, minimal-config formatter for most projects.

**Resources:**
- [@article@Prettier Website](https://prettier.io)
- [@article@Why Prettier](https://prettier.io/docs/en/why-prettier.html)

### Biome

A newer, faster alternative to Prettier that combines formatting AND linting in one tool.

**Pros:**
- Much faster than Prettier (written in Rust)
- Does both formatting and linting at once
- Smaller setup

**When to use:** When you want better performance and don't want to manage separate formatter and linter tools.

**Resources:**
- [@article@BiomeJS Website](https://biomejs.dev)

## Quick Comparison

| Feature | Prettier | Biome |
|---------|----------|-------|
| Speed | Standard | Very fast |
| Formatting | ✓ | ✓ |
| Linting | ✗ | ✓ |
| Setup | Simple | Simple |
| Community | Very large | Growing |

## How to Choose

- **Just starting out?** Use Prettier—it's the most popular choice
- **Want speed and less tools?** Try Biome
- **Need deep customization?** Prettier has more options
