# Custom Error Types and Traits

In Rust, you can define your own types of errors using the `enum` construct. This gives you the ability to specify different types of errors that your code can encounter, and attach additional information to them. To make your custom error type compatible with the rest of Rust's error handling machinery, you need to implement two traits: `std::fmt::Debug` and `std::fmt::Display`. There is also a third trait, `std::error::Error`, which can provide backtraces and the ability to have chained errors or causes. Furthermore, the `thiserror` library provides a convenient way to define custom error types with a simple annotation.

Visit the following resources to learn more:

- [@article@Rust by Example: Defining an error type](https://doc.rust-lang.org/rust-by-example/error/multiple_error_types/define_error_type.html)
