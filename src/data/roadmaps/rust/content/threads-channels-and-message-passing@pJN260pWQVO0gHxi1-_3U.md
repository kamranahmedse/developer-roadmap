# Threads, Channels, and Message Passing

Rust provides native threading with `std::thread::spawn()` and `join()` for 1:1 OS thread mapping. Channels enable safe message passing between threads, avoiding shared state issues. This model promotes concurrent programming without data races through Rust's ownership system.

Visit the following resources to learn more:

- [@official@std::thread](https://doc.rust-lang.org/std/thread/)
- [@official@Using Message Passing to Transfer Data Between Threads](https://doc.rust-lang.org/book/ch16-02-message-passing.html)
- [@article@Understanding Threads in Rust: A Comprehensive Guide](https://blog.stackademic.com/understanding-threads-in-rust-a-comprehensive-guide-7e2d23fb85b0)
- [@article@Rust Atomics and Locks - Low-Level Concurrency in Practice](https://marabos.nl/atomics/)
