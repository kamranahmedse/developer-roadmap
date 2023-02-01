# Types vs Interfaces

In TypeScript, both types and interfaces can be used to define the structure of objects and enforce type checks. However, there are some differences between the two.

Types are used to create a new named type based on an existing type or to combine existing types into a new type. They can be created using the type keyword. For example:

    ```
    type Person = {
    name: string;
    age: number;
    };

    const person: Person = {
    name: "John Doe",
    age: 30
    };
    ```

Interfaces, on the other hand, are used to describe the structure of objects and classes. They can be created using the interface keyword. For example:

    ```
    interface Person {
    name: string;
    age: number;
    }

    const person: Person = {
    name: "John Doe",
    age: 30
    };
    ```

Learn more from the following links:

- [Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases)
- [Interfaces vs Types in TypeScript](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)