# Deep Dive: Stack vs Heap

In most modern computer systems, memory management is split into two main parts: the stack and the heap. The **stack** is a section of memory that grows and shrinks automatically as functions are called and return. The data stored on the stack must have a known, fixed size. The **heap** is a section of memory that is used for data that needs to persist for longer than a single function-call. Data with dynamic size is stored on the heap. Rust, like many languages, has facilities for using these two types of memory, allowing developers fine-tuned control over memory usage.

Learn more from the following links:

- [The Stack and the Heap](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/the-stack-and-the-heap.html)