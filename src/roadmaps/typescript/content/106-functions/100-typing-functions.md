# Typing Functions

In TypeScript, functions can be typed in a few different ways to indicate the input parameters and return type of the function.

1. Function declaration with types:

    ```
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

2. Arrow function with types:

    ```
    const multiply = (a: number, b: number): number => {
        return a * b;
    };
    ```

3. Function type:

    ```
    let divide: (a: number, b: number) => number;
    divide = (a, b) => {
        return a / b;
    };
    ```

Learn more from the following links:

- [More on Functions](typescriptlang.org/docs/handbook/2/functions.html)
- [TypeScript Basics - Typing with functions](https://www.youtube.com/watch?v=do_8hnj45zg)