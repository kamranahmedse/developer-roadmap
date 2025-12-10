# Utility Types

Utility types are special built-in TypeScript tools that let you transform and reuse existing types without writing a lot of repetitive code.

## Why Use Utility Types?

When working with types, you'll often need to create variations of existing types. Instead of rewriting the entire type, utility types let you create new types by modifying existing ones. This saves time and makes your code more maintainable.

## Common Utility Types

Here are the most useful ones:

- **`Partial<Type>`**: Makes all properties optional (you can provide some or all properties)
- **`Readonly<Type>`**: Makes all properties read-only (can't be changed after creation)
- **`Pick<Type, Keys>`**: Selects only specific properties from a type
- **`Omit<Type, Keys>`**: Removes specific properties from a type
- **`Exclude<UnionType, Members>`**: Removes specific types from a union
- **`Record<Keys, Type>`**: Creates an object type with specific keys and values

## Real-World Example

Imagine you have a `User` type with many properties, but for an update function, you only want some of them to be optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

// Instead of redefining the type, use utility types:
type UpdateableUser = Partial<Pick<User, 'name' | 'email' | 'age'>>;

// Now users can update only these three fields, and all are optional
```

Each utility type is explained in detail in its own section. Pick the one that solves your specific problem.

## Learn More

- [@official@TypeScript - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [@article@TypeScript Utility Types Guide](https://camchenry.com/blog/typescript-utility-types)
