# Memory Leakage

Memory leakage occurs when a program allocates memory in the heap but does not release the memory back to the operating system when it is no longer needed. Over time, this leads to exhaustion of available memory, resulting in low system performance or crashes.

In C++, when you use raw pointers, you need to manage the memory allocation and deallocation manually. In many cases, you will use the `new` keyword to allocate memory for an object in the heap and use `delete` keyword to deallocate that memory when it's no longer needed. Forgetting to do this can cause memory leaks.

Here's an example:

```cpp
void create_memory_leak() {
    int* ptr = new int[100]; // Allocating memory in the heap for an array of integers
    // Some code...
    // Code to deallocate the memory is missing: delete[] ptr;
} // ptr goes out of scope, memory block allocated is not deallocated, causing a memory leak.
```

To avoid memory leaks, you should always ensure that memory is deallocated before a pointer goes out of scope or is reassigned. Some ways to achieve this include using the C++ smart pointers (`std::unique_ptr`, `std::shared_ptr`), RAII (Resource Acquisition Is Initialization) techniques, and containers from the C++ standard library that manage memory allocation internally (e.g., `std::vector`, `std::string`).

For example, this code will not have a memory leak:

```cpp
#include <memory>

void no_memory_leak() {
    std::shared_ptr<int> ptr = std::make_shared<int[]>(100); // Allocating memory in the heap for an array of integers using shared_ptr
    // Some code...
} // shared_ptr goes out of scope and it will automatically deallocate the memory block assigned to it.
```