# CRTP

The Curiously Recurring Template Pattern (CRTP) is a C++ idiom where a class template inherits from its own specialization. This technique achieves static polymorphism, offering an alternative to runtime polymorphism using virtual functions. CRTP allows customization of base class behavior without virtual function call overhead, enabling compile-time polymorphism for improved performance. It's useful when you need to extend or modify functionality in derived classes while maintaining efficiency by avoiding the runtime cost associated with virtual functions.

Visit the following resources to learn more:

- [@article@CRTP (Curiously Recurring Template Pattern) in C++](https://medium.com/@sagar.necindia/crtp-curiously-recurring-template-pattern-in-c-90981941bf38)
- [@video@C++ Tutorial: How to use CRTP to speed up your code](https://www.youtube.com/watch?v=Srx4eiBdpdQ)