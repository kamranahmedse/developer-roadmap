# LinkedList

`LinkedList<T>` is a doubly-linked list where each node contains a value and pointers to both next and previous nodes. Provides O(1) insertion/removal at both ends but O(n) indexing. Generally slower than `Vec` and rarely needed; `VecDeque` is usually preferred for queue operations.

Visit the following resources to learn more:

- [@official@LinkedList in std::collections](https://doc.rust-lang.org/std/collections/struct.LinkedList.html)
- [@article@Too Many Linked Lists](https://rust-unofficial.github.io/too-many-lists/)
