# Type Conversion

Convert values between different types using `Type(value)` syntax. Go requires explicit conversion even between related types like `int` and `int64`. Essential for working with different data types and ensuring type compatibility in programs.

Key Points

*   **Implicit conversions** (automatic type coercion) are _not_ supported in Go—every type conversion must be performed explicitly.
    
*   You can **only convert between compatible types**. For instance, converting between different numeric types (e.g., int to float64) is allowed, but converting between completely unrelated types (like string to int) is not allowed directly and often requires a library or more complex handling.
    
*   **When is type conversion needed?**
    
    *   Assigning values between variables of different types
        
    *   Passing arguments to functions that require another type
        
    *   Performing operations between values of different numeric types
        
    *   Interfacing with APIs, JSON, or databases
        
*   For **complex types** (like slices, arrays, maps, and structs), you generally need to convert each element or field manually. There’s no direct automatic conversion for these types. For example, convert an \[\]int slice to \[\]float64 by iterating and converting each element.
