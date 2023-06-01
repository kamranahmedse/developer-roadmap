# Access Violations

An access violation is a specific type of error that occurs when a program attempts to access an illegal memory location. In C++, access violations are most commonly caused by:

- **Dereferencing a null or invalid pointer.**
- **Accessing an array out of bounds.**
- **Reading or writing to memory freed by the user or the operating system.**

It is crucial to identify access violations because they can lead to unpredictable behavior, application crashes, or corruption of data.

Some examples of access violations are:

## Dereferencing null or invalid pointer

```cpp
int *p = nullptr;
int x = *p;  // Access violation: trying to access null pointer's content
```

## Accessing an array out of bounds

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int y = arr[5];  // Access violation: index out of bounds (valid indices are 0-4)
```

## Reading or writing to freed memory

```cpp
int* p2 = new int[10];
delete[] p2;
p2[3] = 42;  // Access violation: writing to memory that has been freed
```

### Debugging Access Violations

Tools like _debuggers_, _static analyzers_, and _profilers_ can help identify access violations in your code. For example:

* **Microsoft Visual Studio**: Use the built-in debugger to identify the line of code responsible for the access violation error.

* **Valgrind**: A popular Linux tool that detects memory leaks and access violations in your C++ programs.

* **AddressSanitizer**: A runtime memory error detector for C++ that can detect out-of-bounds accesses, memory leaks, and use-after-free errors.