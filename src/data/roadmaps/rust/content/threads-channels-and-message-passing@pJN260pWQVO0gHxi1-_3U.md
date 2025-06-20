# Threads, Channels, and Message Passing

Rust provides native threading with `std::thread::spawn()` and `join()` for 1:1 OS thread mapping. Channels enable safe message passing between threads, avoiding shared state issues. This model promotes concurrent programming without data races through Rust's ownership system.

Learn more from the following links:

- [@article@Rust Atomics and Locks - Low-Level Concurrency in Practice](https://marabos.nl/atomics/)
