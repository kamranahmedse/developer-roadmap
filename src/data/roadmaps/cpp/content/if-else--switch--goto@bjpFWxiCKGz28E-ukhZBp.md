# If-Else / Switch / Goto

C++ provides you with tools which helps you to control the way your program behaves (logic flows) based on how the user interact with your program. Here we will discuss about `if-else`, `switch` and `goto` statements which are three of the common ways to guide the flow of logic in your code.

## If-Else statement

The `if/else` statement is used to decide on which path (branch) your program needs to continue executing based on a given condition. There are two different variations you can use based on your needs:

```cpp
// The `if` statement with only the `true` branch.
// Useful when a piece of code should simply be skipped
// if the condition is false and no alternate code
// needs to be executed:
if (condition) {
    // block of code to execute IF the `condition` evaluates to `true`
}

// The `if/else` statement to choose one of two code blocks
// to execute depending on the condition:
if (condition) {
    // block of code to execute IF the `condition` evaluates to `true`
} else {
    // block of code to execute IF the `condition` evaluates to `false`
```

In both of these cases once the chosen code block (or the only code block given in the first variant) completes the code following after the `if` or `if/else` statement will continue skipping the branch of the `if`/`if/else` that was not chosen.

It is also possible to chain multiple conditions with `if/else if/else` statement:

```cpp
if (conditionA) {
    // block of code to execute IF the `conditionA` evaluates to `true`
} else if (conditionB) {
    // block of code to execute IF the `conditionA` evaluates to `false`
    // and `conditionB` evaluates to `true`
}

// or

if (conditionA) {
    // block of code to execute IF the `conditionA` evaluates to `true`
} else if (conditionB) {
    // block of code to execute IF the `conditionA` evaluates to `false`
    // and `conditionB` evaluates to `true`
} else {
    // block of code to execute IF all the conditions above evaluate to `false`
}
```

You can have as many `else if` sections as you want and the `else` section at the end is optional. Be mindful that when using the `if/else if/else` statement only the first code block from the top that has its `condition` evaluate to `true` will execute and the rest will be skipped even if the conditions of subsequent code blocks bellow evaluate to `true`.

Example:

```cpp
#include <iostream>

int main() {
    std::cout << "Enter an integer number: ";
    int number{};
    std::cin >> number;

    if (number < 0) {
        std::cout << "The number is negative.\n";
    } else if (number > 0) {
        std::cout << "The number is positive.\n";
    } else {
        std::cout << "The number is zero.\n";
    }

    return 0;
}
```

## Switch statement

A chain of `if/else if/else` staements will need to evaluate each condition in sequence to find the branch that needs to be executed. This can take some time. For this reason and when looking for specific numeric or enumeration values C++ offers the `switch` statement:

```cpp
switch (numericExpression) {
case 1:
    // code to execute when `numericExpression` evaluates to value `1`
    break;
case 2:
    // code to execute when `numericExpression` evaluates to value `2`
    break;
default:
    // code to execute when `numericExpression` value does not match any `case` labels above
    break;
}
```

The `case` sections each is typically terminated with either `break` or `return` keyword. Skipping this termination will cause the code execution to "fall through" to the next case block bellow and may cause compiler warning.

The `default` section is optional and acts as a catch-all fallback in case none of the cases above matched.

Example:

```cpp
#include <iostream>

int main() {
    std::cout << "Enter an integer number: ";
    int a{};
    std::cin >> a;

    std::cout << "Enter another integer number: ";
    int b{};
    std::cin >> b;

    std::cout << "Enter the mathematical operation (+, -, * or /): ";
    char op{};
    std::cin >> op;

    switch (op) {
    case '+':
        std::cout << a << " + " << b << " = " << a + b << '\n';
        break;
    case '-':
        std::cout << a << " - " << b << " = " << a - b << '\n';
        break;
    case '*':
        std::cout << a << " * " << b << " = " << a * b << '\n';
        break;
    case '/':
        if (b == 0) {
            std::cout << "Division by zero is not allowed\n";
        } else {
            std::cout << a << " / " << b << " = " << a / b << '\n';
        }
        break;
    default:
        std::cout << "Unknown operator '" << op << "'.\n";
        break;
    }

    return 0;
}
```

## Goto statement

Both the `if` and `switch` statements are considered "conditional jump" statements. C++ also offers the unconditional jump statement `goto` that causes the code to always jump to a labeled part of the function it's executed in.

Example:

```cpp
#include<iostream>

int main() {
    int x{};
tryAgain:
    std::cout << "Enter a positive number; ";
    std::cin >> x;

    if (x <= 0) {
        goto tryAgain;
    }

    std::cout << "Your positive number is " << x << '\n';

    return 0;
}
```

Note however that in modern programming the `goto` statement is considered bad practice and should be avoided since it can be replaced with other C++ control flow statements.

Visit the following resources to learn more:

- [@article@If statements and blocks](https://www.learncpp.com/cpp-tutorial/if-statements-and-blocks/)
- [@article@Switch statement basics](https://www.learncpp.com/cpp-tutorial/switch-statement-basics/)
- [@article@Goto statements](https://www.learncpp.com/cpp-tutorial/goto-statements/)
- [@video@The 'if-else' Statement in C++](https://www.youtube.com/watch?v=9-BjXs1vMSc)
- [@video@Learn C++ With Me - Switch Statement](https://www.youtube.com/watch?v=uOlLs1OYSSI)
- [@video@Why is it illegal to use "goto"?](https://www.youtube.com/watch?v=AKJhThyTmQw)
