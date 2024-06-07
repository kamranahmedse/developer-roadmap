# Publishing on crates.io

Publishing in Rust involves packaging up your library or executable and making it available for others to use. To publish a crate, you'll need to create an account on [crates.io](https://crates.io/), the Rust package repository. If you haven't already, you'll need to format your project in a specific way, detailing needed information in a `Cargo.toml` file. Then, use the command `cargo publish` to upload your crate to the registry. Updates to your crate can be published with the same command, but be mindful that crates.io does not allow you to delete or overwrite an existing version of a crate. Make sure that everything is in order before you publish!

Visit the following resources to learn more:

- [@article@The Cargo Book: Publishing on crates.io](https://doc.rust-lang.org/cargo/reference/publishing.html)
