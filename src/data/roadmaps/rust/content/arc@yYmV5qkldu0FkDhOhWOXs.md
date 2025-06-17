# Arc

`Arc<T>` (Atomic Reference Counting) is a thread-safe smart pointer for sharing immutable data across multiple threads. It uses atomic operations to track reference counts, allowing multiple ownership of heap-allocated data. When the reference count reaches zero, the data is automatically cleaned up.

Learn more from the following links:

- [@article@Arc](https://doc.rust-lang.org/rust-by-example/std/arc.html)