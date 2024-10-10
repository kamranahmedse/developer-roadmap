# void

`void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any `return` statements, or doesn’t return any explicit value from those return statements:

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

In JavaScript, a function that doesn’t return any value will implicitly return the value `undefined`. However, `void` and `undefined` are not the same thing in TypeScript. There are further details at the end of this chapter.

Learn more from the following links:

- [@official@void - TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)
