# Equality Narrowing

**Use equality checks (`===`, `!==`, `==`, `!=`) to narrow down variable types.**

## Why Use Equality Checks?

When you compare two variables, TypeScript can figure out more about their types. If two values are equal, they must be the same type, so TypeScript can narrow the possible types.

## How It Works

When you check that two variables are equal with `===`, TypeScript realizes they must be compatible types. This helps TypeScript understand which methods and operations are safe to use.

## Basic Example

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Both x and y must be strings (the only type they have in common)
    x.toUpperCase();  // Safe!
    y.toLowerCase();  // Safe!
  } else {
    console.log(x);
    console.log(y);
  }
}
```

## Practical Example

```typescript
function handleResponse(status: number | string) {
  if (status === 200) {
    // TypeScript knows status is the number 200
    console.log('Success!');
  } else if (status === 'error') {
    // TypeScript knows status is the string 'error'
    console.log('Something went wrong');
  } else {
    console.log('Unknown status:', status);
  }
}

handleResponse(200);      // "Success!"
handleResponse('error');  // "Something went wrong"
```

## Comparing Different Types

```typescript
function compare(a: string | null, b: number | string) {
  if (a === b) {
    // Since a === b, they must be the same type
    // a is now definitely a string (not null)
    // b is now definitely a string (not number)
    console.log(a.toUpperCase());
  }
}
```

## Important Notes

- Use `===` (strict equality) instead of `==` for type narrowing
- Equality checks work best with specific values (like `null`, `undefined`, specific numbers)
- TypeScript uses the common type between both variables when they're equal

Learn more from the following links:

- [@official@Equality Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing)
