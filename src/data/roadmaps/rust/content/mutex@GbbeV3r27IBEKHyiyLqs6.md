# Mutex

`Mutex<T>` (Mutual Exclusion) protects shared data from concurrent access by multiple threads. Only one thread can access the protected data at a time through `lock()`. Rust automatically unlocks mutexes when they go out of scope and handles panics to prevent deadlocks.

Learn more from the following links:

- [@article@Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html)