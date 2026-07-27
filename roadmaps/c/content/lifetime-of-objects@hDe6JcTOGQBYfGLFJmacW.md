# Lifetime of Objects

The lifetime of an object is the period during program execution when its memory is guaranteed to hold valid data. Local variables on the stack typically live only until the enclosing block exits, static and global variables live for the entire program, and heap-allocated memory lives until it is explicitly freed. Accessing an object outside its lifetime, such as reading a stack variable after its function has returned, produces undefined behavior.

Visit the following resources to learn more:

- [@article@Lifetime](https://en.cppreference.com/c/language/lifetime#:~:text=Every%20object%20in%20C%20exists,known%20as%20this%20object's%20lifetime.)