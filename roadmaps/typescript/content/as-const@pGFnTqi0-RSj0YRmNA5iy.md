# as const

`as const` is a TypeScript feature that allows you to tell the compiler to infer the narrowest or most specific type possible for an expression. Instead of the compiler widening the type of a value to its general type (like inferring a string variable as `string`), `as const` makes the compiler infer the value as a constant type (like inferring a string variable as the specific string literal type `"hello"`). This is useful for creating immutable data structures or when you need the compiler to enforce the exact values allowed.

Visit the following resources to learn more:

- [@official@const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)