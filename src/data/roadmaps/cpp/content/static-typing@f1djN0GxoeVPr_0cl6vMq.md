# Static Typing

In C++, static typing means that the data type of a variable is determined at compile time, before the program is executed. This means that a variable can only be used with data of a specific type, and the compiler ensures that the operations performed with the variable are compatible with its type. If there is a mismatch, the compiler will adjust the data type of variable to match another provided it's feasible. This process is known as `Type Conversion`. If the compiler is not able to achieve type conversion, an `Invalid Type Conversion` error will be raised during compilation of the code.

C++ is a statically typed language, which means that it uses static typing to determine data types and perform type checking during compile time. This helps with ensuring type safety and can prevent certain types of errors from occurring during the execution of the program.

Here's a simple code example to demonstrate static typing in C++:

```cpp
#include <iostream>

int main() {
    int num = 65;        // 'num' is statically typed as an integer
    double pi = 3.14159; // 'pi' is statically typed as a double
    char c = 'c';        // 'c' is statically typed as a char

    c = num;    // This asssigment would convert num's value to ASCII equivalent character
    num = pi; // This assignment would convert pi's value from double type to int type
    
    std::cout << "The value of num is: " << num << '\n';
    std::cout << "The value of pi is: " << pi << '\n';
    std::cout << "The value of c is: "<< c << '\n';
    return 0;
}
```

In the code above, the variable `num` is statically typed as an `int`, `pi` is statically typed as a `double`, and `c` is statically typed as a `char`. If you attempt to assign the value of `pi` to `num`, the value `3.14159` will be converted to the integer `3` and assigned to `num`. Similarly, when the value of `num` is assigned to `c`, the compiler will convert the value `65` to its corresponding [ASCII](https://www.ascii-code.com) code, which is `A`.

Learn more from the following resources:

- [@article@Type-Coversion](https://www.programiz.com/cpp-programming/type-conversion)
- [@article@Static Vs Dynamic](https://www.techtarget.com/searchapparchitecture/tip/Static-vs-dynamic-typing-The-details-and-differences)
