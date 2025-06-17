# Enums

An enum, short for enumeration, is a custom data type that allows you to define a type by enumerating (listing out one-by-one) all of its possible variants. In Rust, if something is one of a given set of possibilities (e.g., `Rock` or `Paper` or `Scissors`), it's probably appropriate to represent that data with an enum, like so: `enum RpsChoice { Rock, Paper, Scissors }`.

An instance of an `enum` can be one and only one of the enum's declared variants at any given time. Unlike enumerations in some other languages, variants in Rust are not restricted to a singular data type. When you define an `enum`, you can decide for each of its possible variants whether or not that variant will hold additional embedded data; each variant of the enum is also allowed to hold data of completely different types and amounts. You can even embed structs and other enums in a variant, making enums incredibly versatile.

Enums in Rust are one way to enable simple pattern matching for a value, which allows you to compare the interior structure of a value to a series of patterns using a `match` block. For example, you can execute different branches of code based on whether an `RpsChoice` value is `Rock`, `Paper`, or `Scissors` without a verbose tree of `if`/`else` blocks. You can also handle whatever data might be embedded within that instance of the enum variant, as you will do frequently with Rust's standard `Option<T>` and `Result<T, E>` enums.

Learn more from the following links:

- [@article@Defining an Enum](https://rust-book.cs.brown.edu/ch06-01-defining-an-enum.html)
