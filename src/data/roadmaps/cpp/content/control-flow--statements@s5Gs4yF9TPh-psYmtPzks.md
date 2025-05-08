# Control Flow & Statements in C++

Control flow statements in C++ determine the order in which instructions are executed within a program. They allow developers to implement logic, make decisions, and repeat actions based on specific conditions. The main control flow statements in C++ include **conditional statements**, **loops**, and **jump statements**.

## Conditional Statements

Conditional statements allow the program to execute specific blocks of code based on certain conditions. The common conditional statements in C++ are:

- **if statement**: Executes a block of code if a specified condition is true.

```cpp
#include <iostream>

int main() {
    int num = 10;

    if (num > 0) {
        std::cout << "Number is positive." << std::endl;
    }

    return 0;
}
```

- **if-else statement**: Executes one block of code if the condition is true and another block if the condition is false.

```cpp
int age = 18;

if (age >= 18) {
    std::cout << "You are eligible to vote." << std::endl;
} else {
    std::cout << "You are not eligible to vote." << std::endl;
}
```

- **else if ladder**: Evaluates multiple conditions sequentially.

```cpp
int score = 85;

if (score >= 90) {
    std::cout << "Grade: A" << std::endl;
} else if (score >= 75) {
    std::cout << "Grade: B" << std::endl;
} else if (score >= 50) {
    std::cout << "Grade: C" << std::endl;
} else {
    std::cout << "Grade: F" << std::endl;
}
```

- **switch statement**: Selects a block of code to execute based on the value of a variable or expression.

```cpp
char grade = 'B';

switch (grade) {
    case 'A':
        std::cout << "Excellent!" << std::endl;
        break;
    case 'B':
        std::cout << "Good job!" << std::endl;
        break;
    case 'C':
        std::cout << "You can do better." << std::endl;
        break;
    default:
        std::cout << "Invalid grade." << std::endl;
}
```

## Loops

Loops allow a block of code to be executed repeatedly based on a condition. Common loops in C++ include:

- **while loop**: Repeats a block of code as long as the specified condition is true.

```cpp
int i = 1;
while (i <= 5) {
    std::cout << i << " ";
    i++;
}
```

- **do-while loop**: Executes the loop at least once, regardless of the condition.

```cpp
int i = 1;
do {
    std::cout << i << " ";
    i++;
} while (i <= 5);
```

- **for loop**: Repeats a block of code a specific number of times.

```cpp
for (int i = 1; i <= 5; i++) {
    std::cout << i << " ";
}
```

## Jump Statements

Jump statements alter the flow of execution within loops or conditional statements. The main jump statements in C++ are:

- **break**: Exits a loop or switch statement prematurely.
- **continue**: Skips the current iteration of a loop and proceeds to the next iteration.
- **return**: Exits the current function and optionally returns a value.

```cpp
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // Skip 3
    }
    std::cout << i << " ";
}
```

Learn more from the following resources:

- [@article@introduction to control flow in C++](https://www.learncpp.com/cpp-tutorial/control-flow-introduction/)
