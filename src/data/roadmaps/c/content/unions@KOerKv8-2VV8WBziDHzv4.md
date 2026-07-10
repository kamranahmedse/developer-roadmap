# Unions

A `union` allows multiple members to share the same memory location, so only one member holds a valid value at any given time, and the union's size equals that of its largest member. This is useful for saving memory when different pieces of data are never needed simultaneously, or for interpreting the same bytes in different ways. Reading a union member other than the one most recently written to is generally undefined behavior, except in specific cases the standard permits.

Visit the following resources to learn more:

- [@article@Unions in C](https://www.tutorialspoint.com/cprogramming/c_unions.htm)
- [@article@Union declaration](https://en.cppreference.com/c/language/union)
- [@video@Introduction to Unions in C](https://www.youtube.com/watch?v=oySsPUDr35U)