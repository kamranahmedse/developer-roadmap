# Code Splitting

Code splitting refers to the process of breaking down a large code base into smaller, more manageable files or modules. This helps improve the organization, maintainability, and readability of the code. In C++, code splitting is generally achieved through the use of separate compilation, header files, and source files.

### Header Files (.h or .hpp)

Header files, usually with the `.h` or `.hpp` extension, are responsible for declaring classes, functions, and variables that are needed by multiple source files. They act as an interface between different parts of the code, making it easier to manage dependencies and reduce the chances of duplicated code.

Example of a header file:

```cpp
// example.h
#ifndef EXAMPLE_H
#define EXAMPLE_H

class Example {
public:
    void printMessage();
};

#endif
```

### Source Files (.cpp)

Source files, with the `.cpp` extension, are responsible for implementing the actual functionality defined in the corresponding header files. They include the header files as needed and provide the function and class method definitions.

Example of a source file:

```cpp
// example.cpp
#include "example.h"
#include <iostream>

void Example::printMessage() {
    std::cout << "Hello, code splitting!" << '\n';
}
```

### Separate Compilation

C++ allows for separate compilation, which means that each source file can be compiled independently into an object file. These object files can then be linked together to form the final executable. This provides faster build times when making changes to a single source file since only that file needs to be recompiled, and the other object files can be reused.

Example of separate compilation and linking:

```sh
# Compile each source file into an object file
g++ -c main.cpp -o main.o
g++ -c example.cpp -o example.o

# Link object files together to create the executable
g++ main.o example.o -o my_program
```

By following the code splitting technique, you can better organize your C++ codebase, making it more manageable and maintainable.