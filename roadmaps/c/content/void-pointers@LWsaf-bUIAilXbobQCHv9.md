# void Pointers

A `void` pointer, declared as `void *`, can point to any data type but cannot be dereferenced directly, since the compiler has no type information about what it points to. It is typically cast to a specific pointer type before use, and appears often in generic functions like `malloc`, which returns `void *` because it has no knowledge of what type of data will be stored there. This flexibility comes at the cost of losing type safety until the cast happens.

Visit the following resources to learn more:

- [@article@void pointer in C](https://www.tutorialspoint.com/cprogramming/c_void_pointer.htm)
- [@video@Understanding the Void Pointers](https://www.youtube.com/watch?v=ij2jrsUmwCI)