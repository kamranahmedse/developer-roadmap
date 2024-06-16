# Warp

Warp is a web server framework for Rust that focuses on composability and safety. It's built on top of `hyper`, a low-level HTTP library, but Warp adds a user-friendly layer on top of that, allowing developers to build custom routing logic with ease. Warp's primary concept is the "Filter", which can be combined and nested to create complex HTTP servers. Despite this abstraction, it manages to maintain a high level of performance thanks to Rust's zero-cost abstractions. Another feature of Warp is its capability to handle websockets, streaming bodies, and multipart forms.

Visit the following resources to learn more:

- [@article@Docs.rs: Warp](https://docs.rs/warp/latest/warp/)
