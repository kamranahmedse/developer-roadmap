# Pointers

A pointer is a variable that stores the memory address of another variable (or function). It points to the location of the variable in memory, and it allows you to access or modify the value indirectly. Here's a general format to declare a pointer:

```cpp
dataType *pointerName;
```

**Initializing a pointer:**

```cpp
int num = 10;
int *ptr = &num;  // Pointer 'ptr' now points to the memory address of 'num'
```

**Accessing value using a pointer:**

```cpp
int value = *ptr; // Value now contains the value of the variable that 'ptr' points to (i.e., 10)
```

**Function pointer:**

```cpp
int add(int a, int b)
{
  return a + b;
}

int main()
{
  int (*funcptr) (int, int) = add; // Pointer 'funcptr' now points to the functions 'add'
  funcptr(4, 5); // Return 9
}
``` 

## References

A reference is an alias for an existing variable, meaning it's a different name for the same memory location. Unlike pointers, references cannot be null, and they must be initialized when they are declared. Once a reference is initialized, it cannot be changed to refer to another variable.

Here's a general format to declare a reference:

```cpp
dataType &referenceName = existingVariable;
```

**Example:**

```cpp
int num = 10;
int &ref = num; // Reference 'ref' is now an alias of 'num'
```

Modifying the value of `ref` will also modify the value of `num` because they share the same memory location.

**Note:** References are generally used when you want to pass a variable by reference in function arguments or when you want to create an alias for a variable without the need for pointer syntax.

Learn more from the following resources:

- [@article@Function Pointer in C++](https://www.scaler.com/topics/cpp/function-pointer-cpp/)
