# Arc

`Arc` in Rust stands for "Atomic Reference Counting". It is a thread-safe reference-counting type used for sharing immutable data between multiple parts of the system. With `Arc`, we can have multiple references to the same data which is useful for concurrent programming. When the last reference to a type is gone, the `Arc` will clean up the underlying data. Unlike `Rc` (Reference Counting), which is single-threaded, `Arc` uses atomic operations for incrementing and decrementing the reference count hence making it safe to share across threads.

Learn more from the following links:

- [@article@Arc](https://doc.rust-lang.org/rust-by-example/std/arc.html)