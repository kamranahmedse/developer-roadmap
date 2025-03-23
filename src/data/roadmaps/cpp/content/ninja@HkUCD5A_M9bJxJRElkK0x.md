# Ninja

Ninja is a small build system with a focus on speed. It is designed to handle large projects by generating build files that implement the minimal amount of work necessary to build the code. This results in faster build times, especially for large codebases. Ninja is often used in conjunction with other build systems like CMake, which can generate Ninja build files for you.

Ninja build files are typically named `build.ninja` and contain rules, build statements, and variable declarations. Here's a simple example of a Ninja build file for a C++ project:

```
# Variable declarations
cxx = g++
cflags = -Wall -Wextra -std=c++17

# Rule for compiling the C++ files
rule cxx_compile
  command = $cxx $cflags -c $in -o $out

# Build statements for the source files
build main.o: cxx_compile main.cpp
build foo.o: cxx_compile foo.cpp

# Rule for linking the object files
rule link
  command = $cxx $in -o $out

# Build statement for the final executable
build my_program: link main.o foo.o
```

To build the project using this `build.ninja` file, simply run `ninja` in the terminal:

```bash
$ ninja
```

This will build the `my_program` executable by first compiling the `main.cpp` and `foo.cpp` files into object files, and then linking them together.