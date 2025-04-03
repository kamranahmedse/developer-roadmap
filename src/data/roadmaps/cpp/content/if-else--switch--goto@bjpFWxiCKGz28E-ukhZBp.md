# If-Else / Switch / Goto

## If-Else Statement

The `if-else` statement allows conditional execution based on boolean expressions.

```cpp
#include <iostream>

int main() {
    int num = 10;

    // Check if the number is positive, negative, or zero
    if (num > 0) {
        std::cout << "Number is positive" << std::endl;
    } else if (num < 0) {
        std::cout << "Number is negative" << std::endl;
    } else {
        std::cout << "Number is zero" << std::endl;
    }
    return 0;
}
```

### Explanation:
- If `num` is greater than zero, it prints "Number is positive."
- If `num` is less than zero, it prints "Number is negative."
- Otherwise, it prints "Number is zero."

---

## Switch Statement

The `switch` statement is used when multiple conditions depend on a single variable.

```cpp
#include <iostream>

int main() {
    int choice = 2;

    // Evaluating different cases based on the value of 'choice'
    switch (choice) {
        case 1:
            std::cout << "You chose option 1" << std::endl;
            break; // Exit switch after executing this case
        case 2:
            std::cout << "You chose option 2" << std::endl;
            break;
        case 3:
            std::cout << "You chose option 3" << std::endl;
            break;
        default:
            std::cout << "Invalid choice" << std::endl;
    }
    return 0;
}
```

### Explanation:
- Depending on the value of `choice`, a corresponding message is printed.
- The `break` statement ensures that the control exits after the matched case.
- If no cases match, the `default` case executes.

---

## Goto Statement

The `goto` statement allows jumping to a labeled statement within a function.

```cpp
#include <iostream>

int main() {
    int num = 5;
    
    // If condition is met, jump to 'label'
    if (num < 10)
        goto label;
    
    std::cout << "This will be skipped" << std::endl;
    
    label:
    std::cout << "Jumped to label" << std::endl;
    
    return 0;
}
```

### Explanation:
- If `num` is less than 10, execution jumps to `label`.
- The statement between `if` and `label:` is skipped.

Visit the following resources to learn more:

- [@video@if-else/The 'if-else' Statement in C++](https://www.youtube.com/watch?v=9-BjXs1vMSc)
- [@video@switch/Learn C++ With Me - Switch Statement](https://www.youtube.com/watch?v=uOlLs1OYSSI)
- [@video@goto/C++ Tutorial for Beginners - Break, Continue, and Goto](https://www.youtube.com/watch?v=ikGk4ZZ-uYE&t=14s)