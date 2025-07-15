# Traits

Traits in Rust define behaviors that are shared among different data types. Implementing traits for data types is a great way to group method signatures together and define a set of behaviors your types require. Essentially, anything with a certain `trait` applied to it will "inherit" the behavior of that trait's methods, but this is not the same thing as inheritance found in object-oriented programming languages.

Traits are abstract; it's not possible to create instances of traits. However, we can define pointers of trait types, and these can hold any data type that implements the `trait`. A `trait` is **implemented** for something else with the syntax `impl TraitAbc for Xyz {...}`, which can be a concrete type or another trait.

Visit the following resources to learn more:

- [@article@Traits: Defining Shared Behaviour](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [@article@Understanding Traits and Trait Bounds in Rust](https://leapcell.medium.com/understanding-traits-and-trait-bounds-in-rust-d575f19dd649)
