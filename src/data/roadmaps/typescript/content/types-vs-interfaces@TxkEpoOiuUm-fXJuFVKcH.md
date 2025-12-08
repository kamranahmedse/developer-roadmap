# Types vs Interfaces

Both `type` and `interface` let you define the structure of objects. They're very similar, but they have some important differences.

## Quick Comparison

| Feature | Type | Interface |
|---------|------|-----------|
| **Define object structure** | ✅ Yes | ✅ Yes |
| **Extend/inherit** | Yes (with `&`) | Yes (with `extends`) |
| **Union types** | ✅ Yes | ❌ No |
| **Primitive types** | ✅ Yes | ❌ No |
| **Combine multiple** | Yes (with `&`) | Yes (with `extends`) |

## Types

Use `type` to create custom names for any kind of data. Types are more flexible.

```typescript
// Defining an object type
type Person = {
  name: string;
  age: number;
};

// Union type (types can do this, interfaces can't)
type ID = string | number;

// Primitive type (types can do this, interfaces can't)
type Age = number;

const person: Person = {
  name: 'John Doe',
  age: 30,
};
```

## Interfaces

Use `interface` to describe the structure of objects and classes.

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'John Doe',
  age: 30,
};
```

## When to Use Each

**Use `interface` when:**
- Describing the shape of objects
- Creating contracts for classes
- You want the code to feel more object-oriented

**Use `type` when:**
- You need union types (`string | number`)
- Working with primitive types
- You want maximum flexibility
- Combining multiple types together

## Practical Example: Why You Might Choose Type

```typescript
// Can't do this with interface—it needs union types
type ID = string | number;
type Status = 'active' | 'inactive';

interface User {
  id: ID;
  status: Status;
}
```

Learn more from the following links:

- [@official@Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [@article@Interfaces vs Types in TypeScript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)
