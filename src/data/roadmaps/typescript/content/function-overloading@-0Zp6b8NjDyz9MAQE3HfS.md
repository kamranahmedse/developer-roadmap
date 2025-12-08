# Function Overloading

Function overloading lets you use the same function name in different ways depending on what types of inputs you pass in. TypeScript automatically picks the right version based on your inputs.

## Why Use Function Overloading?

- **Same function, different behavior** - One name, different ways to use it
- **Type safety** - TypeScript knows what each version does
- **Cleaner code** - No need to create separate functions with different names
- **Better user experience** - One simple function to remember

## How It Works

Function overloading has two parts:
1. **Signatures** - Describe all the different ways you can call the function
2. **Implementation** - The actual code that runs

```typescript
// Signatures: These describe what the function can accept
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// Implementation: The actual code
function add(a: any, b: any): any {
  return a + b;
}

// Now you can use it two ways:
console.log(add(1, 2));              // 3 (numbers)
console.log(add('Hello', ' World')); // "Hello World" (strings)
```

## Real-World Example

Imagine you have a function that can format data in different ways:

```typescript
// You can format either a string or an array of strings
function format(value: string): string;
function format(value: string[]): string;

function format(value: any): string {
  if (typeof value === 'string') {
    // If it's a string, uppercase it
    return value.toUpperCase();
  } else {
    // If it's an array, join with commas
    return value.join(', ');
  }
}

console.log(format("hello"));           // "HELLO"
console.log(format(["red", "blue"]));  // "red, blue"
```

## More Complex Example

```typescript
// A search function that works with strings or numbers
function search(query: string): string[];
function search(query: number): { id: number }[];

function search(query: any): any[] {
  if (typeof query === 'string') {
    // Search for users by name
    return ['Alice', 'Bob', 'Charlie'].filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    // Search for user by ID
    return [{ id: query }];
  }
}

console.log(search('ali'));  // ['Alice']
console.log(search(123));     // [{ id: 123 }]
```

## Common Mistakes to Avoid

- **Forgetting signatures** - Always write the signatures before the implementation
- **Implementation type too strict** - Use `any` for the implementation so it accepts all types from the signatures
- **Confusing overloading with optional parameters** - Use overloading when you have different behavior for different types, not just different numbers of parameters
- **Putting logic in signatures** - Signatures should only describe types, not contain code

## When to Use Function Overloading

✓ **Use overloading when:**
- The function behaves differently based on input types
- You want to provide different return types based on inputs
- It makes the function easier to understand and use

✗ **Don't use overloading when:**
- A simple optional parameter would work
- The function does the same thing regardless of type

Learn more from the following links:

- [@official@Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
