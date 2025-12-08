# Hybrid Types

Combine multiple types into a single type using the union operator (`|`).

## What Is a Hybrid Type?

A hybrid type lets you say that a value can be one of several different types. Think of it as "this can be A or B."

## Basic Example: Union Types

```typescript
// This value can be either a string or a number
type StringOrNumber = string | number;

function printID(id: StringOrNumber) {
  console.log(id);
}

printID(123);      // ✅ OK - it's a number
printID('abc123'); // ✅ OK - it's a string
printID(true);     // ❌ Error - boolean is not allowed
```

## Practical Example: API Response

```typescript
// A response can be successful data or an error message
type ApiResult = 
  | { success: true; data: any }
  | { success: false; error: string };

function handleResponse(result: ApiResult) {
  if (result.success) {
    console.log('Data:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}
```

## Complex Example: Building a Configuration Object

```typescript
// Define what Education looks like
type Education = {
  degree: string;
  school: string;
  year: number;
};

// Define what a Job looks like
type Job = {
  title: string;
  company: string;
  years: number;
};

// A User can have education OR a job (or both)
type User = {
  name: string;
  age: number;
  email: string;
  background: Education | Job;  // Either education or job
};

const student: User = {
  name: 'Alice',
  age: 20,
  email: 'alice@example.com',
  background: {
    degree: 'Computer Science',
    school: 'MIT',
    year: 2023,
  },
};

const worker: User = {
  name: 'Bob',
  age: 30,
  email: 'bob@example.com',
  background: {
    title: 'Software Engineer',
    company: 'Google',
    years: 5,
  },
};
```

## Common Patterns

### Optional Values

```typescript
// A string, a number, or nothing
type Value = string | number | null;
```

### Multiple Possible Shapes

```typescript
// The response can be one of these structures
type Response = 
  | { type: 'success'; data: any }
  | { type: 'error'; message: string }
  | { type: 'loading' };
```

## Key Points

- Use `|` to combine multiple types
- The value must match at least one of the types
- You can combine primitives (`string | number`) or complex objects
- Use type guards (`if`, `typeof`, etc.) to safely work with union types
