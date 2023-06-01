# C vs C++
C and C++ are two popular programming languages with some similarities, but they also have key differences. C++ is an extension of the C programming language, with added features such as object-oriented programming, classes, and exception handling. Although both languages are used for similar tasks, they have their own syntax and semantics, which makes them distinct from each other.

## Syntax and Semantics

### C
- C is a procedural programming language.
- Focuses on functions and structured programming.
- Does not support objects or classes.
- Memory management is manual, using functions like `malloc` and `free`.

```c
#include <stdio.h>

void printHello() {
    printf("Hello, World!\n");
}

int main() {
    printHello();
    return 0;
}
```

### C++
- C++ is both procedural and object-oriented.
- Supports both functions and classes.
- Incorporates different programming paradigms.
- Memory management can be manual (like C) or rely on constructors/destructors and smart pointers.

```cpp
#include <iostream>

class HelloWorld {
public:
    void printHello() {
        std::cout << "Hello, World!" << std::endl;
    }
};

int main() {
    HelloWorld obj;
    obj.printHello();
    return 0;
}
```

## Code Reusability and Modularity

### C
- Code reusability is achieved through functions and modular programming.
- High cohesion and low coupling are achieved via structured design.
- Function libraries can be created and included through headers.

### C++
- Offers better code reusability with classes, inheritance, and polymorphism.
- Code modularity is enhanced through namespaces and well-designed object-oriented hierarchy.

## Error Handling

### C
- Error handling in C is done primarily through return codes.
- Lacks support for exceptions or any built-in error handling mechanism.

### C++
- Offers exception handling, which can be used to handle errors that may occur during program execution.
- Enables catching and handling exceptions with `try`, `catch`, and `throw` keywords, providing more control over error handling.

## Conclusion

Both C and C++ are powerful languages with unique features and capabilities. While C is simpler and focuses on procedural programming, C++ offers the versatility of using different programming paradigms and improved code organization. Understanding the differences between these two languages can help you decide which one is more suitable for your specific needs and programming style.