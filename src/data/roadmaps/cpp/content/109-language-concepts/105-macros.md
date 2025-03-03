# C++ Macros

Macros are preprocessing directives in C++ used by the preprocessor to perform text substitution. They are defined using the `#define` directive, followed by the macro name and the value to be substituted.

Macros can be used to define constants, create function-like macros, or perform conditional compilation.

## Constant Macros

Constant macros are used to define symbolic constants for use in code. They do not use any memory and are replaced by the preprocessor before the compilation process.

Example:

```cpp
#define PI 3.14159
```

This macro defines a symbolic constant `PI`. You can use it in your code as if it were a regular variable.

```cpp
double circumference = 2 * PI * radius;
```

## Function-like Macros

Function-like macros are similar to regular functions. They take a list of arguments and perform text substitution.

Example:

```cpp
#define SQUARE(x) ((x) * (x))
```

This macro defines a function-like macro `SQUARE` that calculates the square of a number.

```cpp
int square_of_five = SQUARE(5); // expands to ((5) * (5))
```
**CAUTION!**

The following macro may seem to be the same as the one above, but this version can lead to unexpected results:
```cpp
#define SQUARE(x) (x*x); // DANGEROUS!!!
#define PI 3.14159;
const double val = SQUARE(PI+2); // expands to (PI+2*PI+2), and equals to (3*PI+2)
```

## Conditional Compilation

Macros can be used for conditional compilation using the `#ifdef`, `#ifndef`, `#if`, `#else`, `#elif`, and `#endif` directives.

Example:

```cpp
#define DEBUG_MODE

#ifdef DEBUG_MODE
  // Code to be compiled only in debug mode
#else
  // Code to be compiled only if DEBUG_MODE is not defined
#endif
```

This example demonstrates how you can use macros to control the parts of code that are being compiled, depending on the presence or absence of a macro definition.
