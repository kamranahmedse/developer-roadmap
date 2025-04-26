# Raw Pointers

A **pointer** is a special variable that holds the address of another variable or object.
Pointers are declared by specifying the type of data it points to followed by an asterisk. Pointers can be initialised to point to the address of a variable using the **address-of operator** (`&`). The value stored in the variable pointed by the pointer can be obtained by using the **dereference operator** (`*`). 

## Syntax: 
`data-type *pointer_name = &variable_name;`

## Example:
```
int var = 5;
int *ptr = &var;

std::cout << var << std::endl;  // prints 5
std::cout << ptr << std::endl;  // prints address of var
std::cout << *ptr << std::endl; // prints 5
```

Raw pointers allow manual management(access, allocation & deallocation) of the heap memory with the help of `new` & `delete` operators.

Please note that usage of raw pointers is risky because if the memory is not managed properly, it could lead to complex issues and could also cause the system to crash. A better alternative is to use *smart pointers*.

Learn more from the following resources:

- [@article@Raw Pointers](https://www.gyata.ai/c-plus-plus/raw-pointers)
- [@article@Raw Pointers (C++)](https://learn.microsoft.com/en-us/cpp/cpp/raw-pointers?view=msvc-170)
- [@video@Pointers in C/C++](https://www.youtube.com/watch?v=zuegQmMdy8M)
