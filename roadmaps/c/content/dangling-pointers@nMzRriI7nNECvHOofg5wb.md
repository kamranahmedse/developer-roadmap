# Dangling Pointers

A dangling pointer points to memory that has already been freed or otherwise become invalid, but the pointer itself still holds the old address. Using a dangling pointer, whether reading or writing through it, results in undefined behavior and can corrupt unrelated data. Setting a pointer to `NULL` immediately after freeing it is a common way to reduce the risk of accidentally using it again.

Visit the following resources to learn more:

- [@article@Dangling Pointers in C](https://www.tutorialspoint.com/cprogramming/c_dangling_pointers.htm)
- [@article@Dangling Pointer in C: Causes, Types, Fixes & Examples](https://www.boardinfinity.com/blog/dangling-pointer-in-c/)
- [@video@Understanding the Dangling Pointers](https://www.youtube.com/watch?v=qNgV7oAHElk)