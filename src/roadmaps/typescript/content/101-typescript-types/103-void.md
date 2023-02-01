# Void

Void is used where there is no data. For example, if a function does not return any value then you can specify void as return type.

Example: 

    ```
    function sayHi(): void { 
        console.log('Hi!')
    } 

    let speech: void = sayHi(); 
    console.log(speech); //Output: undefined
    ```

Learn more from the following links:

- [void](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)