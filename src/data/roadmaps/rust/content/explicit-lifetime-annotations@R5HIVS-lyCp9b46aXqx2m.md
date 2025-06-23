# Explicit Lifetime Annotations

Explicit lifetime annotations use syntax like `'a` to specify relationships between reference lifetimes in function signatures. Required when the compiler can't infer lifetimes automatically. Example: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` ensures all references live equally long.

Learn more from the following resources:

- [@official@Explicit Annotation](https://doc.rust-lang.org/rust-by-example/scope/lifetime/explicit.html)
- [@article@What are Lifetimes in Rust? Explained with Code Examples](https://www.freecodecamp.org/news/what-are-lifetimes-in-rust-explained-with-code-examples/)