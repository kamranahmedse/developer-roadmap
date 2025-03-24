# Exception Handling in C++

Exception handling is a method used to tackle runtime errors so that normal flow of the program can be maintained. In C++, this is accomplished using three keywords: `try`, `catch`, and `throw`.

## try { ... }
In the `try` block, you write the code that can possibly generate an exception. If an exception is encountered, the control is passed to the relevant `catch` block to handle the issue.

Example:
```cpp
try {
  // code that might throw an exception
}
```

## catch (...) { ... }
The `catch` block follows the `try` block and is responsible for handling the exceptions thrown by the `try` block. There can be multiple `catch` blocks to handle different types of exceptions.

Example:
```cpp
catch (int e) {
  // handle exception of type int
}
catch (char e) {
  // handle exception of type char
}
catch (...) {
  // handle any other exception
}
```

## throw ... ;
In case an error occurs within the `try` block, you can use the `throw` keyword to generate an exception of the specific type. This will then be caught and handled by the corresponding `catch` block.

Example:
```cpp
try {
  int num1 = 10, num2 = 0;
  if (num2 == 0) {
    throw "Division by zero not allowed!";
  } else {
    int result = num1 / num2;
    std::cout << "Result: " << result << std::endl;
  }
}
catch (const char* e) {
  std::cout << "Error: " << e << std::endl;
}
```

In summary, exception handling in C++ is a technique to handle runtime errors while maintaining the normal flow of the program. The `try`, `catch`, and `throw` keywords are used together to create the structure to deal with exceptions as they occur.
