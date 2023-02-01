# Exclude

Exclude constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.

    ```
    type T0 = Exclude<"a" | "b" | "c", "a">;
        
    type T0 = "b" | "c"
    type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
        
    type T1 = "c"
    type T2 = Exclude<string | number | (() => void), Function>;
        
    type T2 = string | number
    ```

Learn more from the following links:

- [Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)