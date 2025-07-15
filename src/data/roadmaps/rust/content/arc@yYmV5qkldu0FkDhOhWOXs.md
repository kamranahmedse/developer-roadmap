# Arc

`Arc<T>` (Atomic Reference Counting) is a thread-safe smart pointer for sharing immutable data across multiple threads. It uses atomic operations to track reference counts, allowing multiple ownership of heap-allocated data. When the reference count reaches zero, the data is automatically cleaned up.

Learn more from the following links:

- [@official@Arc in std::sync](https://doc.rust-lang.org/std/sync/struct.Arc.html)
- [@official@Arc in Rust Lang](https://doc.rust-lang.org/rust-by-example/std/arc.html)