# Impl Blocks

Impl blocks use the `impl` keyword, and are used to **implement** behavior in the form of **methods** for a `struct`, `enum`, or `trait`. If you want your data type or trait to have methods, you need a corresponding `impl` block containing functions for the type or trait.

Note that `self` and `Self` have different meanings in the context of an `impl` block's functions. `self` represents the specific value in your program that's calling the method and passing itself as an argument, while `Self` is syntax sugar for the `impl` block's data type, which is commonly used in constructor methods that return a new instance of the type.

Visit the following resources to learn more:

- [@official@Keyword impl](https://doc.rust-lang.org/std/keyword.impl.html)
- [@article@Method Syntax](https://rust-book.cs.brown.edu/ch05-03-method-syntax.html)
- [@article@Rust: Understanding Structs and impl Blocks with 10 Examples](https://medium.com/@TechSavvyScribe/rust-understanding-structs-and-impl-blocks-with-10-examples-20371f90b1ed)