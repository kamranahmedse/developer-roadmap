# Enums

An enum, short for enumeration, is a custom data type that allows you to define a type by enumerating (listing out one-by-one) all of its possible variants. In Rust, if something is one of a given set of possibilities (e.g., `Rock` or `Paper` or `Scissors`), it's probably appropriate to represent that data with an enum, like so: `enum RpsChoice { Rock, Paper, Scissors }`.

An instance of an `enum` can be one and only one of the enum's declared variants at any given time. Unlike enumerations in some other languages, variants in Rust are not restricted to a singular data type. When you define an `enum`, you can decide for each of its possible variants whether or not that variant will hold additional embedded data; each variant of the enum is also allowed to hold data of completely different types and amounts.

Learn more from the following resources:

- [@official@Defining an Enum](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)
- [@article@Understanding and Implementing Enums in Rust](https://towardsdev.com/understanding-and-implementing-enums-in-rust-6eae37b6b5e3)