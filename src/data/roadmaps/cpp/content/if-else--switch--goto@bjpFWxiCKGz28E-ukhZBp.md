# Branching Statements

Branching statements allow you to conditionally or unconditionally execute different parts of your code. The branching statements that will be covered are `if-else`, `switch`, and `goto`.

## if-else
The `if-else` statement is a conditional branching statement that allows you to execute one of two blocks of code depending on whether a condition is satisfied. This statement is useful for making decisions based on a boolean expression. The syntax for the `if-else` statement is:

```cpp
if (condition) {
    // Block of code executed if the condition is true
} else {
    // Block of code executed if the condition is false
}
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 5;
    if (a > b) {
        cout << "a is greater than b";
    } else {
        cout << "b is greater than a";
    }
}
```

## switch
The `switch` statement allows you to execute different blocks of code based on the value of a `control variable`. It uses `cases` to define code blocks that run when a specific value matches. A `default` case is executed if none of the other cases match. Each `case` must end with a `break` statement; otherwise, all following cases will execute. `switch` is useful when you want to compare a `control variable` to multiple constant values. The syntax for the `switch` statement is:

```cpp
switch (control_variable) {
    case 1: {
        // Code to be executed for case 1
        break;
    }
    case 2: {
        // Code to be executed for case 2
        break;
    }
    default: {
        // Code to be executed if no cases match
        break;
    }
}
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    int ch;
    cout << "Select a language: 1. English 2. French";
    cin >> ch;
    switch (ch) {
        case 1: {
            cout << "Good morning!";
            break;
        }
        case 2: {
            cout << "Bonjour!";
            break;
        }
        default: {
            cout << "The option does not exist :)";
            break;
        }
    }
}
```

## goto
The `goto` statement allows you to unconditionally jump to different parts of your program using `labels` as location points. The syntax for `goto` is:

```cpp
goto label_name;
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "This is line 1";
    goto line_3;

    // This line will be skipped
    cout << "This line will be skipped";

line_3:
    cout << "This is line 3";
}
```

- [@article@C++ if else](https://www.w3schools.com/cpp/cpp_conditions.asp)
- [@article@C++ switch](https://www.w3schools.com/cpp/cpp_switch.asp)
- [@article@C++ goto](https://www.programiz.com/cpp-programming/goto)
