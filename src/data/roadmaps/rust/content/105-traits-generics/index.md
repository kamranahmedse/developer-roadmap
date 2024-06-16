# Traits and Generics

Traits generics are a notable feature in Rust that pertain to defining shared behavior across data types. With them, you can specify placeholder types in trait definitions, letting you abstract over a range of possibilities. They're a means for defining shared behavior -- abstracting over functionality that types can have in common. You can apply traits to generics to constrain the types passed to the generic, hence permitting trait methods to be called on those types. You identify a generic parameter's type by the trait it implements, making it possible to use generic types in the trait methods. In essence, Rust achieves polymorphism through utilizing traits on generics.

Visit the following resources to learn more:

- [@article@Book: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html)
