# TypeScript - Getting Started

## What is TypeScript?

**TypeScript** is JavaScript with **types**. It's a programming language built on top of JavaScript that helps you catch errors early by specifying what type of data your variables should hold (numbers, text, etc.).

Think of it as JavaScript with a safety net - it helps you write more reliable code!

## Why Learn TypeScript?

TypeScript makes your code safer and easier to work with:

- **Type Safety**: Catches errors before running your code (e.g., trying to use a number as text)
- **Better Code Suggestions**: Your code editor gives you smarter suggestions as you type
- **Easier to Read**: Types act as documentation for what your code expects
- **Works with JavaScript**: All JavaScript code is valid TypeScript - you can learn gradually

## Key Differences from JavaScript

| Feature            | JavaScript                 | TypeScript               |
| ------------------ | -------------------------- | ------------------------ |
| **Types**          | Not checked                | Checked before running   |
| **Errors**         | Found at runtime           | Found during development |
| **Learning Curve** | Easier to start            | Slightly more to learn   |
| **Compatibility**  | Runs in browsers & Node.js | Compiles to JavaScript   |

## Real Example

```javascript
// JavaScript - No type checking
function add(a, b) {
  return a + b;
}
add("5", 3); // Returns "53" (unexpected!)

// TypeScript - Catches the error
function add(a: number, b: number): number {
  return a + b;
}
add("5", 3); // Error: "5" is not a number!
```

## What You'll Learn Next

- How to set up TypeScript
- How to use types in your code
- How to write functions with TypeScript
- Advanced features like interfaces and generics

Learn more from the following links:

- [@official@Overview of TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [@official@TypeScript Official Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [@article@What Is TypeScript?](https://thenewstack.io/what-is-typescript/)
- [@video@Video: Where TypeScript Excels](https://youtu.be/BUo7B6UuoJ4)
- [@feed@Explore top posts about TypeScript](https://app.daily.dev/tags/typescript?ref=roadmapsh)
