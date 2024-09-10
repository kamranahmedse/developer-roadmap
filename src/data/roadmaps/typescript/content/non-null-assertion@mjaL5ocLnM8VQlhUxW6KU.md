# Non Null Assertion

The non-null assertion operator (!) is a type assertion in TypeScript that allows you to tell the compiler that a value will never be null or undefined.

```typescript
let name: string | null = null;

// we use the non-null assertion operator to tell the compiler that name will never be null
let nameLength = name!.length;
```

The non-null assertion operator is used to assert that a value is not null or undefined, and to tell the compiler to treat the value as non-nullable. However, it's important to be careful when using the non-null assertion operator, as it can lead to runtime errors if the value is actually `null` or `undefined`.

Learn more from the following links:

- [@official@Non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
