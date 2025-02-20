# Overview

Exception handling in C++ is a mechanism to handle errors, anomalies, or unexpected events that can occur during the runtime execution of a program. This allows the program to continue running or exit gracefully when encountering errors instead of crashing abruptly.

C++ provides a set of keywords and constructs for implementing exception handling:

- `try`: Defines a block of code that should be monitored for exceptions.
- `catch`: Specifies the type of exception to be caught and the block of code that shall be executed when that exception occurs.
- `throw`: Throws an exception that will be caught and handled by the appropriate catch block.
- `noexcept`: Specifies a function that doesn't throw exceptions or terminates the program if an exception is thrown within its scope.

## Example

Here's an example demonstrating the basic usage of exception handling:

```cpp
#include <iostream>

int divide(int a, int b) {
    if (b == 0) {
        throw "Division by zero!";
    }
    return a / b;
}

int main() {
    int num1, num2;

    std::cout << "Enter two numbers for division: ";
    std::cin >> num1 >> num2;

    try {
        int result = divide(num1, num2);
        std::cout << "The result is: " << result << '\n';
    } catch (const char* msg) {
        std::cerr << "Error: " << msg << '\n';
    }

    return 0;
}
```

In this example, we define a function `divide` that throws an exception if `b` is zero. In the `main` function, we use a `try` block to call `divide` and output the result. If an exception is thrown, it is caught inside the `catch` block, which outputs an error message. This way, we can handle the error gracefully rather than letting the program crash when attempting to divide by zero.

## Standard Exceptions

C++ provides a standard set of exception classes under the `<stdexcept>` library which can be used as the exception type for more specific error handling. Some of these classes include:

- `std::exception`: Base class for all standard exceptions.
- `std::logic_error`: Represents errors which can be detected statically by the program.
- `std::runtime_error`: Represents errors occurring during the execution of a program.

Here's an example showing how to use standard exceptions:

```cpp
#include <iostream>
#include <stdexcept>

int divide(int a, int b) {
    if (b == 0) {
        throw std::runtime_error("Division by zero!");
    }
    return a / b;
}

int main() {
    int num1, num2;

    std::cout << "Enter two numbers for division: ";
    std::cin >> num1 >> num2;

    try {
        int result = divide(num1, num2);
        std::cout << "The result is: " << result << '\n';
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << '\n';
    }

    return 0;
}
```

In this example, we modified the `divide` function to throw a `std::runtime_error` instead of a simple string. The catch block now catches exceptions derived from `std::exception` and uses the member function `what()` to display the error message.