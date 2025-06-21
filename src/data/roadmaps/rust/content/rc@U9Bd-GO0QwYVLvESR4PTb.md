# Rc

`Rc<T>` (Reference Counting) enables multiple owners of the same heap-allocated data in single-threaded contexts. It tracks the number of references and automatically deallocates data when the count reaches zero. Use `Rc::clone()` to create additional references without deep copying data.

Visit the following resources to learn more:

- [@official@Rc\<T\> in std::rc](https://doc.rust-lang.org/std/rc/struct.Rc.html)
- [@official@rct - The Reference Counted Smart Pointer](https://doc.rust-lang.org/book/ch15-04-rc.html#rct-the-reference-counted-smart-pointer)