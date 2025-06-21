# Lifetime Elision Rules

Lifetime elision allows the compiler to infer lifetimes in common patterns, reducing explicit annotations. Rules: each reference parameter gets its own lifetime, single input lifetime applies to all outputs, methods with `&self` propagate its lifetime to outputs. Simplifies code while maintaining safety.

Visit the following resources to learn more:

- [@official@Lifetime Elision](https://doc.rust-lang.org/reference/lifetime-elision.html)
- [@article@Understanding Lifetime Elision in Rust](https://masteringbackend.com/posts/understanding-lifetime-elision-in-rust)
