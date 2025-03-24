# Exit Codes

Exit codes, also known as "return codes" or "status codes", are numeric values that a program returns to the calling environment (usually the operating system) when it finishes execution. These codes are used to indicate the success or failure of a program's execution.

0 is the standard exit code for a successful execution, while non-zero exit codes typically indicate errors or other exceptional situations. The actual meanings of non-zero exit codes can vary between different applications or systems.

In C++, you can return an exit code from the `main` function by using the `return` statement, or you can use the `exit()` function, which is part of the C++ Standard Library.

## Example: Using return in `main`

```cpp
#include <iostream>

int main() {
    // Some code here...

    if (/*some error condition*/) {
        std::cout << "An error occurred." << '\n';
        return 1;
    }

    // More code here...

    if (/*another error condition*/) {
        std::cout << "Another error occurred." << '\n';
        return 2;
    }

    return 0; // Successful execution
}
```

## Example: Using the `exit()` function

```cpp
#include <iostream>
#include <cstdlib>

void some_function() {
    // Some code here...

    if (/*some error condition*/) {
        std::cout << "An error occurred." << '\n';
        std::exit(1);
    }

    // More code here...
}

int main() {
    some_function();

    // Some other code here...

    return 0; // Successful execution
}
```

In both examples above, the program returns exit codes depending on different error conditions encountered during execution. The codes 1 and 2 are used to distinguish between the two error conditions.