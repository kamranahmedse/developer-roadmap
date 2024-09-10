# Extract

Extract constructs a type by extracting from Type all union members that are assignable to Union.

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
//    ^ = type T0 = "a"
```

Learn more from the following links:

- [@official@Extract<Type, Union>](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)
