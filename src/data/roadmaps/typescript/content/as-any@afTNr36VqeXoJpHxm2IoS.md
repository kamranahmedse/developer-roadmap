# As Any

`any` is a special type in TypeScript that represents a value of any type. When a value is declared with the any type, the compiler will not perform any type checks or type inference on that value.

For example:

```typescript
let anyValue: any = 42;

// we can assign any value to anyValue, regardless of its type
anyValue = 'Hello, world!';
anyValue = true;
```

Learn more from the following links:

- [@official@Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any)
