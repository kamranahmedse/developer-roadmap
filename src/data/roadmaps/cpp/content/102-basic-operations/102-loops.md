# Loops in C++

Loops are an essential concept in programming that allow you to execute a block of code repeatedly until a specific condition is met. In C++, there are three main types of loops: `for`, `while`, and `do-while`.

## For Loop

A `for` loop is used when you know the number of times you want to traverse through a block of code. It consists of an initialization statement, a condition, and an increment/decrement operation.

Here's the syntax for a `for` loop:

```cpp
for (initialization; condition; increment/decrement) {
    // block of code to execute
}
```

For example:

```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 5; i++) {
        std::cout << "Iteration: " << i << std::endl;
    }
    return 0;
}
```

## While Loop

A `while` loop runs as long as a specified condition is `true`. The loop checks for the condition before entering the body of the loop.

Here's the syntax for a `while` loop:

```cpp
while (condition) {
    // block of code to execute
}
```

For example:

```cpp
#include <iostream>

int main() {
    int i = 0;
    while (i < 5) {
        std::cout << "Iteration: " << i << std::endl;
        i++;
    }
    return 0;
}
```

## Do-While Loop

A `do-while` loop is similar to a `while` loop, with the key difference being that the loop body is executed at least once, even when the condition is `false`.

Here's the syntax for a `do-while` loop:

```cpp
do {
    // block of code to execute
} while (condition);
```

For example:

```cpp
#include <iostream>

int main() {
    int i = 0;
    do {
        std::cout << "Iteration: " << i << std::endl;
        i++;
    } while (i < 5);
    return 0;
}
```

In summary, loops are an integral part of C++ programming that allow you to execute a block of code multiple times. The three types of loops in C++ are `for`, `while`, and `do-while`. Each type has its own specific use case and can be chosen depending on the desired behavior.

Learn more from the following resources:

- [@article@C++ For Loop](https://www.w3schools.com/cpp/cpp_for_loop.asp)