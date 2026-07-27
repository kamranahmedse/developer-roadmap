# Streams

A stream in C is an abstraction representing a source or destination of data, such as a file, the keyboard, or the screen, accessed through a `FILE *` pointer. The standard library provides three streams automatically: `stdin` for input, `stdout` for normal output, and `stderr` for error output. Functions like `fopen`, `fread`, `fwrite`, and `fclose` operate on streams rather than directly on the underlying file descriptor.

Visit the following resources to learn more:

- [@article@C programming/Stream IO](https://en.wikibooks.org/wiki/C_programming/Stream_IO)