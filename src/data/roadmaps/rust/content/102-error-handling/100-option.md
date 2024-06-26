# Option & Result Enumerations

`Option` is an enumeration, also known as an `enum`, in Rust with two variants: `Some(T)` and `None`. It is a flexible and safe alternative to using `null` values or exceptions for indicating that a value might not be present. If a function may not return a value for all possible input, it should return an `Option` value. `Some(T)` variant contains the valid value of type `T` and `None` variant indicates the absence of a value. You can perform various operations on `Option` values, such as method chaining and pattern matching, to effectively handle both states (value present or absent). The `Option` enum encourages you to consciously deal with the possibility of missing values and helps prevent unforeseen runtime errors.

Visit the following resources to learn more:

- [@article@Rust by Example: Option & unwrap](https://doc.rust-lang.org/rust-by-example/error/option_unwrap.html)
- [@article@Rust by Example: Result](https://doc.rust-lang.org/rust-by-example/error/result.html)
