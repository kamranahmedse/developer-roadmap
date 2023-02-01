# Extract

Extract constructs a type by extracting from Type all union members that are assignable to Union.

    ```
    type T0 = Extract<"a" | "b" | "c", "a" | "f">;
        
    type T0 = "a"
    type T1 = Extract<string | number | (() => void), Function>;
        
    type T1 = () => void
    ```

Learn more from the following links:

- [Extract<Type, Union>](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)