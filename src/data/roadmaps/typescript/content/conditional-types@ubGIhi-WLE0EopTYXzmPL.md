# Conditional Types

Conditional types in TypeScript are a way to select a type based on a condition. They allow you to write a type that dynamically chooses a type based on the types of its inputs. Conditional types are declared using a combination of the `infer` keyword and a type that tests a condition and selects a type based on the result of the test.

For example, the following is a conditional type that takes two types and returns the type of the first argument if it extends the second argument, and the type of the second argument otherwise:

```typescript
type Extends<T, U> = T extends U ? T : U;

type A = Extends<string, any>; // type A is 'string'
type B = Extends<any, string>; // type B is 'string'
```

In this example, the Extends conditional type takes two types T and U and returns the type of the first argument `T` if it extends the second argument `U`, and the type of the second argument `U` otherwise. The T extends `U` syntax is used to test whether `T extends U`, and the `? T : U` syntax is used to select the type `T` if the test passes and the type `U` otherwise.

Learn more from the following links:

- [@article@Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#handbook-content)
- [@video@Conditional Types - Advanced TypeScript](https://www.youtube.com/watch?v=QFWrbNehKk0)
