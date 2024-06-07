# RwLock

`RwLock` in Rust stands for Read/Write lock, which is a type of synchronization primitive. It is an advanced version of the Mutex data structure. Unlike Mutex, which only allows one thread to access the data, `RwLock` allows multiple threads to read data at the same time but only one thread to write. If a thread is writing, no other thread can read or write. The syntax for declaring `RwLock` is `let lock = RwLock::new(value)`. Please remember that a potential downside of `RwLock` is lock contention, making sure to properly manage read-write access. The appropriate use of `RwLock` can enable better performance for workloads that involve heavy reading.

Learn more from the following links:

- [@article@RwLock](https://doc.rust-lang.org/std/sync/struct.RwLock.html)