# async-std

`async-std` is a Rust library that provides an asynchronous version of the standard library. With the goal of being a drop-in replacement for Rust's standard library, it brings asynchronous programming directly into Rust's native system library, std. The most essential part inside `async-std` is an asynchronous runtime which includes IO and task scheduling. It lets you write asynchronous code that looks like synchronous code without having to worry about using future combinators or remembering to check if futures are ready. This significantly simplifies Rust's asynchronous programming model.

Visit the following resources to learn more:

- [@article@Docs.rs: async-std](https://docs.rs/async-std/latest/async_std/)
