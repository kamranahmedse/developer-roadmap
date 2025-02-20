# First Program in C++

In this section, we'll discuss the basic structure of a C++ program, walk you through your first program (the "Hello, World!" example), and provide additional explanations of its syntax.

## Hello, World!

The first program that most people learn to write in any programming language is often a simple one that displays the message "Hello, World!" on the screen. Here's the classic "Hello, World!" program in C++:

```cpp
#include <iostream>

int main() {
  std::cout << "Hello, World!\n";
  return 0;
}
```

Let's break down the different components of this program:

## Header Files & Preprocessor Directives

The first line of the program `#include <iostream>` is a [preprocessor directive](https://en.cppreference.com/w/cpp/preprocessor) that tells the compiler to include the header file `iostream`. Header files provide function and class declarations that we can use in our C++ programs.

```cpp
#include <iostream>
```

## `main()` Function

In C++, the `main()` function serves as the entry point of your program. The operating system runs your program by calling this `main()` function. It should be defined only once in your program and must return an integer. The keyword `int` is the return type of this function which is an integer. Unlike C in C++ it is mandatory to have `int` as the return type for the `main` function.

```cpp
int main() {
  // Your code goes here.
}
```

## Output to the Console

To output text to the console, we use the `std::cout` object and the insertion operator `<<`. In the "Hello, World!" example, we used the following line to print "Hello, World!" to the console:

```cpp
std::cout << "Hello, World!\n";
```
- `std`: This is the namespace where C++ standard library entities (classes and functions) reside. It stands for "standard" and is an abbreviation for the Standard Template Library (STL).
- `std::cout`: The standard "character output" stream that writes to the console
- `"Hello, World!"`: The string literal to print
- `std::endl`: The "end line" manipulator that inserts a newline character and flushes the output buffer

## Return Statement

Lastly, the `return 0;` statement informs the operating system that the program executed successfully. Returning any other integer value indicates that an error occurred:

```cpp
return 0;
```

Now that you understand the basic components of a C++ program, you can write your first program, compile it, and run it to see the "Hello, World!" message displayed on the screen.
