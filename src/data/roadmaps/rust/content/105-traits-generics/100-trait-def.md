# Trait Definitions and Implementations

A `trait` definition in Rust is a way to define a set of behaviors necessary for a certain type. It is essentially an interface that types can implement. The `trait` def is created using the `trait` keyword followed by its name and the set of methods it includes enclosed in curly brackets. These methods are defined under the trait with their signature but without their implementation. Once a trait is defined, it can be implemented for any data type. Note that the type that this trait applies to is represented by the keyword `Self`. For example, `trait GetName { fn get_name(&self) -> String; }` defines a trait `GetName` with a method `get_name`. This trait can then be implemented for any type that needs the behaviour `get_name`.

Visit the following resources to learn more:

- [@article@Rust by Example: Traits](https://doc.rust-lang.org/rust-by-example/trait.html)
