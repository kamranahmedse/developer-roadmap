# Enums

**Enums** — short for enumerations — allow you to define a type by enumerating (listing out one-by-one) all of its possible variants. An instance of an enum type could be any one of the enum's variants, making enums incredibly versatile. Unlike enumerations in some other languages, in Rust, these variants are not restricted to a singular data type. For each variant of the enum, you can choose to embed data, and each variant of the enum can hold data of completely different types and amounts. It's also possible to embed structs and even other enums in a variant.

Enums in Rust are one way to enable pattern matching, which allows you to compare the interior structure of a value to a series of patterns using a `match` block (or a single pattern using an `if let` block). For example, you can execute different branches of code based on which variant of an enum is present within the value being matched. You can also reference whatever data might be embedded within that instance of the enum variant.

Learn more from the following links:

- [@article@Defining an Enum](https://rust-book.cs.brown.edu/ch06-01-defining-an-enum.html)
