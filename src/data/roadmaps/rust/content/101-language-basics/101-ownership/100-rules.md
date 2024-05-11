# Ownership Rules and Memory Safety

In Rust, the concept of ownership is described by three main rules. Firstly, each value in Rust has a variable that is called its owner. Secondly, there can only ever be one owner at a time. This prevents multiple parts of the code from trying to modify the data at once, potentially causing data races and inconsistencies. Lastly, when the owner goes out of scope, the value will be dropped. This ensures that Rust cleans up the allocated memory and other resources once they’re no longer required, thereby avoiding memory leaks.

Learn more from the following links:

- [What Is Ownership?](https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html)