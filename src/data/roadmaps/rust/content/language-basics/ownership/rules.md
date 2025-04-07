# Ownership Rules and Memory Safety

In Rust, the concept of ownership is described by three main rules.
1. Each value in Rust has a variable that is called its _owner_.
2. There can only ever be _one owner at a time_. This prevents multiple parts of the code from trying to modify the data at once, potentially causing data races and inconsistencies.
3. _When the owner goes out of scope, the value will be dropped_. This ensures that Rust cleans up the allocated memory and other resources once they're no longer required, thereby avoiding memory leaks.

Learn more from the following links:

- [@article@What Is Ownership?](https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html)
