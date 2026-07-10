# _Atomic

The `_Atomic` qualifier, introduced in C11, marks a variable so that reads and writes to it happen as a single, indivisible operation, even when accessed from multiple threads. This prevents data races on that variable without needing a separate lock. It is used together with the `<stdatomic.h>` header when writing concurrent C code.

Visit the following resources to learn more:

- [@article@Atomic types](https://en.cppreference.com/c/language/atomic)
- [@article@What is the _Atomic keyword in C?](https://www.educative.io/answers/what-is-the-atomic-keyword-in-c)
- [@article@Understanding _Atomic Types in C](https://andrewjohnson4.substack.com/p/understanding-_atomic-types-in-c)