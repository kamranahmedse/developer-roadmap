# Printing Variables

Printing variables in C typically uses the `printf` function from the standard library, with format specifiers like `%d` for integers, `%f` for floats, or `%s` for strings telling it how to interpret the data. Each specifier must match the variable's actual type, since `printf` does not check this at compile time and mismatches can produce garbage output or crashes. This makes printing a common source of subtle bugs for beginners.

Visit the following resources to learn more:

- [@article@C Output (Print Text)](https://www.w3schools.com/c/c_output.php)
- [@article@printf() Function in C](https://www.tutorialspoint.com/cprogramming/c_printf_function.htm)
- [@video@printf Basics | C Programming Tutorial](https://www.youtube.com/watch?v=ycKZKDCMMzM)