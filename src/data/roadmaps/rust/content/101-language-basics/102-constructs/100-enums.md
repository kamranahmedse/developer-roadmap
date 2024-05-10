# Enums

Enums, short for enumerations, allow you to define a type by enumerating its possible variants. An instance of an enum type could be any one of these variants, and in Rust, enums are incredibly versatile. Unlike enumerations in some other languages, these variants aren't restricted to a singular data type. You can attach data to each variant of the enum, and the data could have different types and amounts for each variant. It's also possible to embed structs and even other enums. Enums in Rust also enable pattern-matching, which allows you to compare a value to a series of patterns, handle it if it matches one of them, and execute code based on which pattern has been matched.
Enums are data structures that represent a data type with more than one variant. We can use the enums variants in our operations, we can only use the base enum for specifying that we will either return a variant from a function or assign it to a variable.

Example of enum:

```Rust
enum Vehicle {
  Car,
  MotorCycle,
  Bicycle,
}
```
