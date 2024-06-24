# Deep Dive: Stack vs Heap

In most modern computer systems, memory management is split into two main parts: the stack and the heap.

- The **stack** is a section of memory that grows and shrinks automatically as functions are called and return. For data to be stored on the stack, it must have a known, fixed size at compile time.

- The **heap** is a section of memory that is used for data that needs to persist for longer than a single function-call. Data with dynamic size is stored on the heap.

Rust, like many languages, has facilities for using these two types of memory, allowing developers fine-tuned control over memory usage.

Learn more from the following links:

- [@article@The Stack and the Heap](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/the-stack-and-the-heap.html)
