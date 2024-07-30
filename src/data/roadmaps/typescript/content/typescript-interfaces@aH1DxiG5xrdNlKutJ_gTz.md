# Interfaces

Interfaces in TypeScript provide a way to define a contract for a type, which includes a set of properties, methods, and events. It's used to enforce a structure for an object, class, or function argument. Interfaces are not transpiled to JavaScript and are only used by TypeScript at compile-time for type-checking purposes.

Here's an example of defining and using an interface in TypeScript:

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John Doe',
  age: 30,
};
```

In this example, the `User` interface defines the structure of the `user` object with two properties, `name` and `age`. The object is then typed as User using a type-assertion: `User`.

Learn more from the following links:

- [@article@TypeScript - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
