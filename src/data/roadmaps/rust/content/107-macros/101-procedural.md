# Procedural Macros and Custom Derive

Procedural macros in Rust allow you to define functions, or procedures, that operate on code at compile time. The input to these macros is a stream of tokens from the program text, and the output is a new stream of tokens that replace the macro invocation. They are defined in their own crates with a special crate type. There are three kinds of procedural macros: custom derive, attribute-like macros, and function-like macros. Custom derive macros let you define new behavior for the `derive` attribute. Attribute-like macros are invoked as item attributes, for example `#[foo(…)]`, and can be applied to any item that accepts attributes. Function-like macros look like function calls, but work with arbitrary tokens as input.

Visit the following resources to learn more:

- [@article@Procedural Macros](https://doc.rust-lang.org/reference/procedural-macros.html)
