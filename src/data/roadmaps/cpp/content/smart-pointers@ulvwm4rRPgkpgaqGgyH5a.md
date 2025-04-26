# Smart Pointers

**Smart pointer** is a wrapper class around a *raw pointer*. While a raw pointer is used to manually manage memory, smart pointers are used to avoid memory leaks by automatically managing the memory. The memory is automatically and dynamically allocated and deallocated with respect to the scope of the object.

## Types of smart pointers:

1. `unique_ptr`
2. `shared_ptr`
3. `weak_ptr`

Smart pointers are safer than raw pointers. However, they have lesser performance than raw pointers due to automatic management and overheads.

Learn more from the following resources:

- [@official@Smart Pointers](https://en.cppreference.com/book/intro/smart_pointers)
- [@article@Smart Pointers in C++](https://www.geeksforgeeks.org/smart-pointers-cpp/)
