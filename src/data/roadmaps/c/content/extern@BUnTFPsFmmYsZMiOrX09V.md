# extern

The `extern` keyword declares that a variable or function is defined in another file, giving the compiler the information it needs to reference it without allocating storage again. It is typically placed in a header file so multiple source files can share the same global variable or function. Using `extern` correctly avoids duplicate-definition errors that occur when a variable is accidentally defined in more than one file.

Visit the following resources to learn more:

- [@article@What is the Extern Keyword in C?](https://www.scaler.com/topics/c-extern/)
- [@video@Understanding the Extern Keyword in C](https://www.youtube.com/watch?v=ySY_FlA7EvA)