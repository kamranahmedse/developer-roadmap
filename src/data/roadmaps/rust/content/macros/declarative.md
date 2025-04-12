# Declarative Macros with macro_rules!

Rust supports two types of macros, one of which is known as "declarative macros" (or simply `macro_rules!`). Declarative macros in Rust allow you to define reusable chunks of code that have some variable parts, without having to write a full function or type out the same code every time. They work a lot like functions, except they operate at the syntax level rather than the semantics. The compiler expands declarative macros at compile-time, in essence, taking the code they define and “pasting” it directly into your source code. They are defined using the `macro_rules!` keyword, followed by a name and a block of code. The name is used to invoke the macro later in your code, and the block of code is the code that will get inserted every time the macro is used.

Visit the following resources to learn more:

- [@article@Rust Book: Macros](https://doc.rust-lang.org/book/ch19-06-macros.html)
- [@article@Macros by Example](https://doc.rust-lang.org/reference/macros-by-example.html)
