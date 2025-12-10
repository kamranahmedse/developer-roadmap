# Mapped Types

Mapped types transform one type into another type by changing all of its properties. Think of them like a factory that takes a blueprint and produces a modified version of it.

## Why Use Mapped Types?

Imagine you have a type describing a user with properties like `name`, `email`, and `age`. What if you want:
- A version where all properties are optional?
- A version where all properties are read-only?
- A version where all properties return promises?

Instead of rewriting the type manually, mapped types create these variations automatically.

## How It Works

Mapped types use `keyof` to loop through all properties of a type and transform each one. Here's the pattern:

```typescript
type TransformType<T> = {
  [Property in keyof T]: /* Do something with Property */
};
```

## Examples

### Make All Properties Optional

```typescript
// Original type
type User = {
  name: string;
  email: string;
  age: number;
};

// Mapped type: all properties become optional
type PartialUser = {
  [P in keyof User]?: User[P];
};

// Now we can create users with missing properties
const user: PartialUser = { name: "John" }; // OK - email and age optional
```

### Make All Properties Readonly

```typescript
type ReadonlyUser = {
  readonly [P in keyof User]: User[P];
};

const user: ReadonlyUser = { name: "John", email: "john@example.com", age: 30 };
user.name = "Jane"; // Error: Cannot assign to readonly property
```

### Make Properties Return Promises (for async APIs)

```typescript
type Async<T> = {
  [P in keyof T]: Promise<T[P]>;
};

type AsyncUser = Async<User>;
// This creates: { name: Promise<string>, email: Promise<string>, age: Promise<number> }
```

## Real-World Use Case

Mapped types are built into TypeScript. You've probably used them without realizing:
- `Partial<T>` - Makes all properties optional
- `Readonly<T>` - Makes all properties read-only
- `Record<K, T>` - Creates an object type with specific keys

## Common Mistakes

- **Don't overthink it**: Mapped types are powerful but start simple
- **Use TypeScript's built-in types first**: `Partial<T>`, `Readonly<T>`, etc. are already available

Learn more from the following links:

- [@official@Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content)
