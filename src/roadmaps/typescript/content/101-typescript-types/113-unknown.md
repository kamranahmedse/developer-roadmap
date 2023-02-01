# Unknown

The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:

    ```
    function f1(a: any) {
    a.b(); // OK
    }
    function f2(a: unknown) {
    a.b();
    Object is of type 'unknown'.
    }
    ```

This is useful when describing function types because you can describe functions that accept any value without having any values in your function body.

Learn more from the following links:

- [Unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)