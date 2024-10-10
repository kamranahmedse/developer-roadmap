# Awaited

This type is meant to model operations like await in async functions, or the `.then()` method on Promises - specifically, the way that they recursively unwrap Promises.

```typescript
type A = Awaited<Promise<string>>;
// type A = string

type B = Awaited<Promise<Promise<number>>>;
// type B = number

type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean
```

Learn more from the following links:

- [@official@Awaited`<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)
