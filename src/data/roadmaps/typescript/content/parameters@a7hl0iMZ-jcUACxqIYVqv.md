# Parameters

Extract the parameter types from a function using `Parameters<Type>`.

## Why Use This?

Sometimes you have a function and want to reuse the same parameter types elsewhere in your code. Instead of retyping all the parameters, `Parameters` automatically extracts them for you. This is useful for creating wrapper functions or validating inputs.

## How It Works

`Parameters` looks at a function's parameters and creates a tuple type containing each parameter's type. A tuple is an array where each position has a specific type.

## Examples

### Basic Example: Simple Function

```typescript
// Define a function
function greet(name: string, age: number): void {
  console.log(`${name} is ${age} years old`);
}

// Extract the parameter types
type GreetParams = Parameters<typeof greet>;
// Result: [name: string, age: number]

// Use those types elsewhere
function validateGreetParams(params: GreetParams): boolean {
  const [name, age] = params;
  return name.length > 0 && age > 0;
}
```

### Practical Example: Creating a Wrapper Function

```typescript
// Original function you want to wrap
function calculateTotal(price: number, taxRate: number, discount: number): number {
  return price * (1 + taxRate) - discount;
}

// Extract the parameters
type CalculateParams = Parameters<typeof calculateTotal>;

// Create a wrapper that logs before calling
function loggedCalculateTotal(...args: CalculateParams): number {
  console.log(`Calculating with params:`, args);
  return calculateTotal(...args);
}

loggedCalculateTotal(100, 0.1, 5); // Works with the same params!
```

### Real-World Example: API Handler Wrapper

```typescript
// Your API handler function
function handleUserRequest(
  userId: number,
  action: 'read' | 'update' | 'delete',
  metadata?: Record<string, any>
): Promise<void> {
  // Implementation
}

// Extract parameter types
type UserRequestParams = Parameters<typeof handleUserRequest>;

// Create an authenticated wrapper
async function authenticatedHandler(...params: UserRequestParams) {
  // Check authentication first
  if (!isUserAuthenticated()) {
    throw new Error('Not authenticated');
  }
  
  // Then call the original function
  return handleUserRequest(...params);
}

// Both take the same parameters
authenticatedHandler(1, 'read', { timestamp: Date.now() });
```

### Example: Function Middleware

```typescript
function apiCall(
  endpoint: string,
  method: 'GET' | 'POST',
  headers?: Record<string, string>
): Promise<unknown> {
  // Implementation
}

// Extract parameters to create middleware
type ApiParams = Parameters<typeof apiCall>;

function withRetry(...params: ApiParams): Promise<unknown> {
  let attempts = 0;
  const maxAttempts = 3;
  
  async function tryCall(): Promise<unknown> {
    try {
      return await apiCall(...params);
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        return tryCall(); // Retry
      }
      throw error;
    }
  }
  
  return tryCall();
}
```

### Example: No Parameters

```typescript
// Function with no parameters
function getCurrentTime(): string {
  return new Date().toISOString();
}

// Extract parameters (will be empty)
type TimeParams = Parameters<typeof getCurrentTime>;
// Result: []

const params: TimeParams = [];
```

### Example: Generic Functions

```typescript
function transform<T, U>(value: T, mapper: (arg: T) => U): U {
  return mapper(value);
}

// Extract parameters
type TransformParams = Parameters<typeof transform>;
// Result: [value: unknown, mapper: (arg: unknown) => unknown]

// You can use this for type-safe callbacks
function createTransformer(...params: TransformParams) {
  // TypeScript ensures the mapper function matches the value type
}
```

## Common Mistakes to Avoid

- **Using Parameters with non-function types**: Parameters only works with function types

```typescript
// ✗ Error: string is not a function
// type Params = Parameters<string>;

// ✓ Use with functions
type Params = Parameters<(x: string) => void>; // [x: string]
```

- **Forgetting to use `typeof` with actual functions**: You need `typeof` to get the function's type

```typescript
function myFunc(x: number): void {}

// ✗ Wrong: myFunc is a value, not a type
// type Params = Parameters<myFunc>;

// ✓ Correct: use typeof to get the function's type
type Params = Parameters<typeof myFunc>; // [x: number]
```

- **Misunderstanding tuple order**: Parameter order matters

```typescript
function order(first: string, second: number, third: boolean) {}

type Params = Parameters<typeof order>;
// Result: [first: string, second: number, third: boolean]
// NOT [string, number, boolean] - the names and order matter!
```

## Parameters vs Function Signature

Use `Parameters` when you need just the input types, but use the full function type when you also need the return type:

```typescript
function getData(id: number): Promise<User> {
  // ...
}

// Just the parameters
type Params = Parameters<typeof getData>; // [id: number]

// Both parameters AND return type
type FullSignature = typeof getData; // (id: number) => Promise<User>
```

## Learn More

- [@official@Parameters<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)
