# Generics

Generics in TypeScript are a way to write code that can work with multiple data types, instead of being limited to a single data type. Generics allow you to write functions, classes, and interfaces that take one or more type parameters, which act as placeholders for the actual data types that will be used when the function, class, or interface is used.

For example, the following is a generic function that takes a single argument of any data type and returns the same data type:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('Hello'); // type of output will be 'string'
```

In this example, the `identity` function takes a single argument of any data type and returns the same data type. The actual data type is specified when the function is called by using `<string>` before the argument `"Hello"`.

Learn more from the following resources:

- [@official@Hello World of Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics)
