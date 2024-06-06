# Unknown

`unknown` is the type-safe counterpart of any. Anything is assignable to `unknown`, but `unknown` isn’t assignable to anything but itself and `any` without a type assertion or a control flow based narrowing. Likewise, no operations are permitted on an `unknown` without first asserting or narrowing to a more specific type.

```typescript
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  // Error: Property 'b' does not exist on type 'unknown'.
  a.b();
}
```

Learn more from the following links:

- [@article@Unknown Type in TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
