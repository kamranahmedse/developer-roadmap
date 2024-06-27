# Propagating Errors and `?` Operator

Propagating errors in Rust is about passing the error information from the function that failed to the function that called it. Using the `?` operator is one way to achieve this. This operator can only be used in functions that return `Result` or `Option` or another type that implements `std::ops::Try`. If the value of the `Result` is `Ok`, the value inside the `Ok` will get returned. If the value is `Err`, the `Err` will be returned from the whole function. Consequently, the error gets propagated to the calling function.

Visit the following resources to learn more:

- [@article@Rust Book: Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
