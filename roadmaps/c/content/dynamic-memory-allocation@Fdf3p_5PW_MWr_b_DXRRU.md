# Dynamic Memory Allocation

Dynamic memory allocation reserves memory on the heap at runtime, when the amount of memory needed is not known in advance or needs to outlive the function that created it. C provides `malloc`, `calloc`, and `realloc` for allocation and `free` for releasing memory back to the system. Every successful allocation must eventually be paired with exactly one `free` call, and using memory after freeing it or freeing it twice both lead to undefined behavior.

Visit the following resources to learn more:

- [@article@C Memory Management](https://www.w3schools.com/c/c_memory_management.php)
- [@article@C Programming — Dynamic Memory Allocation](https://medium.com/@acamvproducingstudio/c-programming-dynamic-memory-allocation-86221e811379)
- [@video@Dynamic Memory Allocation | C Programming Tutorial](https://www.youtube.com/watch?v=R0qIYWo8igs)