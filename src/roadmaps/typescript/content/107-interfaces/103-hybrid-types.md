# Hybrid Types

In TypeScript, a hybrid type is a type that combines multiple types into a single type. The resulting type is considered a union of those types. This allows you to specify that a value can have multiple types, rather than just one.

For example, you can create a hybrid type that can accept either a string or a number:

    ```
    type StringOrNumber = string | number;
    ```

Now, a value of type StringOrNumber can be either a string or a number:

    ```
    let value: StringOrNumber = 'Hello, world!';
    value = 42;
    ```

You can also use hybrid types to create more complex types that can represent a combination of several different types of values.

Learn more from the following links:

- [TypeScript - Interface Hybrid Types](https://www.logicbig.com/tutorials/misc/typescript/interface-hybrid-types.html)
- [What is Hybrid types in typescript?](https://www.youtube.com/watch?v=eYAq1A4BsuI)