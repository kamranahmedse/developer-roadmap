# InstanceType

This type constructs a type consisting of the instance type of a constructor function in Type.

```typescript
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;
// type T0 = C

type T1 = InstanceType<any>;
// type T1 = any

type T2 = InstanceType<never>;
// type T2 = never

type T3 = InstanceType<string>;
// ^ Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.

type T4 = InstanceType<Function>;
// ^ Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
```

Learn more from the following links:

- [@official@InstanceType`<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
