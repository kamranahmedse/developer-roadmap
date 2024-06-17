# Rc

`Rc` stands for Reference Counting, a data type in Rust that allows multiple owners for the same data on the heap while keeping track of the number of references to that data. If there are zero references to data, the value can be cleaned up without any references becoming invalid. Avoiding these problems comes at the cost of some memory overhead, because `Rc` keeps track of the total number of references which means it needs to allocate memory to keep the count.

Learn more from the following links:

- [@article@rct - The Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html#rct-the-reference-counted-smart-pointer)