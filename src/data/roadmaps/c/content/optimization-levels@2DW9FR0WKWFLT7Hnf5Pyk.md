# Optimization Levels

Optimization levels, set with compiler flags like `-O0` through `-O3` in GCC and Clang, control how aggressively the compiler transforms code to improve performance, often at the cost of longer compile times and less predictable debugging behavior. `-O0` disables optimization entirely, which is useful during development since the compiled code closely matches the source. Higher levels can reorder, inline, or eliminate code in ways that make step-by-step debugging harder to follow, and can also expose undefined behavior that seemed to work correctly at lower optimization levels.

Visit the following resources to learn more:

- [@article@Optimization of Computer Programs in C](https://icps.u-strasbg.fr/~bastoul/local_copies/lee.html)
- [@article@Optimizing compiler](https://en.wikipedia.org/wiki/Optimizing_compiler)
- [@video@C Compiler Optimization Fundamentals](https://www.youtube.com/watch?v=-gZpBCRaEak)