# Conditional Compilation

Conditional compilation uses preprocessor directives like `#ifdef`, `#ifndef`, `#if`, and `#endif` to include or exclude blocks of code before the compiler processes them, based on whether certain macros are defined. It is commonly used for platform-specific code, enabling debug-only sections, or preventing a header file from being included multiple times through header guards. Because this happens during preprocessing, excluded code is never even seen by the compiler.

Visit the following resources to learn more:

- [@article@Conditional compilation directives in C](https://fastbitlab.com/blog/microcontroller-embedded-c-programming-lecture-182-conditional-compilation-directives/)
- [@article@Conditional compilation - Wikipedia](https://en.wikipedia.org/wiki/Conditional_compilation)
- [@video@Conditional Compilation Directives](https://www.youtube.com/watch?v=rTNDAMyRpUs)