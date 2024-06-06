# Dependency Management with Cargo.toml

Dependency management in Rust is handled by a tool called Cargo. Cargo helps you manage your Rust projects, providing functionalities for building your code, downloading the libraries your project depends on, and building those libraries. These libraries are called _crates_. A crate is a package of Rust code. In your `Cargo.toml`, you list your dependencies in a [dependencies] section. You list libraries from crates.io by their name and version number. Cargo understands Semantic Versioning, a standard for writing version numbers.

Visit the following resources to learn more:

- [@article@Rust Blog: Cargo](https://blog.rust-lang.org/2016/05/05/cargo-pillars.html)
- [@article@Rust by Example: Dependencies](https://doc.rust-lang.org/rust-by-example/cargo/deps.html)
