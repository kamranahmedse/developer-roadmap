# Structuring Codebase

Structuring codebase is an essential part of software development that deals with organizing and modularizing your code to make it more maintainable, efficient, and easier to understand. A well-structured codebase enhances collaboration, simplifies adding new features, and makes debugging faster. In C++, there are various techniques to help you structure your codebase effectively.

## Namespaces

Namespaces are one of the tools in C++ to organize your code by providing a named scope for different identifiers you create, like functions, classes, and variables. They help avoid name clashes and make your code more modular.

```cpp
namespace MyNamespace {
    int aFunction() {
        // function implementation
    }
}
// to use the function
MyNamespace::aFunction();
```

## Include Guards

Include guards are a tool for preventing multiple inclusions of a header file in your project. They consist of preprocessor directives that conditionally include the header file only once, even if it's included in multiple places.

```cpp
#ifndef MY_HEADER_FILE_H
#define MY_HEADER_FILE_H

// Your code here

#endif // MY_HEADER_FILE_H
```

## Header and Source Files

Separating your implementation and declarations into header (*.h) and source (*.cpp) files is a key aspect of structuring your codebase in C++. Header files usually contain class and function declarations, while source files contain their definitions.

// MyClass.h
```cpp
#ifndef MY_CLASS_H
#define MY_CLASS_H

class MyClass
{
public:
    MyClass();
    int myMethod();
};
 
#endif // MY_CLASS_H
```

// MyClass.cpp
```cpp
#include "MyClass.h"

MyClass::MyClass() {
    // constructor implementation
}

int MyClass::myMethod() {
    // method implementation
}
```

## Code Formatting

Consistent code formatting and indentation play a crucial role in structuring your codebase, making it easier to read and understand for both you and other developers. A style guide such as the [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html) can help you maintain consistent formatting throughout your project.