# Linting

Catch bugs and code quality issues automatically while you write code.

## What is Linting?

A linter is a tool that reads your code and points out problems before you run it. Think of it like a spell-checker for code—it finds mistakes automatically.

## Why Use a Linter?

- **Find bugs early** - Catch mistakes before they cause problems in production
- **Enforce coding rules** - Make sure your team writes code the same way
- **Better quality** - Avoid common programming mistakes automatically
- **Save time** - You don't have to manually review code for these issues

## ESLint: The Standard Tool

ESLint is by far the most popular linter for JavaScript and TypeScript. You give it rules (standards for your code), and it checks every file against those rules.

## How It Works

1. **You define rules** - What coding standards matter to you? (No unused variables? No console.log in production? etc.)
2. **Run ESLint** - Point it at your code
3. **Get a report** - It lists every place where code breaks your rules
4. **Fix issues** - Many issues can be fixed automatically with `--fix` flag

## Example Rules

Here are common rules teams use:

- Don't leave unused variables in your code
- Always use `===` instead of `==`
- Don't use `var`, use `const` or `let`
- Warn if you use `console.log` (should only be in development)

## Getting Started

```bash
# Install ESLint
npm install --save-dev eslint

# Set up your first rules
npx eslint --init

# Check your code
npx eslint src/

# Auto-fix issues (when possible)
npx eslint src/ --fix
```

## Tips

- **Start small** - Don't enable too many rules at once
- **Work with your team** - Agree on rules together
- **Use presets** - Many projects share rule sets (like `eslint-config-airbnb`)
- **Combine with formatter** - Use ESLint for code quality + Prettier for code style

## Learn More

- [@article@ESLint Official Website](https://eslint.org/)
- [@article@Introduction to ESLint](https://dev.to/shivambmgupta/eslint-what-why-when-how-5f1d)
- [@video@ESLint Quickstart - find errors automatically](https://www.youtube.com/watch?v=qhuFviJn-es)
