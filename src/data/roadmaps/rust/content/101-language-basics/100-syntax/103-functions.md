# Functions and Method Syntax

In Rust, functions are declared using the `fn` keyword. Each function takes a set of input variables with their specified types and may optionally return a type. The body of the function is contained within curly braces `{}`. Unlike other languages, in Rust you don't need to end the statement with a semicolon if it’s the last one in a block, making it the implicit return. If we want to return a value, we simply write the expression we want to return. An example of a function in Rust is `fn add(one: i32, two: i32) -> i32 { one + two }` where `one` and `two` are parameters of type `i32` and the function returns an integer of type `i32`.

Learn more from the following links:

- [@article@Functions](https://rust-book.cs.brown.edu/ch03-03-how-functions-work.html)