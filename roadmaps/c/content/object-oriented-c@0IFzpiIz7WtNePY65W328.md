# Object-Oriented C

Object-oriented programming techniques can be approximated in C, despite the language having no built-in classes, by combining structs to hold data with function pointers to simulate methods, often organized as a table of function pointers resembling a virtual method table. Encapsulation is typically achieved through opaque pointers, hiding a struct's internal fields from code outside the module that defines it. This style requires more manual discipline than a language with native object-oriented support, but is common in larger C codebases and libraries.

Visit the following resources to learn more:

- [@article@Object-Oriented C: A Primer](https://aartaka.me/oop-c.html)
- [@article@Object-Oriented Programming (OOP) in C](https://www.codementor.io/@michaelsafyan/object-oriented-programming-in-c-du1081gw2)
- [@video@OOP in Pure C](https://www.youtube.com/watch?v=6Riy9hVIFDE)