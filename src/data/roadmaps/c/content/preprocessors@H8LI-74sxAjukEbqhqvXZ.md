# Preprocessors

The preprocessor runs before actual compilation begins, handling directives that start with `#`, such as `#include`, `#define`, and conditional compilation directives. It performs purely textual transformations on the source code, expanding macros and including header file contents, before the compiler ever sees the result. Understanding preprocessor behavior helps explain why macro-related bugs can be tricky, since errors often point to the expanded code rather than the original macro invocation.

Visit the following resources to learn more:

- [@article@C Preprocessor and Macros](https://www.w3schools.com/c/c_macros.php)
- [@article@Preprocessors in C](https://www.tutorialspoint.com/cprogramming/c_preprocessors.htm)
- [@article@Preprocessor](https://cppreference.com/c/preprocessor)