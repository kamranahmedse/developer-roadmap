# Typing Functions

Typing functions means telling TypeScript what types of values a function accepts and what it returns. This helps catch mistakes before your code runs.

## Why Type Functions?

- **Catch errors early** - TypeScript warns you if you pass the wrong type
- **Better code hints** - Your editor knows what the function does
- **Self-documenting** - Types explain what the function expects
- **Confidence** - You know exactly what to pass in and what you'll get back

## The Basic Pattern

Every function parameter and return value should have a type:

```typescript
function functionName(param1: type1, param2: type2): returnType {
  // code here
  return value;
}
```

Breaking it down:
- `param1: type1` - This parameter must be of `type1`
- `param2: type2` - This parameter must be of `type2`
- `: returnType` - The function must return this type

## Different Ways to Type Functions

### Function Declaration

```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);        // ✓ Works
add(5, "three");  // ✗ Error: "three" is not a number
```

### Arrow Function

```typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};

multiply(4, 5);  // ✓ Works
```

### Function Type Variable

Sometimes you want to describe what kind of function a variable should be, before you assign a function to it:

```typescript
// "divide" must be a function that takes two numbers and returns a number
let divide: (a: number, b: number) => number;

// Now you can assign a function to it
divide = (a, b) => {
  return a / b;
};

console.log(divide(10, 2)); // 5
```

## Practical Example

```typescript
// Function that processes user data
function formatUser(firstName: string, lastName: string, age: number): string {
  return `${firstName} ${lastName} (Age: ${age})`;
}

// Usage
const result = formatUser("John", "Doe", 30);
console.log(result); // "John Doe (Age: 30)"

// This would cause an error:
// formatUser("John", "Doe", "30"); // Error: "30" should be a number
```

## Optional Parameters

If a parameter isn't always needed, mark it with `?`:

```typescript
function createUser(name: string, email?: string): void {
  console.log(`User: ${name}`);
  if (email) {
    console.log(`Email: ${email}`);
  }
}

createUser("Alice");              // ✓ Works
createUser("Bob", "bob@email.com"); // ✓ Works
```

## Common Mistakes to Avoid

- **Forgetting the return type** - Always specify what the function returns, even if it's `void` (nothing)
- **Wrong parameter types** - TypeScript will catch this and show an error
- **Assuming TypeScript knows the type** - Always be explicit about types

Learn more from the following links:

- [@official@TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
