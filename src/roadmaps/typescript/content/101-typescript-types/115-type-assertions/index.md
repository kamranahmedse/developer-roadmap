# Type Assertions

Type assertions in TypeScript are a way to tell the compiler to treat a value as a specific type, regardless of its inferred type.

There are two syntaxes for type assertions in TypeScript:

1. The "angle-bracket" syntax: `<T>value`
2. The "as" syntax: value as `T`

For example:

    ```
    let num = 42;

    // using angle-bracket syntax
    let str = <string>num;

    // using as syntax
    let str2 = num as string;
    ```

In both examples, `num` is a number, but the type assertions tell the compiler to treat the value as a string.

Learn more from the following links:

- [Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)