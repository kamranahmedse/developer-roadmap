# assert.h

`<assert.h>` provides the `assert` macro, which checks that a given condition is true and, if not, prints an error message with the file and line number before terminating the program. It is commonly used during development to catch programming errors early, such as invalid function arguments, rather than letting them cause harder-to-diagnose failures later. Defining the `NDEBUG` macro before including `<assert.h>` disables all assertions, which is typically done in release builds for performance.

Visit the following resources to learn more:

- [@article@C Library - \<assert.h\>](https://www.tutorialspoint.com/c_standard_library/assert_h.htm)
- [@article@How to use assertions in C](https://ptolemy.berkeley.edu/~johnr/tutorials/assertions.html)
- [@video@Find bugs faster using assertions.](https://www.youtube.com/watch?v=1Jh9BUxIw0U)