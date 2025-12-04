# Type Inference

TypeScript can automatically figure out the type of a variable based on the value you assign to it — no need to write the type yourself.

## Why Does This Matter?

Type inference makes your code:
- **Cleaner**: Less typing, fewer annotations cluttering your code
- **Safer**: You still get type checking without extra work
- **Faster to write**: TypeScript does the work for you

## How It Works

When you assign a value to a variable, TypeScript looks at that value and decides what type it should be.

### Basic Example

```typescript
// TypeScript knows this is a string
let name = 'John Doe';

// TypeScript knows this is a number
let age = 25;

// TypeScript knows this is a boolean
let isActive = true;

// Error! TypeScript won't let you do this
name = 42; // Type 'number' is not assignable to type 'string'
```

### Practical Example

```typescript
// TypeScript infers the return type as number
function calculateTotal(price: number, quantity: number) {
  return price * quantity; // Returns a number
}

const total = calculateTotal(10, 5);
// 'total' is automatically typed as number

// TypeScript infers array types too
const fruits = ['apple', 'banana', 'orange']; // string[]
const numbers = [1, 2, 3, 4, 5]; // number[]
```

## When to Add Types Manually

Sometimes you should still write types explicitly:

```typescript
// When the value doesn't give enough information
let items: string[] = []; // Empty array needs a type hint

// When you want a more specific type
let status: 'loading' | 'success' | 'error' = 'loading';

// Function parameters always need types
function greet(name: string) {
  return `Hello, ${name}!`;
}
```

## Common Mistakes to Avoid

- **Don't over-annotate**: If TypeScript can figure it out, let it
- **Do annotate function parameters**: TypeScript can't infer what you'll pass in
- **Watch out for `any`**: If inference gives you `any`, add a type manually

Learn more from the following links:

- [@official@Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html#handbook-content)
