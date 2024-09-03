# Non Nullable

Non-Nullable constructs a type by excluding `null` and `undefined` from Type.

```typescript
type T0 = NonNullable<string | number | undefined>;
// type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>;
// type T1 = string[]
```

Learn more from the following links:

- [@official@NonNullable<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)
