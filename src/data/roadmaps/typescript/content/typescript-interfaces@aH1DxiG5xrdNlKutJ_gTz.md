# Interfaces

Define a blueprint for what an object should look like in TypeScript.

## Why Use Interfaces?

Interfaces let you specify exactly what properties and methods an object must have. Think of them as a contract—if something claims to be of a certain type, it must follow that interface's rules. This helps catch mistakes early and makes your code easier to understand.

## How They Work

An interface describes the structure of an object. Once you create an interface, you can use it to type your objects, and TypeScript will make sure they match.

## Basic Example

```typescript
// Define what a User should look like
interface User {
  name: string;
  age: number;
}

// Create an object that matches the User interface
const user: User = {
  name: 'John Doe',
  age: 30,
};
```

## Practical Example: Function Parameters

```typescript
// Define what a Product should look like
interface Product {
  id: number;
  name: string;
  price: number;
}

// Function that works with any Product
function printProductInfo(product: Product) {
  console.log(`${product.name} costs $${product.price}`);
}

// Use the function
const laptop: Product = {
  id: 1,
  name: 'Laptop',
  price: 999,
};

printProductInfo(laptop); // "Laptop costs $999"
```

## Key Points

- Interfaces exist only in TypeScript—they disappear when converted to JavaScript
- They help catch type errors before your code runs
- You can mark properties as optional with `?`

Learn more from the following links:

- [@official@TypeScript - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
