# TS/JS Interoperability

## What Does Interoperability Mean?

TypeScript and JavaScript work seamlessly together—you can use TypeScript code in JavaScript projects and vice versa. This compatibility exists because **TypeScript is a superset of JavaScript**, meaning every valid JavaScript program is also valid TypeScript. Think of it like TypeScript being JavaScript with extra features (like type checking) added on top.

## Why This Matters

This interoperability is incredibly valuable because:

- You can gradually introduce TypeScript into existing JavaScript projects without rewriting everything
- You can leverage the vast ecosystem of JavaScript libraries in your TypeScript projects
- Your team members can work with either language and still collaborate smoothly
- You're not locked into one language choice—you have flexibility

## Using JavaScript Libraries in TypeScript

### Scenario 1: Using JavaScript Libraries Directly

When you want to use an existing JavaScript library in a TypeScript project, you have two options:

1. **Include the JavaScript files directly** - Simply import and use the library as-is
2. **Use type definitions** - Install type information files (often from `@types/` packages) that tell TypeScript what the library does. This gives you helpful autocompletion and error checking.

### Scenario 2: Adding Type Safety to JavaScript

Even in plain JavaScript files, you can get TypeScript's type-checking benefits by adding a special comment at the top: `// @ts-check`

This tells TypeScript to validate your JavaScript code by reading JSDoc comments (comments that describe what your code does):

```typescript
// @ts-check

/**
 * Adds two numbers together.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
  return a + b;
}
```

TypeScript will now check that `add()` is always called with two numbers and always returns a number—catching mistakes before they become bugs!

## Using TypeScript Code in JavaScript

When you write TypeScript, it's automatically compiled (converted) into regular JavaScript. This compiled JavaScript runs in any JavaScript environment exactly like any other JavaScript code. Your TypeScript enhancements (like type checking) disappear in the final output—they only help during development.

## Real-World Scenario

Imagine you're maintaining a JavaScript project and want to add TypeScript gradually:

- Day 1: Add `@ts-check` to one file and write JSDoc comments
- Day 2: TypeScript catches a bug in your code
- Day 3: You're confident enough to write a new feature in pure TypeScript
- Day 4: Old and new code work together perfectly

Learn more from the following links:

- [@official@Type Checking JavaScript Files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
- [@video@Using JavaScript in TypeScript](https://youtu.be/AZhZlEbBaB4)
