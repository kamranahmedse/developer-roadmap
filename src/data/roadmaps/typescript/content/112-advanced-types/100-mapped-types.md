# Mapped Types

Mapped types in TypeScript are a way to create a new type based on an existing type, where each property of the existing type is transformed in some way. Mapped types are declared using a combination of the `keyof` operator and a type that maps each property of the existing type to a new property type.

For example, the following is a mapped type that takes an object type and creates a new type with all properties of the original type but with their type changed to `readonly`:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

let obj = { x: 10, y: 20 };
let readonlyObj: Readonly<typeof obj> = obj;
```

In this example, the `Readonly` mapped type takes an object type `T` and creates a new type with all properties of `T` but with their type changed to `readonly`. The keyof `T` operator is used to extract the names of the properties of `T`, and the `T[P]` syntax is used to access the type of each property of `T`. The `readonly` keyword is used to make the properties of the new type `readonly`.

Learn more from the following links:

- [@article@Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#handbook-content)
