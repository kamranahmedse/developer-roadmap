# Ownership Rules and Memory Safety

Rust's ownership has three key rules: each value has exactly one owner, only one owner exists at a time, and values are dropped when owners go out of scope. This prevents data races, ensures memory safety without garbage collection, and eliminates common bugs like use-after-free and memory leaks.

Learn more from the following links:

- [@article@What Is Ownership?](https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html)
