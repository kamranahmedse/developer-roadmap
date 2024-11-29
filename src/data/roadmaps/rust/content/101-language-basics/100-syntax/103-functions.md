# Functions and Method Syntax

In Rust, functions are declared using the `fn` keyword. Each function can take a set of input variables with their specified types, and may return data of a specified type. The body of a function is contained within curly braces `{}`. Unlike other languages, in Rust, you don't need to end the last statement in a block with a semicolon; omitting the last semicolon of a block in this way turns the last statement into an expression, and the result of this expression becomes the implicit return value of the block. In other words, if we want to return a value, we simply write the expression we want to return.

An example of a function that returns implicitly in Rust is `fn add(one: i32, two: i32) -> i32 { one + two }`, where `one` and `two` are parameters of type `i32`. This function returns an integer of type `i32`, which is the result of `one + two`. Rust also has an explicit `return` keyword to exit a function with a given value, like so: `fn add(one: i32, two: i32) -> i32 { return one + two; }`. Using a `return` statement versus the implicit return syntax is mostly a matter of preference.

Learn more from the following links:

- [@article@Functions](https://rust-book.cs.brown.edu/ch03-03-how-functions-work.html)
