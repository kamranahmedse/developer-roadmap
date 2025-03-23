# Introduction to C++

C++ is a general-purpose, high-performance programming language. It was developed by Bjarne Stroustrup at Bell Labs starting in 1979. C++ is an extension of the C programming language, adding features such as classes, objects, and exceptions.

## Basics of C++ Programming

Here are some basic components and concepts in C++ programming:

## Including Libraries

In C++, we use the `#include` directive to include libraries or header files into our program. For example, to include the standard input/output library, we write:

```cpp
#include <iostream>
```

## Main Function

The entry point of a C++ program is the `main` function. Every C++ program must have a `main` function:

```cpp
int main() {
    // Your code goes here
    return 0;
}
```

## Input/Output

To perform input and output operations in C++, we can use the built-in objects `std::cin` for input and `std::cout` for output, available in the `iostream` library. Here's an example of reading an integer and printing its value:

```cpp
#include <iostream>

int main() {
    int number;
    std::cout << "Enter an integer: ";
    std::cin >> number;
    std::cout << "You entered: " << number << std::endl;
    return 0;
}
```

## Variables and Data Types

C++ has several basic data types for representing integer, floating-point, and character values:

- `int`: integer values
- `float`: single-precision floating-point values
- `double`: double-precision floating-point values
- `char`: single characters
- `bool`: boolean values

Variables must be declared with a data type before they can be used:

```cpp
int x;
float y;
double z;
char c;
bool b;
```

## Control Structures

C++ provides control structures for conditional execution and iteration, such as `if`, `else`, `while`, `for`, and `switch` statements.

### If-Else Statement
```cpp
if (condition) {
    // Code to execute if the condition is true
} else {
    // Code to execute if the condition is false
}
```

### While Loop
```cpp
while (condition) {
    // Code to execute while the condition is true
}
```

### For Loop
```cpp
for (initialization; condition; update) {
    // Code to execute while the condition is true
}
```

### Switch Statement
```cpp
switch (variable) {
    case value1:
        // Code to execute if variable == value1
        break;
    case value2:
        // Code to execute if variable == value2
        break;
    // More cases...
    default:
        // Code to execute if variable does not match any case value
}
```

## Functions

Functions are reusable blocks of code that can be called with arguments to perform a specific task. Functions are defined with a return type, a name, a parameter list, and a body.

```cpp
ReturnType functionName(ParameterType1 parameter1, ParameterType2 parameter2) {
    // Function body
    // ...
    return returnValue;
}
```

For example, here's a function that adds two integers and returns the result:

```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 4);
    std::cout << "3 + 4 = " << result << std::endl;
    return 0;
}
```

This basic introduction to C++ should provide you with a good foundation for further learning. Explore more topics such as classes, objects, inheritance, polymorphism, templates, and the Standard Template Library (STL) to deepen your understanding of C++ and start writing more advanced programs.

Learn more from the following resources:

- [@article@LearnC++](https://www.learncpp.com/)
- [@video@C++ Full Course by freeCodeCamp](https://youtu.be/vLnPwxZdW4Y)
