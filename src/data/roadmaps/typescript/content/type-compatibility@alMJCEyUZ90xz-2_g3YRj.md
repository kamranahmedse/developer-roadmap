# Type Compatibility

TypeScript checks if types are compatible based on their **structure** (shape), not their names. If two types have the same properties, they're compatible.

## Why Does This Matter?

This approach (called "structural typing" or "duck typing") makes TypeScript flexible:
- You don't need to explicitly declare that types are related
- Objects from different sources can work together if they have matching shapes
- It feels natural and matches how JavaScript actually works

## How It Works

Think of it like this: "If it looks like a duck and quacks like a duck, it's a duck." TypeScript doesn't care what you call a type — it only cares about what properties it has.

### Basic Example

```typescript
interface Point {
  x: number;
  y: number;
}

// This object matches the Point structure
let p1: Point = { x: 10, y: 20 };

// Different type name, same structure — still compatible!
let p2: { x: number; y: number } = p1;

console.log(p2.x); // Output: 10
```

### Practical Example

```typescript
interface User {
  name: string;
  email: string;
}

// Function expects a User
function sendEmail(user: User) {
  console.log(`Sending email to ${user.email}`);
}

// This object wasn't declared as User, but it has the right shape
const person = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30 // Extra properties are OK!
};

sendEmail(person); // Works! 'person' is compatible with User
```

## Extra Properties Are Allowed

A type with **more** properties is compatible with a type that has **fewer** properties:

```typescript
interface BasicUser {
  name: string;
}

interface DetailedUser {
  name: string;
  email: string;
  age: number;
}

let detailed: DetailedUser = { name: 'Bob', email: 'bob@test.com', age: 25 };
let basic: BasicUser = detailed; // OK! DetailedUser has everything BasicUser needs

// But not the other way around
let another: DetailedUser = basic; // Error! BasicUser is missing 'email' and 'age'
```

## Common Mistakes to Avoid

- **Object literals are stricter**: When you assign an object literal directly, TypeScript checks for extra properties
  ```typescript
  let user: User = { name: 'Test', email: 'test@test.com', extra: true }; // Error!
  ```
- **Don't assume name equality**: Two interfaces with the same name in different places aren't automatically the same type

Learn more from the following links:

- [@official@Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
