# Opaque Pointers

An opaque pointer is a pointer to a struct whose full definition is hidden from the code using it, typically by only declaring the struct's existence in a header file without listing its members. This lets a library expose functions that operate on the type while keeping its internal fields inaccessible and free to change, achieving a form of encapsulation similar to private members in object-oriented languages. Code using an opaque pointer can only interact with the underlying data through the functions the library provides.

Visit the following resources to learn more:

- [@article@Practical Design Patterns: Opaque Pointers and Objects in C](https://interrupt.memfault.com/blog/opaque-pointers)
- [@article@Opaque Data Pointers](https://blog.aaronballman.com/2011/07/opaque-data-pointers/)
- [@video@Make your Data Type more Abstract with Opaque Types in C](https://www.youtube.com/watch?v=TsUOhPsZk6k)