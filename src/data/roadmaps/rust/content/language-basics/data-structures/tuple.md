# Tuple

In Rust, a **Tuple** is a type of data structure that holds a finite number of elements, each having potentially different types. Elements in a tuple are accessed using a dot (`.`) followed by the index of the value we want to get. For example, to declare a tuple that includes a `32-bit integer`, a `single-byte unsigned integer`, and a `floating point number`, we would write `let my_tuple: (i32, u8, f64) = (500, 2, 20.5);` The index of elements in a tuple start from `0`. So, to access the first element, use `my_tuple.0`, the second element `my_tuple.1`, and so on. Tuples can also be used for multiple declarations and assignments. Tuples are particularly useful when you want to group together items of different types.

Learn more from the following links:

- [@official@Tuple - Rust](https://doc.rust-lang.org/std/primitive.tuple.html)
- [@article@The Tuple Type](https://rust-book.cs.brown.edu/ch03-02-data-types.html#the-tuple-type)
- [@video@Rust Tutorial - Tuples](https://www.youtube.com/watch?v=t047Hseyj_k&t=506s)
