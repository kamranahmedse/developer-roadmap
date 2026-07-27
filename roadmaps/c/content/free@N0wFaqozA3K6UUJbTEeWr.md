# free

`free` is a standard library function used to deallocate a block of memory that was previously reserved on the heap. When you call this function, it releases the specified memory back to the system so that it can be used for other purposes in the program. Passing a pointer to the start of a previously allocated memory block to `free` effectively marks that space as available, though the pointer itself remains unchanged and should ideally be set to `NULL` immediately afterward to prevent accidental use of dangling references.

Visit the following resources to learn more:

- [@article@C Deallocate Memory](https://www.w3schools.com/c/c_memory_deallocate.php)
- [@article@C library - free() function](https://www.tutorialspoint.com/c_standard_library/c_function_free.htm)
- [@video@Releasing the Dynamically Allocated Memory using free()](https://www.youtube.com/watch?v=qG0wUzuBI_A)