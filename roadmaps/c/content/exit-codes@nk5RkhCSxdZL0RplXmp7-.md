# Exit Codes

An exit code is a small integer that a program returns to the operating system when it finishes, indicating whether it succeeded or failed, and if it failed, sometimes why. By convention, an exit code of 0 means success and any nonzero value indicates an error, with `EXIT_SUCCESS` and `EXIT_FAILURE` from `<stdlib.h>` providing portable constants for these. Exit codes are commonly checked by shell scripts and other programs that call a C program and need to know whether it completed successfully.

Visit the following resources to learn more:

- [@article@Exit Codes in Linux C Programming](https://medium.com/@linuxrootroom/exit-codes-in-linux-c-programming-14dd90c4b48d)
- [@article@exit](https://en.cppreference.com/c/program/exit)
- [@video@Getting exit status code in C](https://www.youtube.com/watch?v=DiNmwwQWl0g)