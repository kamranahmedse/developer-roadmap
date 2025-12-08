# Type Guards

**Narrow down the type of a variable so TypeScript knows exactly what you're working with.**

## Why Use Type Guards?

Sometimes a variable can be multiple types (like a `string` or `number`). Type guards help you check what type it actually is before you use it. This prevents errors and helps TypeScript give you better suggestions.

## How It Works

A type guard is a check that tells TypeScript "after this check, the variable is definitely this type." Common type guards include:

- `typeof` — checks if something is a string, number, boolean, etc.
- `instanceof` — checks if something is an instance of a class
- Equality checks — comparing values to narrow types
- Truthiness checks — checking if something is truthy or falsy

## Example

```typescript
function processValue(value: string | number) {
  // Without a type guard, TypeScript doesn't know which methods are safe
  
  if (typeof value === 'string') {
    // Inside this block, TypeScript knows value is a string
    console.log(value.toUpperCase()); // This is safe!
  } else {
    // Inside this block, TypeScript knows value is a number
    console.log(value.toFixed(2)); // This is safe!
  }
}

processValue("hello"); // "HELLO"
processValue(42.5); // "42.50"
```

## Common Type Guards

- **`typeof` checks**: Best for primitives (string, number, boolean)
- **`instanceof` checks**: Best for class instances
- **Equality checks**: Useful for narrowing union types
- **Truthiness checks**: For null/undefined checks
- **Type predicates**: Custom functions that return true/false

Learn more from the following resources:

- [@official@Type Guards - TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)
