# errno

`errno` is a global variable, declared in `<errno.h>`, that many standard library functions set to a specific error code when they fail. It is not automatically reset to zero on success, so it should only be checked immediately after a function call that is documented to set it, and typically after confirming the function actually failed. Functions like `perror` or `strerror` translate an `errno` value into a human-readable message.

Visit the following resources to learn more:

- [@article@Errno and Error Management in C](https://www.codequoi.com/en/errno-and-error-management-in-c/)
- [@article@A Guide to Error Handling in C](https://psychocod3r.wordpress.com/2019/04/02/a-guide-to-error-handling-in-c/)
- [@video@Handling Errors in C/Unix (perror, strerror, errno)](https://www.youtube.com/watch?v=IZiUT-ipnj0)