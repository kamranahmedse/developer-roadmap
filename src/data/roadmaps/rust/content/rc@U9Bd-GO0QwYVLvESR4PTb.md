# Rc

`Rc<T>` (Reference Counting) enables multiple owners of the same heap-allocated data in single-threaded contexts. It tracks the number of references and automatically deallocates data when the count reaches zero. Use `Rc::clone()` to create additional references without deep copying data.

Learn more from the following links:

- [@article@rct - The Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html#rct-the-reference-counted-smart-pointer)