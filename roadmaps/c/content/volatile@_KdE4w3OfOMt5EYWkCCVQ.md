# volatile

The `volatile` qualifier tells the compiler that a variable's value can change unexpectedly, outside the normal flow of the program, such as through hardware registers or signal handlers. This prevents the compiler from applying optimizations that assume the variable's value stays the same between reads. It is common in embedded programming and low-level code that interacts directly with hardware.

Visit the following resources to learn more:

- [@article@“What volatile Really Does — and Doesn’t Do” — in C](https://medium.com/@wongjushao/what-volatile-really-does-and-doesnt-do-in-c-7a98e9e135c3)
- [@video@How to use the volatile keyword in C?](https://www.youtube.com/watch?v=6tIWFEzzx9I)