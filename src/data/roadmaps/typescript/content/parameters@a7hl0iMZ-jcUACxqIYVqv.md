# Parameters

Parameters constructs a tuple type from the types used in the parameters of a function type Type.

```typescript
type T0 = Parameters<() => string>;
// type T0 = []

type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
// type T2 = [arg: unknown]

declare function f1(arg: { a: number; b: string }): void;
type T3 = Parameters<typeof f1>;
// type T3 = [arg: {
//     a: number;
//     b: string;
// }]

type T4 = Parameters<any>;
// type T4 = unknown[]

type T5 = Parameters<never>;
// type T5 = never

type T6 = Parameters<string>;
// ^ Type 'string' does not satisfy the constraint '(...args: any) => any'.

type T7 = Parameters<Function>;
// ^ Type 'Function' does not satisfy the constraint '(...args: any) => any'.
```

Learn more from the following links:

- [@official@Parameters<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)
