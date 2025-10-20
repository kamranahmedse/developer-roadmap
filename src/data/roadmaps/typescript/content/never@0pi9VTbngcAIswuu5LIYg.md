````markdown
# Never

## What is the Never Type?

The `never` type represents a value that should never occur. It's the bottom type—the most specific type possible. A function that returns `never` means "this function will never return successfully, either it throws an error or runs forever."

Think of `never` like a dead-end road: once you go down it, you can never come back.

## When Never Appears

`never` appears in several scenarios:

1. **Functions that always throw errors**
2. **Functions that run forever (infinite loops)**
3. **Unreachable code paths**
4. **Exhaustiveness checking in switch statements**

## Functions That Throw Errors

```typescript
// This function will never return successfully - it always throws
function error(message: string): never {
  throw new Error(message);
}

// TypeScript knows this function has a never return type
const result = error("Something went wrong"); // Type is 'never'
```

## Functions That Never Return (Infinite Loops)

```typescript
// This function runs forever - never returns
function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
}

// This will also never return
function serverLoop(): never {
  while (true) {
    // Handle requests forever
    processRequest();
  }
}
```

## Real-World Examples

**Example 1: Error Handler**

```typescript
class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

// This function never returns - always throws
function throwError(code: string, message: string): never {
  throw new AppError(code, message);
}

// Usage
function getUserData(id: string): string {
  if (!id || id === "") {
    throwError("INVALID_ID", "User ID cannot be empty");
  }
  return `User: ${id}`;
}

console.log(getUserData("123")); // User: 123
// getUserData('');                 // Throws AppError
```

**Example 2: Exit Function**

```typescript
// Function that terminates the program
function exitProgram(code: number): never {
  process.exit(code);
}

// Usage
function processConfig(config: any): void {
  if (!config || Object.keys(config).length === 0) {
    console.error("Configuration missing!");
    exitProgram(1); // Never returns, terminates here
  }

  console.log("Config loaded:", config);
}
```

**Example 3: Exhaustiveness Checking**

```typescript
enum Status {
  Active,
  Inactive,
  Pending,
}

function getStatusMessage(status: Status): string {
  switch (status) {
    case Status.Active:
      return "System is active";
    case Status.Inactive:
      return "System is inactive";
    case Status.Pending:
      return "System is pending";
    default:
      // If we handle all cases, this should never be reached
      // TypeScript will error if we forget a case!
      const exhaustive: never = status; // This catches missing cases
      return exhaustive;
  }
}

// If we add a new Status value and forget to handle it,
// TypeScript will give an error here!
```

**Example 4: Promise That Never Settles**

```typescript
// HTTP request that times out after delay
function timeoutRequest<T>(ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout"));
    }, ms);
  });
}

// Simulate never-resolving promise
function waitForever(): Promise<never> {
  return new Promise(() => {
    // Never resolve or reject - infinite wait
  });
}

async function fetchWithTimeout(): Promise<string> {
  try {
    // This will timeout and throw
    return await timeoutRequest<string>(5000);
  } catch {
    console.error("Request failed");
    throw new Error("Fatal error");
  }
}
```

**Example 5: Type Narrowing - Filtering Valid Values**

```typescript
interface Dog {
  kind: "dog";
  bark: () => void;
}

interface Cat {
  kind: "cat";
  meow: () => void;
}

type Animal = Dog | Cat;

// This function only accepts dogs
function petDog(animal: Animal): void {
  if (animal.kind === "dog") {
    animal.bark();
  } else if (animal.kind === "cat") {
    // At this point, TypeScript knows it's not a dog
    // The 'else' is unnecessary because we already handled 'dog'
    // But if we add a new animal type, this becomes important
    animal.meow();
  } else {
    // This code should never be reached if Animal is properly typed
    const exhaustive: never = animal;
  }
}
```

## Never vs Void

Don't confuse `never` with `void`:

| Type    | Meaning                     | Function Returns?            |
| ------- | --------------------------- | ---------------------------- |
| `void`  | Returns but no usable value | Yes (returns `undefined`)    |
| `never` | Never returns at all        | No (throws or infinite loop) |

```typescript
// void - function returns (but returns undefined)
function logMessage(msg: string): void {
  console.log(msg);
  // Implicitly returns undefined
}

// never - function never returns
function throwError(msg: string): never {
  throw new Error(msg);
  // Never returns, ever
}

// Another void example - stops returning
function findUser(id: string): string | void {
  if (id === "") {
    return; // Returns undefined
  }
  return `User: ${id}`;
}

// Another never example
function findUserOrFail(id: string): string {
  if (id === "") {
    throw new Error("Invalid ID"); // Never returns
  }
  return `User: ${id}`;
}
```

## Useful Patterns with Never

**Pattern 1: Helper for exhaustive checks**

```typescript
// Reusable helper for exhaustiveness checking
function assertNever(value: never): never {
  throw new Error(`Unexpected value should not exist: ${value}`);
}

enum PaymentMethod {
  CreditCard,
  PayPal,
  Bitcoin,
}

function processPayment(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.CreditCard:
      return "Processing credit card...";
    case PaymentMethod.PayPal:
      return "Processing PayPal...";
    case PaymentMethod.Bitcoin:
      return "Processing Bitcoin...";
    default:
      assertNever(method); // Ensures all cases are covered
  }
}
```

**Pattern 2: Impossible States**

```typescript
type SuccessResponse = { kind: "success"; data: string };
type ErrorResponse = { kind: "error"; error: string };

type Response = SuccessResponse | ErrorResponse;

function handleResponse(response: Response): void {
  if (response.kind === "success") {
    console.log("Data:", response.data);
  } else if (response.kind === "error") {
    console.log("Error:", response.error);
  } else {
    // This should never happen
    const impossible: never = response;
  }
}
```

**Pattern 3: Type Guard Creating Never**

```typescript
function isSomething(value: any): value is never {
  return false; // Never matches anything
}

// This function will never execute the inner block
const test: unknown = "hello";
if (isSomething(test)) {
  // This block is unreachable
  console.log("Never happens");
}
```

## Why Never Matters

1. **Catches Logic Errors**: If a function is supposed to throw or loop forever, `never` documents that
2. **Exhaustiveness Checking**: Ensures you handle all cases in unions/switches
3. **Type Safety**: Prevents accidental code paths
4. **Documentation**: Makes intent clear to other developers

```typescript
// Without 'never' - might miss a case
function handleStatus(status: "active" | "inactive" | "pending"): string {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    // Forgot 'pending'! But TypeScript might not catch it
  }
}

// With 'never' - catches the missing case
function handleStatus(status: "active" | "inactive" | "pending"): string {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending";
    default:
      const exhaustive: never = status; // TypeScript errors if we forgot a case!
      return exhaustive;
  }
}
```

## When You See Never

- **Function that always throws**: Return type is `never`
- **Function with infinite loop**: Return type is `never`
- **Unreachable code path**: TypeScript marks as `never`
- **Type narrowing**: After eliminating all possibilities, remaining is `never`

```typescript
function example(value: string | number): never {
  if (typeof value === "string") {
    return throwError("Got string");
  } else if (typeof value === "number") {
    return throwError("Got number");
  } else {
    // At this point, value is unreachable - type is 'never'
    const unreachable: never = value;
    return unreachable;
  }
}
```

## Key Differences: Type Hierarchy

```typescript
// Type hierarchy (simplified)
never   // Bottom - most specific, used in nothing
↑
specific types (string, number, boolean, etc.)
↑
never | unknown (mixed everything together)
↑
unknown // Top - least specific, could be anything
↑
any     // Escape hatch - ignore all checking
```

## Key Takeaways

- **`never` represents impossible values**: Functions that don't return normally
- **Used for error handling**: Throw functions return `never`
- **Used for exhaustiveness**: Catch missing cases in type unions
- **Different from `void`**: `void` returns `undefined`, `never` doesn't return
- **Prevents bugs**: Catches logic errors and missing cases
- **Documents intent**: Makes clear when code shouldn't reach certain points

## Common Beginner Mistakes

**Mistake 1: Confusing never with void**

```typescript
// ❌ Wrong
function handler(): never {
  console.log("Handling");
  return; // This returns! Should be void
}

// ✓ Correct
function handler(): void {
  console.log("Handling");
}
```

**Mistake 2: Forgetting the throw**

```typescript
// ❌ This doesn't actually never
function badError(): never {
  console.log("Error");
  // Missing throw!
}

// ✓ Correct
function goodError(): never {
  console.log("Error");
  throw new Error("Error occurred");
}
```

Learn more from the following links:

- [@official@Never Type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
````
