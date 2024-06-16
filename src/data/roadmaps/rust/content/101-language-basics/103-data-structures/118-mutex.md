# Mutex

`Mutex` or "Mutual Exclusion" in Rust is a concurrency primitive that is used to protect shared data from being concurrently accessed by multiple threads. When one thread starts using a `Mutex`, other threads have to wait until the Mutex is unlocked. When a thread has finished handling the shared data, it should unlock the `Mutex` to allow other threads to access the shared data. If not properly handled, it could lead to a software deadlock or other timing-related issues. Rust's Mutex has a built-in safeguard against these problems – if a thread that is holding a Mutex crashes, Rust will automatically unlock the Mutex.

Learn more from the following links:

- [@article@Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html)