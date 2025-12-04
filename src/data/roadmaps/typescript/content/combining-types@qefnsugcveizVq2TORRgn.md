# Combining Types

TypeScript lets you build new types by combining existing ones. The two main ways are **union** (`|`) and **intersection** (`&`).

## Type Union (`|`) — "This OR That"

Use union when a value can be **one of several types**. Think of it as "either/or".

### Basic Example

```typescript
// Can be a string OR a number
type StringOrNumber = string | number;

let value: StringOrNumber = 'hello'; // OK
value = 42; // Also OK
value = true; // Error! boolean is not in the union
```

### Practical Example

```typescript
// API responses often have different shapes
type ApiResponse = 
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    // TypeScript knows 'data' exists here
    console.log(response.data);
  } else {
    // TypeScript knows 'message' exists here
    console.log(response.message);
  }
}
```

## Type Intersection (`&`) — "This AND That"

Use intersection when a value must have **all properties from multiple types**. Think of it as "both/and".

### Basic Example

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// Must have BOTH name AND age
type Person = HasName & HasAge;

const person: Person = {
  name: 'Alice',
  age: 30
}; // Must include both properties
```

### Practical Example

```typescript
// Base type for all database records
interface DatabaseRecord {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Specific data for a user
interface UserData {
  name: string;
  email: string;
}

// Combine them: a User has all database fields PLUS user-specific fields
type User = DatabaseRecord & UserData;

const user: User = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Bob',
  email: 'bob@example.com'
};
```

## Quick Comparison

| Union (`\|`) | Intersection (`&`) |
|-------------|-------------------|
| "One of these types" | "All of these types combined" |
| Value matches ANY of the types | Value must match ALL types |
| Use for flexibility | Use for combining features |

## Common Mistakes to Avoid

- **Confusing `|` and `&`**: Union means "or", intersection means "and"
- **Impossible intersections**: `string & number` creates `never` (no value can be both)
- **Forgetting to narrow unions**: Use type guards to tell TypeScript which type you're working with

Learn more from the following links:

- [@official@Union Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [@article@Intersection Types in TypeScript](https://www.typescripttutorial.net/typescript-tutorial/typescript-intersection-types/)
- [@article@Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [@article@Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content)
