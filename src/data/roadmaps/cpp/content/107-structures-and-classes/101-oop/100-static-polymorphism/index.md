# Static Polymorphism

Static polymorphism, also known as compile-time polymorphism, is a type of polymorphism that resolves the types and method calls at compile time rather than at runtime. This is commonly achieved through the use of function overloading and templates in C++.

## Function Overloading

Function overloading is a way to create multiple functions with the same name but different parameter lists. The compiler determines the correct function to call based on the types and number of arguments used when the function is called.

Example:

```cpp
#include <iostream>

void print(int i) {
    std::cout << "Printing int: " << i << std::endl;
}

void print(double d) {
    std::cout << "Printing double: " << d << std::endl;
}

void print(const char* s) {
    std::cout << "Printing string: " << s << std::endl;
}

int main() {
    print(5);          // Calls print(int i)
    print(3.14);       // Calls print(double d)
    print("Hello");    // Calls print(const char* s)

    return 0;
}
```

## Templates

Templates are a powerful feature in C++ that allows you to create generic functions or classes. The actual code for specific types is generated at compile time, which avoids the overhead of runtime polymorphism. The use of templates is the main technique to achieve static polymorphism in C++.

Example:

```cpp
#include <iostream>

// Template function to print any type
template<typename T>
void print(const T& value) {
    std::cout << "Printing value: " << value << std::endl;
}

int main() {
    print(42);           // int
    print(3.14159);      // double
    print("Hello");      // const char*

    return 0;
}
```

In conclusion, static polymorphism achieves polymorphic behavior during compile time using function overloading and templates, instead of relying on runtime information like dynamic polymorphism does. This can result in more efficient code since method calls are resolved at compile time.