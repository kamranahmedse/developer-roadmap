# Type Predicates

**Create custom type guard functions that tell TypeScript exactly what type a value is.**

## Why Use Type Predicates?

Sometimes the built-in type guards (`typeof`, `instanceof`) aren't enough. Type predicates let you write custom functions that check a value's type and tell TypeScript what type to treat it as.

## How It Works

A type predicate is a function that:
1. Takes a value as input
2. Returns `true` or `false`
3. Uses the special syntax `value is Type` to tell TypeScript the narrowed type

## Basic Example

```typescript
// Create a custom type guard function
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Use it in your code
function example(x: unknown) {
  if (isString(x)) {
    // TypeScript now knows x is a string
    console.log(x.toUpperCase()); // Safe!
  } else {
    console.log(x);
  }
}

example('hello');  // "HELLO"
example(42);       // 42
```

## Practical Example: Custom Class Check

```typescript
class User {
  constructor(public name: string, public age: number) {}
}

class Admin extends User {
  constructor(name: string, age: number, public permissions: string[]) {
    super(name, age);
  }
}

// Custom type predicate
function isAdmin(person: User): person is Admin {
  return person instanceof Admin;
}

// Usage
function displayUser(person: User | Admin) {
  console.log(`Name: ${person.name}`);
  
  if (isAdmin(person)) {
    // TypeScript knows person is an Admin
    console.log(`Permissions: ${person.permissions.join(', ')}`);
  }
}

displayUser(new User('John', 30));
displayUser(new Admin('Jane', 28, ['delete', 'edit']));
```

## Real-World Example: Checking Arrays

```typescript
// Check if array contains strings
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === 'string')
  );
}

function processItems(data: unknown) {
  if (isStringArray(data)) {
    // TypeScript knows data is an array of strings
    data.forEach(item => console.log(item.toUpperCase()));
  } else {
    console.log('Not an array of strings');
  }
}

processItems(['hello', 'world']);  // "HELLO" "WORLD"
processItems([1, 2, 3]);           // "Not an array of strings"
```

## Common Patterns

- **Check object shape**: Verify an object has specific properties
- **Validate values**: Check if values meet certain conditions
- **Handle unions**: Distinguish between multiple possible types

## Important Notes

- Type predicates are useful when `typeof` and `instanceof` aren't enough
- Always return a boolean from the predicate function
- The type you specify in `value is Type` must be more specific than the input type
- Keep type predicates simple and focused on one type check

Learn more from the following links:

- [@official@Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
