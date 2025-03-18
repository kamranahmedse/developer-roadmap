# What is C++?

C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language. It was first introduced in 1985 and provides object-oriented features like classes and inheritance. C++ is widely used in various applications like game development, system programming, embedded systems, and high-performance computing.

C++ is a statically-typed language, meaning that the type of a variable is determined during compilation, and has an extensive library called the C++ Standard Library, which provides a rich set of functions, algorithms, and data structures for various tasks.

C++ builds upon the features of C, and thus, most C programs can be compiled and run with a C++ compiler.

## Code Example

Here's a simple example of a C++ program that demonstrates some essential features of the language:

```cpp
#include <iostream>

// A simple function to add two numbers
int add(int a, int b) {
    return a + b;
}

class Calculator {
public:
    // A member function to multiply two numbers
    int multiply(int a, int b) {
        return a * b;
    }
};

int main() {
    int x = 5;
    int y = 3;

    // Using the standalone function 'add'
    int sum = add(x, y);
    std::cout << "Sum: " << sum << '\n';

    // Using a class and member function
    Calculator calc;
    int product = calc.multiply(x, y);
    std::cout << "Product: " << product << '\n';

    return 0;
}
```

In the above program, we define a simple function `add` and a class `Calculator` with a member function `multiply`. The `main` function demonstrates how to use these to perform basic arithmetic.

Learn more from the following resources:

- [@video@C++ Tutorial for Beginners - Full Course](https://youtu.be/vLnPwxZdW4Y)
- [@article@w3schools C++ tutorial](https://www.w3schools.com/cpp/)
- [@article@Learn C++](https://www.learncpp.com/)
- [@feed@Explore top posts about C++](https://app.daily.dev/tags/c++?ref=roadmapsh)
