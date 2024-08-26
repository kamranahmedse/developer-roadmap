# Generic Types

Generic types in TypeScript allow you to write objects, functions and classes that work with multiple data types, instead of being limited to a single data type. A generic type is defined using angle brackets `<T>` and can be used as a placeholder for a specific data type. The actual data type is specified when the function or class is used.

For example, the following is a generic function that takes a single argument of any data type and returns the same data type:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('Hello'); // type of output will be 'string'
```

In this example, the `identity` function takes a single argument of any data type and returns the same data type. The actual data type is specified when the function is called by using `<string>` before the argument `Hello`.

Generics can also be used with classes, interfaces, and object types, allowing them to work with multiple data types as well.

For example:

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

Learn more from the following resources:

- [@article@Hello World of Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics)
