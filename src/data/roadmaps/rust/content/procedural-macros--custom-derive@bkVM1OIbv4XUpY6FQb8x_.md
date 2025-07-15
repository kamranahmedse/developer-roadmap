# Procedural Macros and Custom Derive

Procedural macros operate on token streams at compile time, generating new code. Three types exist: custom derive (for `#[derive(MyTrait)]`), attribute-like (`#[my_attr]`), and function-like (`my_macro!()`). More powerful than declarative macros but require separate crates with special configuration.

Visit the following resources to learn more:

- [@official@Procedural Macros](https://doc.rust-lang.org/reference/procedural-macros.html)
- [@article@Understanding Procedural Macros and Custom Derive](https://www.gyata.ai/rust/procedural-macros-and-custom-derive)