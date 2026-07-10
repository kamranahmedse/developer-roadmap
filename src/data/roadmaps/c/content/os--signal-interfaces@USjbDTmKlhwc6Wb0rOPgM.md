# OS & Signal Interfaces

Operating system and signal interfaces, such as `<signal.h>` and parts of `<stdlib.h>`, let a C program interact with the underlying operating system, including handling asynchronous events like interrupts (`SIGINT`) or setting up custom responses to system-generated signals. These functions provide a portable, if limited, way to write programs that respond to external events like a user pressing Ctrl+C. More extensive OS interaction, such as process creation, typically requires platform-specific APIs like POSIX functions on Unix-like systems.

Visit the following resources to learn more:

- [@article@C Library - \<signal.h\>](https://www.tutorialspoint.com/c_standard_library/signal_h.htm)