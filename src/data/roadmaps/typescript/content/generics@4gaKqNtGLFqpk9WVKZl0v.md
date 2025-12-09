# Generics

Create reusable functions and classes that work with any data type using generics.

## Why Use Generics?

Imagine you write a function that works with strings. Later, you need it to work with numbers too. Without generics, you'd have to write the same function multiple times for each type. Generics let you write it once and use it with any type.

## How They Work

Think of generics like a template. The `<T>` is a placeholder that says "this will be some type, but I'm not sure which one yet." When you use the function, you tell it what type to use.

## Basic Example

```typescript
// This function works with ANY data type
function identity<T>(arg: T): T {
  return arg;
}

// Use it with a string
let textResult = identity<string>('Hello');
// textResult is a string

// Use it with a number
let numberResult = identity<number>(42);
// numberResult is a number
```

## Real-World Example

```typescript
// Without generics, you'd need separate functions:
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// With generics, one function handles all types:
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstFood = getFirst<string>(['apple', 'banana']);
const firstScore = getFirst<number>([100, 85, 90]);
```

## Key Points

- Generics use angle brackets: `<T>`, `<U>`, `<K>` (you can name them anything)
- `T` is just a convention — it stands for "Type"
- TypeScript can often figure out the type automatically, so `getFirst(['apple'])` works the same as `getFirst<string>(['apple'])`
- Generics work with functions, classes, and interfaces

## Common Mistakes

- Don't use generics for "everything" — only use them when a function needs to work with multiple types
- The generic type must be consistent — a `<string>` generic always returns a string

Learn more from the following resources:

- [@official@Hello World of Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics)
