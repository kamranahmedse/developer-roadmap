# Header Files

Header files, with a `.h` extension, contain declarations, such as function prototypes, struct definitions, and macros, that are shared across multiple source files using `#include`. They let multiple `.c` files agree on the same interface without duplicating code. Header guards, or `#pragma once`, prevent the same header from being included multiple times in one compilation, which would otherwise cause duplicate-definition errors.

Visit the following resources to learn more:

- [@article@Header Files in C](https://www.tutorialspoint.com/cprogramming/c_header_files.htm)
- [@article@C Organize Code](https://www.w3schools.com/c/c_organize_code.php)
- [@video@why do header files even exist?](https://www.youtube.com/watch?v=tOQZlD-0Scc)