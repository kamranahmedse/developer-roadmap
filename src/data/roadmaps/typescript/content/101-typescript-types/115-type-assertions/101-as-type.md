# As Type

as is a type assertion in TypeScript that allows you to tell the compiler to treat a value as a specific type, regardless of its inferred type.

For example:

```typescript
let num = 42;
let str = num as string;

// str is now of type string, even though num is a number
```

It's important to note that type assertions do not change the runtime type of a value, and do not cause any type of conversion. They simply provide a way for the programmer to override the type inference performed by the compiler.

- [Type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

--- correction -----
In your example, you are attempting to use the as operator to assert that num is of type string. However, TypeScript won't allow such an assertion because it knows that num is of type number based on the assignment.

Here's a corrected example:
let num: number = 42;
let str: string = num.toString(); // using toString() to convert number to string

console.log(str); // Outputs: "42"
