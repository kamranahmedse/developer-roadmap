# New/Delete Operators


**Dynamic memory allocation** is the process of allocating memory at runtime. Raw pointers can be used to dynamically allocate and deallocate memory in the **free store** (heap memory) using the `new` and `delete` operators.

## Syntax

1. Memory Allocation: `data-type *pointer_name = new data-type(value);`
2. Memory Deallocation: `delete pointer_name;`

## Example:

1. Memory Allocation:
```
int *ptr = new int(10);    // allocate memory for integer and store value 10
std::cout << *ptr << std::endl;     // prints value 10
```

2. Memory Deallocation:
```
// continuing with above example

delete ptr;     // deallocates the memory
```

Improper management of memory could lead to following errors:

- Memory Leaks
- Dangling pointers
- Double deletion

Manual memory management must always be handled with caution.

Learn more from the following resources:

- [@article@new and delete operators in C++](https://www.geeksforgeeks.org/new-and-delete-operators-in-cpp-for-dynamic-memory/)
