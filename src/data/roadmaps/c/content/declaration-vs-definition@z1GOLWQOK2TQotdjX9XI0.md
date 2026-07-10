# Declaration vs Definition

A declaration tells the compiler that a variable or function exists and states its type, without necessarily allocating memory or providing a function body. A definition actually allocates storage for a variable or provides the function's implementation. In C, `extern int x;` is a declaration, while `int x;` is a definition. This distinction matters most when code spans multiple files and needs to share variables or functions across them.

Visit the following resources to learn more:

- [@article@C - Variables](https://www.tutorialspoint.com/cprogramming/c_variables.htm)
- [@video@Declaration vs. Definition of a variable in C](https://www.youtube.com/watch?v=TtJw4VUYsiM)
- [@video@C variables 💰](https://www.youtube.com/watch?v=aIQk1O08zpg)