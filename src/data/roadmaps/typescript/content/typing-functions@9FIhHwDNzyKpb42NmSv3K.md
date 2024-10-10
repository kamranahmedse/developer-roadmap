# Typing Functions

In TypeScript, functions can be typed in a few different ways to indicate the input parameters and return type of the function.

Function declaration with types:

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow function with types:

```typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};
```

Function type:

```typescript
let divide: (a: number, b: number) => number;

divide = (a, b) => {
  return a / b;
};
```

Learn more from the following links:

- [@official@TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
