# RwLock

`RwLock<T>` (Read-Write Lock) allows multiple concurrent readers OR one exclusive writer, unlike Mutex which allows only one accessor. Use `read()` for shared access and `write()` for exclusive access. Ideal for read-heavy workloads where data is frequently read but rarely modified.

Learn more from the following links:

- [@article@RwLock](https://doc.rust-lang.org/std/sync/struct.RwLock.html)