# Array

In Rust, an `array` is a collection of elements of the same type, organized consecutively in memory. Unlike some other data structures in Rust, the size of an array must be known at compile time. This gives it a distinct advantage in memory efficiency. The size of the array cannot be changed after it has been declared. The syntax to declare an array in Rust is as follows: `let array_name: [type; size] = [elements];`. Here, `type` represents the data type of the elements, `size` is the number of elements and `elements` are the data held in the array. For example: `let numbers: [i32; 5] = [1, 2, 3, 4, 5];`. Elements in an array can be accessed using their indices, starting from 0. For instance, `numbers[0]` will return the first element `1` in the `numbers` array.

Learn more from the following links:

- [@official@Rust - array](https://doc.rust-lang.org/std/primitive.array.html)
- [@article@The Array Type](https://rust-book.cs.brown.edu/ch03-02-data-types.html#the-array-type)
- [@article@Rust Array (With Examples)](https://www.programiz.com/rust/array)
- [@video@Rust Tutorial - Arrays](https://www.youtube.com/watch?v=t047Hseyj_k&t=767s)
