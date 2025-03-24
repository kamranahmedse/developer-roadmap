# Conditional and Jump Statements in C++

Conditional and jump statements control the flow of a program based on conditions or direct jumps. The if-else statement executes different blocks of code depending on a condition. The switch statement is useful for handling multiple cases efficiently. The goto statement jumps to a labeled part of the program but is discouraged due to readability issues.

## If-Else Statement

The if-else statement allows conditional execution of code.

Here is the syntax for `if-else` Statement:

```cpp
if (condition) {
    // Code executes if the condition is true
} else if (anotherCondition) {
    // Code executes if anotherCondition is true
} else {
    // Code executes if no conditions are met
}
```
For example:

```cpp
#include <iostream>

int main() {
    int number = 10;

    if (number > 0) {
        std::cout << "Positive" << std::endl;
    } else if (number < 0) {
        std::cout << "Negative" << std::endl;
    } else {
        std::cout << "Zero" << std::endl;
    }

    return 0;
}
```

## Switch Statement

The switch statement is used when multiple possible values determine the program flow.

Here is the syntax for `switch` Statement:

```cpp
switch (expression) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Code if no cases match
}
```

For example:

```cpp
#include <iostream>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
            std::cout << "Excellent" << std::endl;
            break;
        case 'B':
            std::cout << "Good job" << std::endl;
            break;
        default:
            std::cout << "Try harder" << std::endl;
    }

    return 0;
}
```

## Goto Statement

The goto statement allows jumping to a labeled part of the program.

Here is the syntax for `goto` Statement:

```cpp
goto label;
// Some code
label:
    // Code executes after the jump
```
For example:

```cpp
#include <iostream>

int main() {
    int count = 0;

start:
    std::cout << "Count: " << count << std::endl;
    count++;

    if (count < 5)
        goto start;

    return 0;
}
```

In summary, Conditional and jump statements direct program flow. If-else handles conditions, switch manages multiple values, and goto allows jumps but reduces readability.

Learn more from the following resources:

- [@article@if-else Statement](https://www.geeksforgeeks.org/c-c-if-else-statement-with-examples/)
- [@article@Switch Statement](https://www.geeksforgeeks.org/switch-statement-in-cpp/)
- [@article@Goto Statement](https://www.tutorialspoint.com/cplusplus/cpp_goto_statement.htm)
