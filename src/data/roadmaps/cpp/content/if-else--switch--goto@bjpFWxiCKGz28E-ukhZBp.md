# Conditional and Jump Statements in C++

Conditional and jump statements are essential concepts in C++ that let you control the flow of your program. They enable you to execute code blocks based on conditions or jump to specific sections of your code. In this guide, we'll cover three main constructs: **if-else**, **switch**, and **goto**.

---

## If-Else Statement

The **if-else** statement is used to execute a block of code only if a specified condition is true. You can extend it with additional conditions using **else if** and include a final **else** block for cases when none of the conditions hold.

**Syntax:**
```cpp
if (condition) {
    // Code to execute if condition is true
} else if (anotherCondition) {
    // Code to execute if anotherCondition is true
} else {
    // Code to execute if none of the above conditions are true
}
```

**Example:**
```cpp
#include <iostream>

int main() {
    int number = 10;

    if (number > 0) {
        std::cout << "The number is positive." << std::endl;
    } else if (number < 0) {
        std::cout << "The number is negative." << std::endl;
    } else {
        std::cout << "The number is zero." << std::endl;
    }

    return 0;
}
```

---

## Switch Statement

The **switch** statement is used for multi-way branching based on the value of an expression. It compares the expression to a series of constant cases and executes the corresponding block. Use the `break` statement to exit the switch after a case is executed, and include a `default` case to handle values that do not match any case.

**Syntax:**
```cpp
switch (expression) {
    case constant1:
        // Code block for constant1
        break;
    case constant2:
        // Code block for constant2
        break;
    // You can have as many cases as needed
    default:
        // Code block if no cases match
}
```

**Example:**
```cpp
#include <iostream>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
            std::cout << "Excellent!" << std::endl;
            break;
        case 'B':
            std::cout << "Good job!" << std::endl;
            break;
        case 'C':
            std::cout << "Well done!" << std::endl;
            break;
        default:
            std::cout << "Grade not recognized." << std::endl;
    }

    return 0;
}
```

---

## Goto Statement

The **goto** statement provides an unconditional jump from the `goto` to a labeled statement within the same function. Although its use is generally discouraged due to potential impacts on code readability and maintainability, it can be useful in scenarios like breaking out of deeply nested loops.

**Syntax:**
```cpp
goto labelName;
// ...
labelName:
    // Code to execute after jump
```

**Example:**
```cpp
#include <iostream>

int main() {
    int count = 0;

start:
    std::cout << "Count is: " << count << std::endl;
    count++;

    if (count < 5)
        goto start;  // Jump back to the label 'start'

    return 0;
}
```

---

## Summary

- **If-Else:** Allows decision-making by executing different code blocks based on conditions.
- **Switch:** Offers a cleaner syntax for handling multiple discrete values of an expression.
- **Goto:** Provides a way to jump to a specific label; use it sparingly to keep your code clear.

Learn more from the following resources:

- [@article@GeeksforGeeks – if‑else Statement in C++](https://www.geeksforgeeks.org/c-c-if-else-statement-with-examples/)  
- [@article@GeeksforGeeks – Switch Statement in C++](https://www.geeksforgeeks.org/switch-statement-in-cpp/)  
- [@article@TutorialsPoint – C++ goto Statement](https://www.tutorialspoint.com/cplusplus/cpp_goto_statement.htm)
