# keyof Operator

Get all the property names (keys) of an object type as a union type using the `keyof` operator.

## Why Use This?

The `keyof` operator is useful when you want to:

- Restrict a value to only valid property names of an object
- Create type-safe functions that work with object properties
- Build reusable utility types

## How It Works

Think of `keyof` as asking: "What are all the possible keys I can use to access this object?" TypeScript gives you back a union of all those key names.

## Examples

### Basic Example

```typescript
interface User {
  name: string;
  age: number;
  location: string;
}

// keyof User = "name" | "age" | "location"
type UserKeys = keyof User;

// Only these values are allowed
const key1: UserKeys = 'name'; // ✅ Valid
const key2: UserKeys = 'age'; // ✅ Valid
const key3: UserKeys = 'email'; // ❌ Error: not a valid key
```

### Practical Example: Type-Safe Property Access

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
}

// A function that safely gets a property from an object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const laptop: Product = { id: 1, title: 'MacBook', price: 999 };

// TypeScript knows the return type!
const title = getProperty(laptop, 'title'); // type: string
const price = getProperty(laptop, 'price'); // type: number

// This would cause an error
getProperty(laptop, 'color'); // ❌ Error: 'color' is not a key of Product
```

## Common Mistakes to Avoid

- **Using `keyof` on a value instead of a type**: `keyof` works on types, not values. Use `keyof typeof myObject` for values.
- **Forgetting that `keyof` returns string literal types**: The result is `"name" | "age"`, not `string`.

## Related Concepts

- **Mapped Types**: Use `keyof` to iterate over object keys
- **Index Access Types**: Use `T[K]` to get the type of a property

Learn more from the following links:

- [@official@keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content)
