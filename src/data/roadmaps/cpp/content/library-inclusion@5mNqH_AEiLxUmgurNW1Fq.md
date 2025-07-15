# Inclusion in C++

In C++ programming, inclusion refers to incorporating external libraries, header files, or other code files into your program. This process allows developers to access pre-built functions, classes, and variable declarations that can be used in their own code. There are two types of inclusion in C++:

- Header Inclusion
- Source Inclusion

### Header Inclusion

Header inclusion involves including header files using the preprocessor directive `#include`. Header files are typically used to provide function prototypes, class declarations, and constant definitions that can be shared across multiple source files. There are two ways to include header files in your program:

- Angle brackets `<>`: Used for including standard library headers, like `iostream`, `vector`, or `algorithm`.

Example:
```cpp
#include <iostream>
#include <vector>
```

- Double quotes `""`: Used for including user-defined headers or headers provided by third-party libraries.

Example:
```cpp
#include "myHeader.h"
#include "thirdPartyLibrary.h"
```

### Source Inclusion

Source inclusion refers to including the content of a source file directly in another source file. This approach is generally not recommended as it can lead to multiple definitions and increased compile times but it can occasionally be useful for certain tasks (e.g., templates or simple small programs). To include a source file, you can use the `#include` directive with double quotes, just like with header files:

Example:
```cpp
#include "mySourceFile.cpp"
```

Remember, using source inclusion for large projects or in situations where it's not necessary can lead to unexpected issues and should be avoided.