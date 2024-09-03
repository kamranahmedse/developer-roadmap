# Recursive Types

Recursive types in TypeScript are a way to define a type that references itself. Recursive types are used to define complex data structures, such as trees or linked lists, where a value can contain one or more values of the same type.

For example, the following is a recursive type that represents a linked list:

```typescript
type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};

let list: LinkedList<number> = {
  value: 1,
  next: { value: 2, next: { value: 3, next: null } },
};
```

In this example, the `LinkedList` type is defined as a type that extends `T` and contains a property `next` of the same type `LinkedList<T>`. This allows us to create a linked list where each node contains a value of type `T` and a reference to the next node in the list.

Learn more from the following links:

- [@official@Recursive Types in TypeScript](https://www.typescriptlang.org/play/3-7/types-and-code-flow/recursive-type-references.ts.html)
