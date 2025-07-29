# Empty Interface

The empty interface `interface{}` can hold values of any type since every type implements at least zero methods. Used for generic programming before Go 1.18 generics. Requires type assertions or type switches to access underlying values. Common in APIs handling unknown data types.