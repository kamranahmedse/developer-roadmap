# Threads, Channels, and Message Passing

Threads are the smallest unit of computing that can be scheduled by an operating system. They live in the context of a process, and each thread within a process shares the process's resources including memory and file handles. In Rust, the `std::thread` module allows you to have direct control over threads. This model of concurrency is known as 1:1, mapping one operating system thread to one language thread. You can write concurrent programs in Rust using threads in a similar way as most other languages. You start threads with `std::thread::spawn` and wait for them to finish with `join`.

Learn more from the following links:

- [@opensource@Rust Atomics and Locks - Low-Level Concurrency in Practice](https://marabos.nl/atomics/)
