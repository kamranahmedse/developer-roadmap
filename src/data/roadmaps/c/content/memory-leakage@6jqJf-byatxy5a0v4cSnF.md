# Memory Leakage

A memory leak happens when dynamically allocated memory is no longer needed but is never freed, so it stays reserved and unavailable for the rest of the program's execution. Leaks accumulate over time, especially in long-running programs, and can eventually exhaust available memory. Tools like Valgrind can detect leaks by tracking allocations that are never matched with a corresponding `free`.

Visit the following resources to learn more:

- [@article@Finding a Memory Leak in C or C++](https://www.parasoft.com/blog/finding-memory-leaks-in-c-or-c/)
- [@article@How To Find And Fix Memory Leaks in C or C++](https://www.netdata.cloud/academy/how-to-find-memory-leak-in-c/)
- [@video@Memory Leaks And How To Prevent Them](https://www.youtube.com/watch?v=lQCLAKfcYI4)