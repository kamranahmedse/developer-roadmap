# restrict

The `restrict` qualifier, introduced in C99, is a hint to the compiler that a pointer is the only way to access the memory it points to during its lifetime. This allows the compiler to make more aggressive optimizations, since it does not need to guard against another pointer aliasing the same memory. Misusing `restrict` by actually aliasing the memory anyway results in undefined behavior.

Visit the following resources to learn more:

- [@article@restrict type qualifier](https://en.cppreference.com/c/language/restrict)
- [@video@The ONLY C keyword with no C++ equivalent](https://www.youtube.com/watch?v=TBGu3NNpF1Q&t=58s)