# Stack

The **Stack** is a fundamental data structure in Rust, which is based on the principle of Last-In-First-Out (LIFO). In other words, elements that are added last are the first ones to be removed. This is functionally similar to a real-world stack, such as a stack of plates. One key aspect of stacks in Rust is that they are bounded to a certain size at compile-time. This implies that stack size does not grow or shrink dynamically. In Rust, function calls are operated using stack with each call pushing a new stack frame to the end, and each return statement popping one off. Stack Overflow occurs when too much of the stack is used.

Learn more from the following links:

- [@official@Box, Stack and Heap](https://doc.rust-lang.org/rust-by-example/std/box.html)
