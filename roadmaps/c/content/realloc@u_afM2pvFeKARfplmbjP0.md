# realloc

`realloc` is a function used to change the size of a previously allocated memory block. It takes a pointer to an existing memory block and a new size as arguments, then attempts to resize the block while preserving its existing contents. If the current memory location cannot be expanded, it allocates a new block of the requested size, copies the data from the old memory to the new location, frees the old memory, and returns a pointer to the new block.

Visit the following resources to learn more:

- [@article@C Reallocate Memory](https://www.w3schools.com/c/c_memory_reallocate.php)
- [@article@C library - realloc() function](https://www.tutorialspoint.com/c_standard_library/c_function_realloc.htm)
- [@video@Realloc in C explained easy! 🚢](https://www.youtube.com/watch?v=rUXjvybSPWc)