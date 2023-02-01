# Undefined

In TypeScript, undefined is a built-in type that represents the absence of a value. It can be assigned to variables, properties, or function return values when there is no meaningful value to return.

For example:

    ```
    let x: undefined;
    x = undefined; // valid
    x = null; // not valid

    function doSomething(): undefined {
    // ...
    return undefined;
    }
    ```

Learn more from the following links:

- [null and undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)