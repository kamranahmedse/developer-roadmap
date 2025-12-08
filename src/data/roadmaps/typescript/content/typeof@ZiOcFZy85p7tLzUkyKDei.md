# typeof Operator

**Check what type a variable is using `typeof` — the most common way to narrow types.**

## Why Use typeof?

The `typeof` operator tells you what kind of value you're working with (string, number, boolean, etc.). This helps you use the right methods and prevents errors.

## How It Works

`typeof` returns a string describing the type of a value:
- `"string"` for text
- `"number"` for numbers
- `"boolean"` for true/false
- `"undefined"` for undefined values
- `"object"` for objects and arrays
- `"function"` for functions

## Basic Example

```typescript
let value: string | number = 'hello';

// Check the type before using string-specific methods
if (typeof value === 'string') {
  console.log(value.toUpperCase()); // Safe: "HELLO"
} else {
  console.log(value.toFixed(2)); // Safe: number method
}
```

## Practical Example

```typescript
function processInput(input: string | number | boolean) {
  if (typeof input === 'string') {
    // Handle text
    console.log('Text:', input.trim());
  } else if (typeof input === 'number') {
    // Handle numbers
    console.log('Number:', input * 2);
  } else {
    // Handle boolean
    console.log('Boolean:', input ? 'yes' : 'no');
  }
}

processInput('hello');    // "Text: hello"
processInput(42);         // "Number: 84"
processInput(true);       // "Boolean: yes"
```

## When to Use

- For primitive types (string, number, boolean, undefined)
- When you need to check a variable's basic type quickly
- Before calling type-specific methods

## Important Notes

- `typeof null` returns `"object"` (this is a JavaScript quirk!)
- Use `typeof` for primitives, `instanceof` for classes
- Always use `===` or `!==` when comparing typeof results

Learn more from the following links:

- [@official@Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)
