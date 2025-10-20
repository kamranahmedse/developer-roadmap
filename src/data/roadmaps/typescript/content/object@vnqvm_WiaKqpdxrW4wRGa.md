# Object

## What is an Object Type?

In TypeScript, an **object type** describes the structure of a JavaScript object by specifying what properties it has and what types those properties should be. It's a quick way to define the shape of an object inline (without creating an interface or class).

Object types are useful for:

- Simple, one-off object shapes
- Function parameters that need objects
- Quick type annotations when you don't need a reusable interface

## Basic Object Type Syntax

```typescript
// Define object type with properties
function printCoord(pt: { x: number; y: number }): void {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

// Pass an object matching that type
printCoord({ x: 3, y: 7 }); // Works!
```

## Simple Examples

```typescript
// Person object
const person: { name: string; age: number } = {
  name: "Alice",
  age: 28,
};

// Configuration object
const config: { apiUrl: string; timeout: number; debug: boolean } = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debug: false,
};

// This would error - wrong types
// const invalid: { name: string; age: number } = {
//   name: 'Bob',
//   age: 'thirty'  // ❌ Error: string is not number
// };
```

## Real-World Example: Point System

```typescript
// Simple point
function calculateDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

const pointA = { x: 0, y: 0 };
const pointB = { x: 3, y: 4 };

const distance = calculateDistance(pointA, pointB);
console.log(distance); // 5
```

## Optional Properties (Using ?)

```typescript
// Some properties might be optional
function renderButton(button: {
  text: string;
  color?: string;
  disabled?: boolean;
}): void {
  const buttonColor = button.color ?? "blue";
  const isDisabled = button.disabled ?? false;

  console.log(
    `Button: ${button.text} (${buttonColor}, disabled: ${isDisabled})`
  );
}

renderButton({ text: "Click me" }); // Uses defaults
renderButton({ text: "Submit", color: "green" }); // Partial override
renderButton({ text: "Delete", color: "red", disabled: true }); // All specified
```

## Nested Object Types

```typescript
// Objects within objects
function createUser(user: {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}): void {
  console.log(
    `${user.name} lives at ${user.address.street}, ${user.address.city}`
  );
}

createUser({
  name: "Alice",
  email: "alice@example.com",
  address: {
    street: "123 Main St",
    city: "Portland",
    zipcode: "97201",
  },
});
```

## Object Types with Methods

```typescript
// Objects can have methods too
function startGame(game: {
  name: string;
  score: number;
  play: () => void;
  addScore: (points: number) => void;
}): void {
  console.log(`Starting ${game.name}`);
  game.play();
  game.addScore(10);
}

const myGame = {
  name: "Mario",
  score: 0,
  play: () => console.log("Playing..."),
  addScore: (points: number) => {
    // game.score += points;
    console.log(`Added ${points} points`);
  },
};

startGame(myGame);
```

## Multiple Properties Example

```typescript
// Product with various properties
interface ProductInfo {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
  description?: string;
}

function displayProduct(product: ProductInfo): void {
  console.log(`${product.name}: $${product.price}`);
  if (product.description) {
    console.log(`  ${product.description}`);
  }
  console.log(`  Tags: ${product.tags.join(", ")}`);
  console.log(`  In Stock: ${product.inStock}`);
}

displayProduct({
  id: 1,
  name: "Laptop",
  price: 999,
  inStock: true,
  tags: ["electronics", "computers"],
  description: "High-performance laptop",
});
```

## Readonly Properties

```typescript
// Once set, can't be changed
function createConfig(config: {
  readonly apiUrl: string;
  readonly version: string;
  timeout: number;
}): void {
  console.log(`API: ${config.apiUrl}`);
  // config.apiUrl = 'new-url';  // ❌ Error: readonly property
  config.timeout = 3000; // ✓ OK: not readonly
}
```

## When to Use Object Types vs Interfaces

| Use Object Type           | Use Interface               |
| ------------------------- | --------------------------- |
| Simple, one-off shapes    | Reusable across code        |
| Inline in function params | Shared among many functions |
| Quick typing              | Complex structures          |
| Don't need inheritance    | Need to extend other types  |

**Object Type Example:**

```typescript
function sendRequest(data: {
  url: string;
  method: string;
  body?: string;
}): void {
  // Use the type inline - simple and clear
}
```

**Interface Example:**

```typescript
interface RequestOptions {
  url: string;
  method: string;
  body?: string;
}

function sendRequest(data: RequestOptions): void {
  // Reusable across multiple functions
}
```

## Common Patterns

**Pattern 1: Configuration Objects**

```typescript
function startServer(config: {
  port: number;
  host: string;
  ssl: boolean;
  maxConnections?: number;
}): void {
  // Start server logic
}
```

**Pattern 2: Event Handlers**

```typescript
function handleClick(event: { x: number; y: number; button: number }): void {
  console.log(`Clicked at (${event.x}, ${event.y})`);
}
```

**Pattern 3: API Response**

```typescript
function processResponse(response: {
  success: boolean;
  data: any;
  error?: string;
  timestamp: number;
}): void {
  if (response.success) {
    console.log(response.data);
  } else {
    console.log(`Error: ${response.error}`);
  }
}
```

## Type Checking with Objects

```typescript
// TypeScript ensures correct types
const config: { host: string; port: number } = {
  host: "localhost",
  port: 3000,
};

// ❌ Error: missing port
// const invalid: { host: string; port: number } = {
//   host: 'localhost'
// };

// ❌ Error: wrong types
// const invalid2: { host: string; port: number } = {
//   host: 'localhost',
//   port: '3000'  // string instead of number
// };
```

## Key Differences: Objects vs Other Types

```typescript
// Object type (most flexible object structure)
type Person = { name: string; age: number };

// Interface (similar but extensible)
interface Person {
  name: string;
  age: number;
}

// Class (objects with behavior and instance methods)
class Person {
  constructor(public name: string, public age: number) {}
}

// Tuple (fixed structure with specific types per position)
type PersonTuple = [string, number]; // [name, age]
```

## Tips for Beginners

1. **Simple structures**: Use inline object types for quick typing
2. **Reusable structures**: Use interfaces or type aliases
3. **Document intent**: Clear property names make code self-documenting
4. **Optional fields**: Use `?` for properties that might not exist
5. **Nested objects**: Break into smaller types for clarity

```typescript
// Good: Clear and organized
function createPost(post: {
  title: string;
  content: string;
  author: { name: string; email: string };
  published: boolean;
}): void {
  // Handle post
}

// Better: Reusable with interfaces
interface Author {
  name: string;
  email: string;
}

interface Post {
  title: string;
  content: string;
  author: Author;
  published: boolean;
}

function createPost(post: Post): void {
  // Handle post
}
```

## Key Takeaways

- **Object types define shapes**: What properties an object must have
- **Use inline for simple cases**: Quick one-off type annotations
- **Use interfaces for complex cases**: Reusable, extensible patterns
- **Type safety**: TypeScript ensures objects match expected structure
- **Optional properties**: Use `?` to make properties optional
- **Methods included**: Object types can include function properties

Learn more from the following links:

- [@official@Object Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)
