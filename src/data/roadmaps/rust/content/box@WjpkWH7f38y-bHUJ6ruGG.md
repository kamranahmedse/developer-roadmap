# Box

A `Box` in Rust is a smart pointer that allocates memory on the heap. It's primarily used to store data that has a size that's not known at compile time, or when you want to transfer ownership of data without copying it. Think of it as a way to put data on the heap and access it through a pointer, ensuring that the data is automatically deallocated when the `Box` goes out of scope.

Visit the following resources to learn more:

- [@official@Using Box<T> to Point to Data on the Heap](https://doc.rust-lang.org/book/ch15-01-box.html)
- [@official@Smart Pointers](https://doc.rust-lang.org/book/ch15-00-smart-pointers.html#smart-pointers)
- [@video@The Box Smart Pointer in Rust](https://www.youtube.com/watch?v=m76sRj2VgGo)