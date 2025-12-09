# Generic Types

Use generic types to build flexible functions, classes, and interfaces that work with any data type.

## What Are Generic Types?

Generic types let you create code that works with different types without rewriting it. Instead of hardcoding a type, you use a placeholder (`<T>`) that TypeScript fills in based on how you use the code.

## With Functions

```typescript
// This function works with any type
function identity<T>(arg: T): T {
  return arg;
}

// TypeScript knows the output is a string
let textMessage = identity<string>('Hello');

// TypeScript knows the output is a number
let value = identity<number>(42);
```

## With Classes

```typescript
// A simple storage box that can hold any type
class Box<T> {
  private item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }
}

// Box for strings
const stringBox = new Box<string>('Secret message');
const message = stringBox.getItem(); // Type: string

// Box for numbers
const numberBox = new Box<number>(100);
const score = numberBox.getItem(); // Type: number
```

## With Interfaces

```typescript
// Define a generic interface for API responses
interface ApiResponse<T> {
  status: number;
  data: T;
}

// Use it with different data types
const userResponse: ApiResponse<string> = {
  status: 200,
  data: 'John Doe'
};

const scoresResponse: ApiResponse<number[]> = {
  status: 200,
  data: [95, 87, 92]
};
```

## Multiple Type Parameters

```typescript
// Use more than one generic type
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const myPair = pair<string, number>('age', 25);
// myPair is [string, number]
```

## Why This Matters

- **Reusable code**: Write once, use with any type
- **Type safety**: TypeScript still checks types — no mistakes slip through
- **Cleaner code**: No need to write duplicate functions for each type

Learn more from the following resources:

- [@official@Hello World of Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics)
