# Functions

Functions are reusable blocks of code that perform a specific task. Instead of writing the same code multiple times, you write it once in a function and call it whenever you need it.

## Why Use Functions?

Functions help you:
- **Avoid repetition** - Write code once, use it many times
- **Organize code** - Keep related code together
- **Make code easier to test** - Test pieces separately
- **Make changes easier** - Update code in one place

## Two Ways to Write Functions

### Function Declaration (recommended for most cases)

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
```

### Function Expression (useful for callbacks)

```typescript
const add = function(a: number, b: number): number {
  return a + b;
};

console.log(add(5, 3)); // 8
```

## Arrow Functions (Modern Shorthand)

Arrow functions are a shorter way to write functions:

```typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Even shorter if returning a value directly
const square = (x: number): number => x * x;

console.log(square(5)); // 25
```

## Real-World Example

```typescript
// Problem: Calculate discount for different customer types

function calculatePrice(basePrice: number, customerType: string): number {
  if (customerType === "premium") {
    return basePrice * 0.8; // 20% off
  } else if (customerType === "member") {
    return basePrice * 0.9; // 10% off
  }
  return basePrice; // No discount
}

console.log(calculatePrice(100, "premium")); // 80
console.log(calculatePrice(100, "member")); // 90
console.log(calculatePrice(100, "guest")); // 100
```

## Common Mistakes to Avoid

- **Forgetting the return type** - Always specify what the function returns
- **Wrong parameter types** - Make sure parameter types match what you pass in
- **Not returning anything when needed** - If the function should return a value, use `return`

Learn more from the following links:

- [@official@Functions in TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html)
