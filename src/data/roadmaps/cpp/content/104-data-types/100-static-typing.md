# Static Typing

In C++, static typing means that the data type of a variable is determined at compile time, before the program is executed. This means that a variable can be used only with data of a specific type, and the compiler ensures that the operations performed with the variable are compatible with its type.

C++ is a statically typed language, which means that it uses static typing to determine data types and perform type checking during compile time. This helps with ensuring type safety and can prevent certain types of errors from occurring during the execution of the program.

Here's a simple code example to demonstrate static typing in C++:

```cpp
#include <iostream>

int main() {
    int num = 42;        // 'num' is statically typed as an integer
    double pi = 3.14159; // 'pi' is statically typed as a double

    num = pi; // This assignment would cause a compile-time error as the types don't match

    std::cout << "The value of num is: " << num << std::endl;
    std::cout << "The value of pi is: " << pi << std::endl;

    return 0;
}
```

In the code above, the variable `num` is statically typed as an `int`, and `pi` is statically typed as a `double`. If you attempt to assign the value of `pi` to `num`, you'll get a compile-time error. This is because the static typing system ensures that variables are only used with compatible data types.