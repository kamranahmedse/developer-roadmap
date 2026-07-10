# File Pointers

A file pointer, of type `FILE *`, is returned by `fopen` and represents an open file along with its current read/write position and buffering state. It is passed to subsequent I/O functions like `fread`, `fwrite`, and `fclose` to identify which open file they should operate on. Every successfully opened file pointer should eventually be closed with `fclose` to flush any buffered data and release the underlying resource.

Visit the following resources to learn more:

- [@article@C Files](https://www.w3schools.com/c/c_files.php)
- [@video@File Access Basics | C Programming Tutorial](https://www.youtube.com/watch?v=HQNsriyMhtY)