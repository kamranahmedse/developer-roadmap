# Compilers

A compiler is a computer program that translates source code written in one programming language into a different language, usually machine code or assembly code, that can be executed directly by a computer's processor. In the context of C++, compilers take your written C++ source code and convert it into an executable program.

## Popular C++ Compilers

There are several popular C++ compilers available, here's a short list of some common ones:

- **GNU Compiler Collection (GCC)**: Developed by the GNU Project, GCC is an open-source compiler that supports multiple programming languages, including C++.

- **Clang**: As part of the LLVM project, Clang is another open-source compiler that supports C++ and is known for its fast compilation times and extensive diagnostics.

- **Microsoft Visual C++ (MSVC)**: MSVC is a commercial compiler provided by Microsoft as part of Visual Studio, and it's widely used on Windows platforms.

- **Intel C++ Compiler (ICC)**: ICC is a commercial compiler provided by Intel and is known for its ability to optimize code for the latest Intel processors.

## Example of a Simple C++ Compilation

Let's say you have a simple C++ program saved in a file called `hello.cpp`:

```cpp
#include <iostream>

int main() {
  std::cout << "Hello, World!\n";
  return 0;
}
```

You can compile this program using the GCC compiler by executing the following command in a command-line/terminal:

```bash
g++ hello.cpp -o hello
```

This will generate an executable file called `hello` (or `hello.exe` on Windows) which you can run to see the output "Hello, World!".

## Note

When learning about compilers, it's essential to know that they work closely with the linker and the standard library. The linker takes care of combining compiled object files and libraries into a single executable, while the standard library provides implementations for common functionalities used in your code.