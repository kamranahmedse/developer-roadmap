# Function Overloading
Function overloading in C++ allows multiple functions to share the same name, provided they differ in the number or types of parameters. This facilitates compile-time polymorphism, enhancing code readability and maintainability by enabling functions to perform similar operations on different data types or argument counts.
### Example
```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3) << std::endl;       // Outputs: 5
    std::cout << add(2.5, 3.1) << std::endl;   // Outputs: 5.6
    return 0;
}
```
In this example, the `add` function is overloaded to handle both integer and double parameters. The compiler determines the appropriate function to invoke based on the argument types at compile time.

Visit the following resources to learn more:

- [@official@Function Overloading - Microsoft Learn](https://learn.microsoft.com/en-us/cpp/cpp/function-overloading)
- [@article@Function Overloading in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/function-overloading-c/)
- [@article@C++ Function Overloading - W3Schools](https://www.w3schools.com/cpp/cpp_function_overloading.asp)
