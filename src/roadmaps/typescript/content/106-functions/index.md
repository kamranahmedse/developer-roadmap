# Functions

Functions are a core building block in TypeScript. Functions allow you to wrap a piece of code and reuse it multiple times. Functions in TypeScript can be either declared using function declaration syntax or function expression syntax.

1. Function Declaration Syntax:

    ```
    function name(param1: type1, param2: type2, ...): returnType {
    // function body
    return value;
    }
    ```

2. Function Expression Syntax:

    ```
    let name: (param1: type1, param2: type2, ...) => returnType =
    function(param1: type1, param2: type2, ...): returnType {
        // function body
        return value;
    };
    ```

For example:

    ```
    function add(a: number, b: number): number {
    return a + b;
    }    
    let result = add(1, 2);
    console.log(result);    // 3
    ```

Learn more from the following links:

- [Functions](https://www.typescriptlang.org/docs/handbook/functions.html)
- [TypeScript Functions](https://www.w3schools.com/typescript/typescript_functions.php)
- [TypeScript - functions](youtube.com/watch?v=mblaKPWM9NU)