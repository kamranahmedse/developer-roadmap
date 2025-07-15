# RwLock

`RwLock<T>` (Read-Write Lock) allows multiple concurrent readers OR one exclusive writer, unlike Mutex which allows only one accessor. Use `read()` for shared access and `write()` for exclusive access. Ideal for read-heavy workloads where data is frequently read but rarely modified.

Visit the following resources to learn more:

- [@official@RwLock](https://doc.rust-lang.org/std/sync/struct.RwLock.html)
- [@article@Rust Read-Write Locks: Managing Concurrent Read and Write Access](https://medium.com/@TechSavvyScribe/rust-read-write-locks-managing-concurrent-read-and-write-access-a6ab689bbed3)
