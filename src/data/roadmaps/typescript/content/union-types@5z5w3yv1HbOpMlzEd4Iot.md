# Union Types

Union Types in TypeScript allow you to specify multiple possible types for a single variable or parameter. A union type is written as a vertical bar `|` separated list of types.

For example, consider a function that takes either a string or a number as an argument:

```typescript
function combine(input1: string | number, input2: string | number) {
  return input1 + input2;
}
```

Learn more from the following links:

- [@article@Union Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
