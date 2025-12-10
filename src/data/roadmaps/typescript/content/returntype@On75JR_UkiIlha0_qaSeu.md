# ReturnType

Extract what a function returns using `ReturnType<Type>`.

## Why Use This?

When you have a function, you might want to reuse its return type elsewhere. Instead of manually writing out what it returns, `ReturnType` automatically extracts it. This is useful for creating types based on function signatures or building type-safe abstractions.

## How It Works

`ReturnType` looks at a function and pulls out what type it returns. If the function returns a string, you get `string`. If it returns an object, you get that object's type.

## Examples

### Basic Example: Simple Function

```typescript
// Define a function
function getUserName(id: number): string {
  return 'John Doe';
}

// Extract what it returns
type UserName = ReturnType<typeof getUserName>;
// Result: string

// Now you can use UserName in other places
const greeting: UserName = getUserName(1);
```

### Practical Example: API Response Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Function that fetches user data
function fetchUser(id: number): User {
  return { id, name: 'Jane', email: 'jane@example.com' };
}

// Extract the return type
type FetchedUser = ReturnType<typeof fetchUser>;
// Result: User

// Use it for caching
type UserCache = Map<number, FetchedUser>;
const cache: UserCache = new Map();
```

### Real-World Example: Promise Returns

```typescript
async function getUser(id: number): Promise<{ id: number; name: string }> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Extract the return type (which is a Promise)
type UserResponse = ReturnType<typeof getUser>;
// Result: Promise<{ id: number; name: string }>

// If you want the actual data type (not the Promise), use Awaited
type ActualUser = Awaited<ReturnType<typeof getUser>>;
// Result: { id: number; name: string }
```

### Example: Building on Return Types

```typescript
function createUser(name: string): { id: number; name: string; created: boolean } {
  return { id: Math.random(), name, created: true };
}

// Get the return type
type CreatedUser = ReturnType<typeof createUser>;

// Build on it with other utilities
type PartialUser = Partial<CreatedUser>;
type UserWithoutId = Omit<CreatedUser, 'id'>;
type ReadonlyUser = Readonly<CreatedUser>;
```

### Example: Generic Functions

```typescript
function identity<T>(value: T): T {
  return value;
}

// The return type is whatever you pass in
type StringReturn = ReturnType<typeof identity<string>>;
// Result: string

type NumberReturn = ReturnType<typeof identity<number>>;
// Result: number
```

### Example: Function That Returns Different Types

```typescript
function parseValue(input: string): string | number | null {
  if (input === 'null') return null;
  if (!isNaN(Number(input))) return Number(input);
  return input;
}

// Extract the union return type
type ParsedValue = ReturnType<typeof parseValue>;
// Result: string | number | null

function handleParsed(value: ParsedValue) {
  // TypeScript knows it's one of these three types
  if (typeof value === 'string') {
    console.log(value.length);
  } else if (typeof value === 'number') {
    console.log(value * 2);
  } else {
    console.log('null');
  }
}
```

### Example: Void Returns

```typescript
function logMessage(msg: string): void {
  console.log(msg);
}

// Extract the return type
type LogReturn = ReturnType<typeof logMessage>;
// Result: void

const result: LogReturn = undefined; // void means no meaningful return
```

## Common Mistakes to Avoid

- **Using ReturnType with non-function types**: ReturnType only works with functions

```typescript
// ✗ Error: string is not a function
// type Return = ReturnType<string>;

// ✓ Use with functions
type Return = ReturnType<(x: string) => number>; // number
```

- **Forgetting to use `typeof` with actual functions**: You need `typeof` to get the function's type

```typescript
function myFunc(): string { return 'hello'; }

// ✗ Wrong: myFunc is a value, not a type
// type Return = ReturnType<myFunc>;

// ✓ Correct: use typeof to get the function's type
type Return = ReturnType<typeof myFunc>; // string
```

- **Confusing Promise with Awaited**: ReturnType includes the Promise wrapper

```typescript
async function getData(): Promise<string> {
  return 'data';
}

// This includes the Promise
type WithPromise = ReturnType<typeof getData>;
// Result: Promise<string>

// To get just the string, use Awaited
type JustString = Awaited<ReturnType<typeof getData>>;
// Result: string
```

## ReturnType + Awaited Pattern

A common pattern for async functions:

```typescript
async function fetchData(): Promise<{ id: number; data: string }> {
  // ...
}

// Step 1: Get the function's return type (includes Promise)
type Response = ReturnType<typeof fetchData>;
// Result: Promise<{ id: number; data: string }>

// Step 2: Unwrap the Promise to get actual data
type Data = Awaited<Response>;
// Result: { id: number; data: string }

// Or do it in one step
type Data2 = Awaited<ReturnType<typeof fetchData>>;
```

## Learn More

- [@official@ReturnType<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)
