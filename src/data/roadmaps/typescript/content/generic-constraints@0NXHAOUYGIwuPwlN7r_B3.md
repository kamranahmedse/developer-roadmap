# Generic Constraints

Generic constraints in TypeScript allow you to specify the requirements for the type parameters used in a generic type. These constraints ensure that the type parameter used in a generic type meets certain requirements.

Constraints are specified using the `extends` keyword, followed by the type that the type parameter must extend or implement.

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  // Now we know it has a .length property, so no more error
  console.log(arg.length);

  return arg;
}

loggingIdentity(3); // Error, number doesn't have a .length property
loggingIdentity({ length: 10, value: 3 }); // OK
```

In this example, the `Lengthwise` interface defines a `length` property. The `loggingIdentity` function uses a generic type parameter `T` that is constrained by the `Lengthwise` interface, meaning that the type parameter must extend or implement the `Lengthwise` interface. This constraint ensures that the length property is available on the argument passed to the `loggingIdentity` function.

Learn more from the following resources:

- [@official@Generic Constraints - TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
