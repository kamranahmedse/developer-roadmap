# Static Typing

In C++, static typing means that the data type of a variable is determined at compile time, before the program is executed. This means that a variable can be used only with data of a specific type, and the compiler ensures that the operations performed with the variable are compatible with its type.

C++ is a statically typed language, which means that it uses static typing to determine data types and perform type checking during compile time. This helps with ensuring type safety and can prevent certain types of errors from occurring during the execution of the program.

Here's a simple code example to demonstrate static typing in C++:

```cpp

#include <iostream>
#include <string>

int main() {
    int num1 = 42;      // 'num1' is statically typed as an integer
    std:: string name = "John"; // 'name' is statically typed as a string

    // Attempting to assign an incompatible data type will result in a compile-time error
    num1 = name; // This line will cause a compile-time error because you can't assign a int to an string

    std::cout << "The value of num1 is: " << num1 << std::endl;
    std::cout << "The value of name is: " << name << std::endl;

    return 0;
}
```

In the code above, the variable num1 is statically typed as an int, and name is statically typed as a string. If you attempt to assign the value of num1 to name, you'll get a compile-time error. This is because the static typing system ensures that variables are only used with compatible data types.
