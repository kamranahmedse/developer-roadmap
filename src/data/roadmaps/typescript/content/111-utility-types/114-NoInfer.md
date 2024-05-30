# NoInfer Utility Type in TypeScript

## What is `NoInfer`?

The `NoInfer` utility type in TypeScript is used to prevent TypeScript from inferring a type in specific contexts. It is particularly useful when you want to enforce a specific type and avoid any automatic type inference by the compiler.

## Syntax

```typescript
NoInfer<T>
```

- **T**: The type that you want to prevent from being inferred.

## Why Use `NoInfer`?

TypeScript often tries to infer types to make coding easier and more flexible. However, there are scenarios where you might want to stop this inference to ensure that a specific type is used. This is where `NoInfer` comes into play.

## How Does `NoInfer` Work?

The `NoInfer` utility type effectively "locks in" a type, preventing the compiler from inferring any other type. This can be useful in generics, function arguments, or when working with complex type transformations.

## Example Usage

### Basic Example

Let's consider a simple example to see how `NoInfer` works:

```typescript
function processItem<T>(item: NoInfer<T>, defaultValue: T): T {
  return item ?? defaultValue;
}

// Using the function
let result1 = processItem<number>(undefined, 42); // result1 is 42
let result2 = processItem<string>("Hello", "World"); // result2 is "Hello"
```

In this example:
- The `processItem` function takes an item and a default value of type `T`.
- By using `NoInfer<T>` for the `item` parameter, we ensure that `item` must explicitly be of type `T`, preventing TypeScript from inferring any other type.
- This makes the function safer and more predictable, as it enforces the specified type.

### Advanced Example

Let's see a more complex example where `NoInfer` helps in maintaining type safety in generics:

```typescript
type Pair<T> = [T, T];

function createPair<T>(first: NoInfer<T>, second: T): Pair<T> {
  return [first, second];
}

// Using the function
let numberPair = createPair(1, 2); // numberPair is [1, 2]
let stringPair = createPair("hello", "world"); // stringPair is ["hello", "world"]

// Type mismatch example
let mixedPair = createPair<number>("hello", 2); // Error: Argument of type 'string' is not assignable to parameter of type 'NoInfer<number>'.
```

In this example:
- The `createPair` function creates a tuple (pair) of the same type `T`.
- By using `NoInfer<T>` for the `first` parameter, we prevent the compiler from inferring a different type for `first`, ensuring both `first` and `second` are of the same type.

## When to Use `NoInfer`?

`NoInfer` is particularly useful in scenarios like:
- **Generic Functions**: When you want to enforce a specific type in a generic function and prevent type inference.
- **Type Safety**: Ensuring that certain parts of your code strictly adhere to a specified type.
- **Complex Type Transformations**: When working with advanced type transformations where type inference can lead to unexpected results.

## Conclusion

The `NoInfer` utility type in TypeScript is a powerful tool to control and enforce type safety by preventing automatic type inference. It is particularly useful in generic programming and scenarios where maintaining strict type control is necessary.

For more details, check out the [TypeScript Handbook on Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).
