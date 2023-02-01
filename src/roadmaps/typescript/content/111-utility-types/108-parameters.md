# Parameters

Parameters constructs a tuple type from the types used in the parameters of a function type Type.

    ```
    declare function f1(arg: { a: number; b: string }): void; 
    type T0 = Parameters<() => string>;
    type T0 = []
    type T1 = Parameters<(s: string) => void>;
    type T1 = [s: string]
    type T2 = Parameters<<T>(arg: T) => T>;
    type T2 = [arg: unknown]
    type T3 = Parameters<typeof f1>;
        
    type T3 = [arg: {
        a: number;
        b: string;
    }]
    type T4 = Parameters<any>;
        
    type T4 = unknown[]
    type T5 = Parameters<never>;
        
    type T5 = never
    type T6 = Parameters<string>;
    Type 'string' does not satisfy the constraint '(...args: any) => any'.
        
    type T6 = never
    type T7 = Parameters<Function>;
    Type 'Function' does not satisfy the constraint '(...args: any) => any'.
    Type 'Function' provides no match for the signature '(...args: any): any'.
        
    type T7 = never
    ```

Learn more from the following links:

- [Parameters<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)