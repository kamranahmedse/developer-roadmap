# Intersection Types

Combine multiple types into one using the `&` symbol. The result has ALL properties from every type.

## Why Use This?

Intersection types are useful when you want to:

- Merge multiple types or interfaces together
- Add extra properties to an existing type
- Create complex types from simpler building blocks

## How It Works

Think of intersections as "and" types. When you write `TypeA & TypeB`, you're saying "this must have everything from TypeA AND everything from TypeB."

## Union vs Intersection

| Union (`\|`) | Intersection (`&`) |
| ------------ | ------------------ |
| Either/or | Both/and |
| `A \| B` = A or B | `A & B` = A and B |
| Fewer required properties | More required properties |

## Examples

### Basic Example

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

// Combine both types - must have ALL properties
type Staff = Person & Employee;

const john: Staff = {
  name: 'John', // from Person
  age: 30, // from Person
  employeeId: 123, // from Employee
  department: 'Engineering', // from Employee
};
```

### Practical Example: Extending Types

```typescript
// Base type for all API responses
type ApiResponse = {
  success: boolean;
  timestamp: Date;
};

// Specific data for user response
type UserData = {
  userId: number;
  username: string;
};

// Combined type for user API response
type UserResponse = ApiResponse & UserData;

function handleUserResponse(response: UserResponse) {
  if (response.success) {
    console.log(`User ${response.username} loaded at ${response.timestamp}`);
  }
}
```

### Combining with Interfaces

```typescript
interface Printable {
  print(): void;
}

interface Loggable {
  log(): void;
}

// A class that must implement both interfaces
class Report implements Printable & Loggable {
  print() {
    console.log('Printing report...');
  }

  log() {
    console.log('Logging report...');
  }
}
```

## Common Mistakes to Avoid

- **Conflicting properties**: If both types have the same property with different types, the result might be `never` (impossible to satisfy)
- **Overusing intersections**: Sometimes extending an interface or using composition is cleaner

```typescript
// ⚠️ Careful with conflicts!
type A = { value: string };
type B = { value: number };
type C = A & B; // value is string & number = never!
```

Learn more from the following links:

- [@article@Intersection Types in TypeScript](https://www.typescripttutorial.net/typescript-tutorial/typescript-intersection-types/)
