# Control Flow & Statements
Control flow statements determine the order in which your code is executed, allowing your program to make decisions, execute specific code blocks repeatedly, or jump between different code sections. Mastering these helps in creating dynamic, logical, and efficient programs.

## Conditional Statements
Conditional statements execute different code blocks based on evaluated conditions.

## If-Else
Executes code based on a boolean condition.

Example:
```cpp
#include <iostream>

int main() {
    int score = 75;
    if(score >= 60){
        std::cout << "Passed";
    } else {
        std::cout << "Failed";
    }
    return 0;
}
```
## Switch 
Executes one case among many options based on a variable's value.

Example:
```cpp
#include <iostream>

int main() {
    char grade = 'B';
    switch (grade) {
        case 'A': std::cout << "Excellent"; break;
        case 'B': std::cout << "Good"; break;
        default: std::cout << "Grade not recognized";
    }
    return 0;
}
```
## Loops
Loops repeatedly execute specific code blocks.

## For Loop
Executes the code a predetermined number of times.

Example:
```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i) {
        std::cout << i << " "; // Prints 0 1 2 3 4
    }
    return 0;
}
```
## While Loop
Repeats execution as long as the condition is true.

Example:
```cpp
#include <iostream>

int main() {
    int count = 0;
    while (count < 5) {
        std::cout << count << " "; // Prints 0 1 2 3 4
        count++;
    }
    return 0;
}
```
## Do-While Loop
Executes its code block at least once before checking the condition.

Example:
```cpp
#include <iostream>

int main() {
    int num = 0;
    do {
        std::cout << num << " "; // Prints 0 1 2 3 4
        num++;
    } while (num < 5);
    return 0;
}
```
## Jump Statements
These statements alter the normal flow of execution.
- break: Exits the nearest loop or switch.
- continue: Skips the current iteration and moves to the next.
- goto: Jumps execution to a labeled statement (use sparingly).

Example:
```cpp
#include <iostream>

int main() {
    for (int i = 0; i < 10; i++) {
        if (i == 5) break;       // Stops the loop when i = 5
        if (i % 2 == 0) continue; // Skips even numbers
        std::cout << i << " ";    // Prints 1 3
    }
    return 0;
}
```
Visit the following resources to learn more: 
- [@official@Statements in C++](https://en.cppreference.com/w/cpp/language/statements)
- [@article@Control Flow Statements in Programming (Geeks for Geeks)](https://www.geeksforgeeks.org/control-flow-statements-in-programming/)
- [@article@Control Flow Cheatsheet for C++(Codecademy)](https://www.codecademy.com/learn/c-plus-plus-for-programmers/modules/control-flow-cpp/cheatsheet)