# Undefined Behavior

Undefined behavior refers to code whose outcome the C standard places no constraints on, meaning a compiler is free to produce any result, including seemingly correct output, a crash, or subtle corruption that only appears under certain conditions. Common causes include signed integer overflow, reading uninitialized memory, out-of-bounds array access, and dereferencing invalid pointers. Because undefined behavior can appear to work correctly during testing and then fail later or on a different compiler, it is one of the most important sources of hard-to-diagnose bugs in C.

Visit the following resources to learn more:

- [@article@Undefined behavior](https://en.cppreference.com/c/language/behavior)
- [@article@Undefined Behavior in C and C++](https://dev.to/pauljlucas/undefined-behavior-in-c-and-c-3a20)
- [@video@Undefined behavior in C and why you should know about it](https://www.youtube.com/watch?v=va_UZwTVR5g)