# Combining Types

In TypeScript, you can combine types using type union and type intersection.

Type Union:
The union operator `|` is used to combine two or more types into a single type that represents all the possible types. For example:

    ```
    type stringOrNumber = string | number;
    let value: stringOrNumber = "hello";
    value = 42;
    ```

Type Intersection:
The intersection operator `&` is used to intersect two or more types into a single type that represents the properties of all the types. For example:

    ```
    interface A {
    a: string;
    }
    interface B {
    b: number;
    }
    type AB = A & B;
    let value: AB = { a: "hello", b: 42 };
    ```

Learn more from the following links:

- [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html#handbook-content)
- [Typescript - Combining Types with Generic](https://www.youtube.com/watch?v=Z3g8dVFsuMM)