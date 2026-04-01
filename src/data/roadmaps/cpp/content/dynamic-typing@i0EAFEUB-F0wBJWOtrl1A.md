# Dynamic Typing

While C++ is fundamentally a statically-typed language where data types are checked at compile time, it provides mechanisms to achieve a degree of dynamic typing. This involves determining the data types of variables during runtime, primarily through the use of `void*` pointers, which can point to any data type (requiring explicit casting), and the `std::any` class (introduced in C++17), a type-safe container capable of holding values of any type. Both approaches enable flexibility but require careful consideration due to potential runtime overhead and type-related errors.

Visit the following resources to learn more:

- [@article@Dynamic Typing in C++](https://codesignal.com/learn/courses/advanced-functional-programming-techniques/lessons/dynamic-type-declaration-in-cpp)
- [@video@Static vs Dynamic Typing](https://www.youtube.com/watch?v=GqXpFycPWLE)