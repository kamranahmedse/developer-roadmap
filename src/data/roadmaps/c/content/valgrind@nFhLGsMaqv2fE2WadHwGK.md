# Valgrind

Valgrind is a dynamic analysis tool that runs a compiled program inside a virtual environment to detect memory errors, such as reading uninitialized memory, using memory after it has been freed, and memory leaks, at runtime. Its most commonly used tool, Memcheck, reports the exact line where a memory error occurred, including the point where the involved memory was originally allocated. Running a program under Valgrind significantly slows its execution, which makes it more suitable for testing than production use.

Visit the following resources to learn more:

- [@article@Guide to valgrind](https://web.stanford.edu/class/archive/cs/cs107/cs107.1174/guide_valgrind.html)
- [@video@C Dynamic Memory Debugging with Valgrind](https://www.youtube.com/watch?v=bb1bTJtgXrI)