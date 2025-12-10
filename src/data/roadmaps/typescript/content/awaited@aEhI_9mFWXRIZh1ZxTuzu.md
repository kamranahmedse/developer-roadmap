# Awaited

Unwrap Promise types to see what value they return using `Awaited<Type>`.

## Why Use This?

When you have a Promise (or nested Promises), you might want to know what type of value it will return when resolved. `Awaited` unwraps the Promise to show you the actual data type inside.

## How It Works

`Awaited` removes the Promise wrapper and shows what's inside. If there are nested Promises (Promise of a Promise), it unwraps all the layers until it finds the actual value.

## Examples

### Basic Example: Simple Promise

```typescript
// You have a promise that returns a string
type MyPromise = Promise<string>;

// Extract the string type from inside the promise
type ResolvedValue = Awaited<MyPromise>;
// Result: string

async function getData(): Promise<string> {
  return 'Hello';
}

type Result = Awaited<ReturnType<typeof getData>>;
// Result: string
```

### Practical Example: Nested Promises

```typescript
// A promise that returns a promise that returns a number
type NestedPromise = Promise<Promise<number>>;

// Awaited unwraps all the layers
type FinalValue = Awaited<NestedPromise>;
// Result: number (not Promise<number>!)

// This is useful for type-checking async function results
async function getNumber(): Promise<Promise<number>> {
  return Promise.resolve(42);
}

type Final = Awaited<ReturnType<typeof getNumber>>;
// Final = number
```

### Real-World Example: API Response Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// What does this function return when awaited?
type UserData = Awaited<ReturnType<typeof fetchUser>>;
// Result: User

// Now you can use UserData in other type definitions
type UserCache = Record<number, UserData>;
```

### Example: Mixed Types (Promise and Non-Promise)

```typescript
// A union of different types, some are promises
type MixedValue = Promise<string> | number | boolean;

// Awaited unwraps the promise but keeps other types as-is
type Unwrapped = Awaited<MixedValue>;
// Result: string | number | boolean

// This is useful for handling values that might or might not be promises
function processValue(value: MixedValue) {
  // After unwrapping, you know it's one of these types
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
    console.log(value * 2);
  }
}
```

### Example: Type-Safe Async Operations

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Get the actual data type from the response
type GetFinalType<T> = Awaited<ReturnType<typeof fetchData<T>>>['data'];

type UserDataType = GetFinalType<User>;
// Result: User
```

## Common Mistakes to Avoid

- **Forgetting Awaited exists**: You might manually write out the type instead of using Awaited

```typescript
// Without Awaited - manually unwrapping
type Response = Promise<{ id: number; name: string }>;
type Manual = { id: number; name: string }; // Have to rewrite the whole type

// With Awaited - automatic unwrapping
type Auto = Awaited<Response>; // Cleaner!
```

- **Not understanding nested promises**: Awaited unwraps all levels, not just the first one

```typescript
type DeepNested = Promise<Promise<Promise<string>>>;

type Result = Awaited<DeepNested>;
// Result: string (all promises unwrapped!)
// NOT Promise<Promise<string>>
```

## Using Awaited with ReturnType

A common pattern is combining `Awaited` with `ReturnType` to get the actual resolved type of an async function:

```typescript
async function getUser(id: number): Promise<User> {
  // ...
}

// What does getUser actually return (after await)?
type ResolvedUser = Awaited<ReturnType<typeof getUser>>;
// Result: User
```

## Learn More

- [@official@Awaited<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)
