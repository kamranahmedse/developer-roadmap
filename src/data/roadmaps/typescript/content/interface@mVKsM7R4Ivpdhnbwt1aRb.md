# Interface

## What is an Interface?

An **interface** is a way to define the shape of an object in TypeScript. Think of it as a blueprint or contract that describes what properties and methods an object should have, and what types those properties should be.

Interfaces are the foundation of object-oriented programming in TypeScript. They help you:

- **Define structure**: Specify what properties an object must have
- **Enforce contracts**: Ensure objects conform to expected shapes
- **Reuse patterns**: Define common object structures once, use them everywhere
- **Catch errors early**: TypeScript will warn if an object doesn't match the interface

## Basic Usage

```typescript
// Define an interface
interface Person {
  name: string;
  age: number;
}

// Use it
const person: Person = {
  name: "Alice",
  age: 30,
};

// This won't work - TypeScript will error
const invalid: Person = {
  name: "Bob",
  // Missing 'age' property!
};
```

## Real-World Example: Building a Function

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

// Function that takes a User-shaped object
function greet(user: User): string {
  return `Hello ${user.name}! You are ${user.age} years old.`;
}

const alice: User = {
  name: "Alice",
  email: "alice@example.com",
  age: 28,
};

console.log(greet(alice)); // Hello Alice! You are 28 years old.
```

## Practical Example: E-commerce Product

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

function displayProduct(product: Product): void {
  console.log(`${product.name}: $${product.price}`);
  if (product.inStock) {
    console.log("Available now!");
  } else {
    console.log("Out of stock");
  }
}

const laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 1299,
  description: "16-inch laptop",
  inStock: true,
};

displayProduct(laptop);
```

## Optional Properties (Using ?)

Sometimes an object might not have all properties. Use `?` to make properties optional:

```typescript
interface UserProfile {
  name: string; // Required
  email: string; // Required
  phone?: string; // Optional
  bio?: string; // Optional
  website?: string; // Optional
}

const user1: UserProfile = {
  name: "John",
  email: "john@example.com",
  phone: "555-1234", // Has phone
};

const user2: UserProfile = {
  name: "Jane",
  email: "jane@example.com", // No phone, bio, or website - that's OK!
};
```

## Methods in Interfaces

Interfaces can also define methods (functions that belong to the object):

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const myCalc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

console.log(myCalc.add(5, 3)); // 8
console.log(myCalc.subtract(5, 3)); // 2
```

## Real-World API Response Example

```typescript
interface ApiResponse {
  success: boolean;
  data: string | null;
  error?: string;
  timestamp: number;
}

function handleApiResponse(response: ApiResponse): void {
  if (response.success) {
    console.log("Success:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

// Successful response
const response1: ApiResponse = {
  success: true,
  data: "User created successfully",
  timestamp: Date.now(),
};

// Failed response
const response2: ApiResponse = {
  success: false,
  data: null,
  error: "Email already exists",
  timestamp: Date.now(),
};

handleApiResponse(response1); // Success: User created successfully
handleApiResponse(response2); // Error: Email already exists
```

## Extending Interfaces (Inheritance)

You can create interfaces that extend other interfaces, inheriting their properties:

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof!"),
};

myDog.bark(); // Woof!
```

## Why Interfaces Matter

1. **Type Safety**: Catch errors before runtime
2. **Documentation**: Code documents itself through interfaces
3. **Refactoring**: Change structure in one place, catch errors everywhere
4. **IDE Support**: Better autocomplete and suggestions
5. **Contracts**: Ensure all team members follow the same structure

## Common Beginner Patterns

**Pattern 1: Data Models**

```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
}
```

**Pattern 2: Function Parameters**

```typescript
interface SearchOptions {
  query: string;
  limit?: number;
  offset?: number;
}

function search(options: SearchOptions): void {
  console.log(`Searching for: ${options.query}`);
}
```

**Pattern 3: Configuration Objects**

```typescript
interface AppConfig {
  apiUrl: string;
  port: number;
  debug: boolean;
  environment: "development" | "production";
}
```

## Key Takeaways

- **Interfaces define object shapes**: What properties, their types, and methods
- **Use them everywhere**: Especially for function parameters and return types
- **Make properties optional**: Use `?` for properties that might not exist
- **Extend interfaces**: Create new interfaces based on existing ones
- **Improves code quality**: Catches errors and makes code self-documenting

Learn more from the following links:

- [@official@Object Types - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
