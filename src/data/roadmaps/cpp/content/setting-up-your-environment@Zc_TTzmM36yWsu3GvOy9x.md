# Setting Up C++

Setting up C++ requires a few steps, including installing a compiler, configuring an Integrated Development Environment (IDE), and creating a new C++ project.

## 1. Installing a Compiler

A compiler is required to convert C++ code into machine language. Some popular C++ compilers include:

- GCC (GNU Compiler Collection) for Linux and macOS, but can also be used on Windows through MinGW
- MSVC (Microsoft Visual C++) for Windows

To install a compiler, simply follow the instructions provided by the respective websites.

## 2. Configuring an IDE

An IDE is a software application that provides facilities for programming, such as code editing, debugging, and building. Some popular C++ IDEs include:

- [@article@Visual Studio](https://visualstudio.microsoft.com/vs/features/cplusplus/) (Windows, macOS)
- [@article@Eclipse](https://eclipse.org) (Windows, macOS, Linux)
- [@article@Code::Blocks](http://www.codeblocks.org) (Windows, macOS, Linux)

After downloading and installing an IDE, you might need to configure it to use the installed compiler. Check the documentation of the respective IDE for instructions on how to do this.

## 3. Creating a New C++ Project

Once you have your IDE and compiler set up, you can create a new C++ project and start writing code. In general, follow these steps to create a new C++ project:

- Open the IDE and create a new project.
- Select the project type (C++ Application or Console Application).
- Specify the project name and location.
- Let the IDE generate the main.cpp and build files (such as Makefile or CMakeLists.txt) for you.

## Example: Hello World in C++

Create a new file called `main.cpp` within your project and include this code:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << '\n';
    return 0;
}
```

Then, follow the IDE's instructions to build and run your program. You should see "Hello, World!" displayed in the console.

## Summary

Setting up C++ involves:

- Installing a compiler (e.g. GCC, MinGW, or MSVC)
- Configuring an IDE (e.g. Visual Studio, Eclipse, or Code::Blocks)
- Creating a new C++ project and writing code

By following these steps, you'll be ready to start developing C++ applications!
