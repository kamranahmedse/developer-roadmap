# Dynamic Typing in C++

C++ is known as a statically-typed language, which means the data types of its variables are determined at compile time. However, C++ also provides concepts to have certain level of _dynamic typing_, which means determining the data types of variables at runtime.

Here is a brief overview of two ways to achieve dynamic typing in C++:

##  `void*` Pointers

A `void*` pointer is a generic pointer that can point to objects of any data type. They can be used to store a reference to any type of object without knowing the specific type of the object.

Example:
```cpp
#include <iostream>

int main() {
    int x = 42;
    float y = 3.14f;
    std::string z = "Hello, world!";

    void* void_ptr;

    void_ptr = &x;
    std::cout << "int value: " << *(static_cast<int*>(void_ptr)) << '\n';

    void_ptr = &y;
    std::cout << "float value: " << *(static_cast<float*>(void_ptr)) << '\n';

    void_ptr = &z;
    std::cout << "string value: " << *(static_cast<std::string*>(void_ptr)) << '\n';

    return 0;
}
```

##  `std::any` (C++17)

C++17 introduced the `std::any` class which represents a generalized type-safe container for single values of any type.

Example:
```cpp
#include <iostream>
#include <any>

int main() {
    std::any any_value;

    any_value = 42;
    std::cout << "int value: " << std::any_cast<int>(any_value) << '\n';

    any_value = 3.14;
    std::cout << "double value: " << std::any_cast<double>(any_value) << '\n';

    any_value = std::string("Hello, world!");
    std::cout << "string value: " << std::any_cast<std::string>(any_value) << '\n';

    return 0;
}
```

Keep in mind that both `void*` pointers and `std::any` have performance implications due to the additional type checking and casting that take place during runtime. They should be used carefully and only when absolutely necessary.