# setjmp / longjmp

`setjmp` and `longjmp`, declared in `<setjmp.h>`, implement a non-local jump that lets a program save an execution point with `setjmp` and later jump back to it with `longjmp`, potentially unwinding several function calls at once. This is sometimes used as a rough substitute for exception handling, for example to recover from an error deep in a call stack. Because it skips normal function cleanup, like calling destructors in C++, it must be used carefully, and it does not exist to make error handling elegant, only possible.

Visit the following resources to learn more:

- [@article@setjmp(), longjmp(), and Exception Handling in C](https://dev.to/pauljlucas/setjmp-longjmp-and-exception-handling-in-c-1h7h)
- [@video@Can I Handle Exceptions with Try Catch in C? (setjmp, longjmp)](https://www.youtube.com/watch?v=eQcRcgOnl9o)