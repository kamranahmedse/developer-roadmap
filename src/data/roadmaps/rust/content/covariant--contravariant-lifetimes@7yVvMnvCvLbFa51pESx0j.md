# Covariant and Contravariant Lifetimes

Variance describes how subtyping relationships change when types are nested. Covariant types preserve ordering (`&'long T` is subtype of `&'short T`), contravariant reverses it, invariant requires exact matches. Affects how lifetimes work with references, boxes, and function parameters.

Learn more from the following links:

- [@official@Subtyping and Variance](https://doc.rust-lang.org/nomicon/subtyping.html)
- [@article@Demystifying Covariant and Contravariant Lifetimes in Rust](https://medium.com/@murataslan1/demystifying-covariant-and-contravariant-lifetimes-in-rust-76051484fe1c)
