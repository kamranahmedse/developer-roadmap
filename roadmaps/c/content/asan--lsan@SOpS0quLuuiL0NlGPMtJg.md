# ASan & LSan

AddressSanitizer (ASan) and LeakSanitizer (LSan) are compiler-integrated tools, enabled with a flag like `-fsanitize=address`, that detect memory errors and leaks respectively by instrumenting the compiled code to check memory accesses at runtime. ASan catches issues such as buffer overflows, use-after-free, and use of memory after it goes out of scope, reporting the exact location of the error. Compared to tools like Valgrind, sanitizers typically run faster since the checks are built into the compiled binary itself rather than emulated externally.

Visit the following resources to learn more:

- [@article@AddressSanitizer](https://learn.microsoft.com/en-gb/cpp/sanitizers/asan?view=msvc-170)
- [@video@find memory errors quickly. (-fsanitize, addresssanitizer)](https://www.youtube.com/watch?v=tEbV21aPSKw)
- [@video@Detect C++ Memory Leaks with ALSan:](https://www.youtube.com/watch?v=9f5hd-8suVE)