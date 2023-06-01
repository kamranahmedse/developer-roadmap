# Raw Pointers and `new` and `delete` operators

Raw pointers in C++ are low-level constructs that directly hold a memory address. They can be used for manually allocating memory, creating dynamic arrays, and passing values efficiently, among other things.

##`new` Operator

The `new` operator is used to allocate memory on the heap. The memory allocated using `new` remains available until you explicitly deallocate it using the corresponding `delete` operator.

Here's an example of using the `new` operator:

```cpp
int* ptr = new int; // Dynamically allocates an int on the heap
*ptr = 42; // Assigns the value 42 to the allocated int
```

##`delete` Operator

The `delete` operator is used to deallocate memory that has been allocated using `new`. After memory is deallocated, it's available to be reallocated for other purposes. Failing to properly deallocate memory can lead to memory leaks.

Here's an example of using the `delete` operator:

```cpp
int* ptr = new int; // Dynamically allocates an int on the heap
*ptr = 42; // Assigns the value 42 to the allocated int

delete ptr; // Deallocates the memory assigned to ptr
```

##`new[]` and `delete[]` Operators

The `new[]` and `delete[]` operators are used for allocating and deallocating memory for an array of objects. The syntax for `new[]` and `delete[]` is very similar to that of `new` and `delete`.

Here's an example of using the `new[]` and `delete[]` operators:

```cpp
int n = 10;
int* arr = new int[n]; // Dynamically allocates an array of 10 integers on the heap

// Set some values in the array
for (int i = 0; i < n; i++) {
  arr[i] = i;
}

delete[] arr; // Deallocates the memory assigned to the array
```

In summary, raw pointers, and `new` and `delete` operators allow manual memory management in C++, providing control over allocation and deallocation. Make sure to always deallocate memory allocated with `new` or `new[]`, to avoid memory leaks in your programs.