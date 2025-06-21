# Custom Error Types and Traits

Custom error types use `enum` to define specific error variants with attached data. Implement `Debug`, `Display`, and optionally `std::error::Error` traits for proper error handling integration. Libraries like `thiserror` provide derive macros to simplify custom error creation and formatting.

Visit the following resources to learn more:

- [@official@Defining an Error Type](https://doc.rust-lang.org/rust-by-example/error/multiple_error_types/define_error_type.html)
