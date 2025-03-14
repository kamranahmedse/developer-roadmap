# Functions in C++

A **function** is a group of statements that perform a specific task, organized as a separate unit in a program. Functions help in breaking the code into smaller, manageable, and reusable blocks.

There are mainly two types of functions in C++:

- **Standard library functions**: Pre-defined functions available in the C++ standard library, such as `sort()`, `strlen()`, `sqrt()`, and many more. These functions are part of the standard library, so you need to include the appropriate header file to use them.

- **User-defined functions**: Functions created by the programmer to perform a specific task. To create a user-defined function, you need to define the function and call it in your code.

## Defining a Function

The general format for defining a function in C++ is:

```cpp
return_type function_name(parameter list) {
    // function body
}
```

- `return_type`: Data type of the output produced by the function. It can be `void`, indicating that the function doesn't return any value.
- `function_name`: Name given to the function, following C++ naming conventions.
- `parameter list`: List of input parameters/arguments that are needed to perform the task. It is optional, you can leave it blank when no parameters are needed.

## Example

```cpp
#include <iostream>

// Function to add two numbers
int addNumbers(int a, int b) {
    int sum = a + b;
    return sum;
}

int main() {
    int num1 = 5, num2 = 10;
    int result = addNumbers(num1, num2); // Calling the function
    std::cout << "The sum is: " << result << '\n';
    return 0;
}
```

In this example, the function `addNumbers` takes two integer parameters, `a` and `b`, and returns the sum of the numbers. We then call this function from the `main()` function and display the result.

## Function Prototypes

In some cases, you might want to use a function before actually defining it. To do this, you need to declare a **function prototype** at the beginning of your code.

A function prototype is a declaration of the function without its body, and it informs the compiler about the function's name, return type, and parameters.

```cpp
#include <iostream>

// Function prototype
int multiplyNumbers(int x, int y);

int main() {
    int num1 = 3, num2 = 7;
    int result = multiplyNumbers(num1, num2); // Calling the function
    std::cout << "The product is: " << result << '\n';
    return 0;
}

// Function definition
int multiplyNumbers(int x, int y) {
    int product = x * y;
    return product;
}
```

In this example, we use a function prototype for `multiplyNumbers()` before defining it. This way, we can call the function from the `main()` function even though it hasn't been defined yet in the code.

Learn more from the following resources:

- [@article@introduction to functions in c++](https://www.learncpp.com/cpp-tutorial/introduction-to-functions/)
