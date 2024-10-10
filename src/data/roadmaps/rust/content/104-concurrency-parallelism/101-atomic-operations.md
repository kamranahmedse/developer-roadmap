# Atomic Operations and Memory Barriers

Atomic operations in Rust are low-level types that support lock-free concurrent programming. These operations are atomic because they complete in a single operation rather than being interruptible. In Rust, atomic types provide primitive shared-memory communication between threads, and can also be used for non-blocking data structures and are supported using machine instructions directly. They form the building blocks for other, higher-level concurrency abstractions. It includes variety of atomic operations such as `store`, `load`, `swap`, `fetch_add`, `compare_and_swap` and more, which are operations performed in a single, uninterrupted step.

Learn more from the following links:

- [@opensource@Rust Atomics and Locks - Low-Level Concurrency in Practice](https://marabos.nl/atomics/)
