# As Const

`as const` is a type assertion in TypeScript that allows you to assert that an expression has a specific type, and that its value should be treated as a read-only value.

For example:

```typescript
const colors = ['red', 'green', 'blue'] as const;

// colors is now of type readonly ['red', 'green', 'blue']
```

Using as const allows TypeScript to infer more accurate types for constants, which can lead to improved type checking and better type inference in your code.

Learn more from the following links:

- [@official@const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
