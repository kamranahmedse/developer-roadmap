# Borrowing, References, and Slices

In Rust, "borrowing" is a technique which allows you to access the data of a particular value while the owner retains control. There are two types of borrowing: mutable and immutable. Immutable borrowing means an owner can fondly permit several read-only borrows of a value at the same time as long as the value doesn't change. On the other hand, mutable borrowing allows only a single borrower at a time who can potentially modify the value. This practice is essential in maintaining the concept of ownership without violating any of its rules and avoiding the problem of dangling references.

Learn more from the following links:

- [@article@References and Borrowing](https://rust-book.cs.brown.edu/ch04-02-references-and-borrowing.html)
- [@article@The Slice Type](https://rust-book.cs.brown.edu/ch04-04-slices.html)