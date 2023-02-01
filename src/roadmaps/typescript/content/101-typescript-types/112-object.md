# Object

To define an object type, we simply list its properties and their types.

For example, here’s a function that takes a point-like object:

    ```
    // The parameter's type annotation is an object type
    function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
    }
    printCoord({ x: 3, y: 7 });
    ```

Learn more from the following links:

- [Number, String, Boolean, Symbol and Object](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#number-string-boolean-symbol-and-object)
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)