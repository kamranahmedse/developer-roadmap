# Call by Value

Go creates copies of values when passing to functions, not references to originals. Applies to all types including structs and arrays. Provides safety but can be expensive for large data. Use pointers, slices, maps for references. Critical for performance optimization.