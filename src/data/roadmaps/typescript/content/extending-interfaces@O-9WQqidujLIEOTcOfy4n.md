# Extending Interfaces

Create new interfaces by building on existing ones using the `extends` keyword.

## Why Extend Interfaces?

Extending lets you reuse code by taking an existing interface and adding more properties to it. This prevents repetition and makes your code easier to maintain.

## How It Works

When an interface extends another, it inherits all of its properties and adds new ones on top.

## Basic Example

```typescript
// Base interface
interface Shape {
  width: number;
  height: number;
}

// New interface that extends Shape
interface Square extends Shape {
  sideLength: number;  // Add new property
}

// Square objects must have all properties from Shape + sideLength
let square: Square = {
  width: 10,
  height: 10,
  sideLength: 10,
};
```

## Practical Example: Building a User System

```typescript
// Base interface for anyone
interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

// Admin extends Person and adds admin-specific properties
interface Admin extends Person {
  adminSince: Date;
  permissions: string[];
}

// Create an admin—must have all Person properties plus admin properties
const admin: Admin = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  adminSince: new Date('2023-01-01'),
  permissions: ['delete', 'edit', 'create'],
};
```

## Extending Multiple Interfaces

You can extend more than one interface at a time:

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// Combine both interfaces
interface Person extends HasName, HasAge {
  email: string;
}

const person: Person = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
};
```

Learn more from the following links:

- [@official@Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
