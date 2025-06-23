# Mutex

`Mutex<T>` (Mutual Exclusion) protects shared data from concurrent access by multiple threads. Only one thread can access the protected data at a time through `lock()`. Rust automatically unlocks mutexes when they go out of scope and handles panics to prevent deadlocks.

Visit the following resources to learn more:

- [@official@Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html)
- [@article@Rust Mutex: From Basics to Advanced Techniques](https://medium.com/@TechSavvyScribe/rust-mutex-from-basics-to-advanced-techniques-56e1f1389d9b)
- [@article@Rust Concurrency Made Easy: A Guide to Arc and Mutex](https://www.ruststepbystep.com/rust-concurrency-made-easy-a-guide-to-arc-and-mutex/)