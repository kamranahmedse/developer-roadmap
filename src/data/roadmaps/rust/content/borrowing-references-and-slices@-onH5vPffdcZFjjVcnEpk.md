# Borrowing, References, and Slices

Borrowing allows accessing data without taking ownership. Immutable borrows (`&T`) permit multiple read-only references, while mutable borrows (`&mut T`) allow one exclusive reference that can modify data. Slices (`&[T]`, `&str`) are references to contiguous sequences, enabling safe access to portions of data.

Learn more from the following links:

- [@official@References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [@article@The Slice Type](https://rust-book.cs.brown.edu/ch04-04-slices.html)
- [@article@Borrowing and References in Rust](https://codeforgeek.com/borrowing-and-references-in-rust/)