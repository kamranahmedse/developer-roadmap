# Memory Model

C's memory model describes how a running program's memory is organized into distinct regions: the stack for local variables and function call information, the heap for dynamically allocated memory, and separate segments for global/static variables and the compiled program code itself. Understanding this layout helps explain why some memory is automatically reclaimed and other memory must be freed manually. It also clarifies why certain bugs, like stack overflows or heap corruption, occur in specific regions.

Visit the following resources to learn more:

- [@article@Memory model](https://en.cppreference.com/c/language/memory_model#:~:text=Defines%20the%20semantics%20of%20computer,memory%20has%20a%20unique%20address.)
- [@article@The C Memory Model](https://www.cs.toronto.edu/~strider//docs/ICS_Chapter_2.pdf)
- [@video@C Programming and Memory Management - Full Course](https://www.youtube.com/watch?v=rJrd2QMVbGM)