# Virtual Tables

Virtual tables (vtables) are compiler-generated lookup tables used in C++ to implement dynamic polymorphism, especially with virtual functions. Each class that declares or inherits virtual functions has a vtable, which contains pointers to the most derived versions of those virtual functions for that class. When a virtual function is called through a pointer or reference to a base class, the vtable is consulted at runtime to determine the actual function to execute based on the object's dynamic type.

Visit the following resources to learn more:

- [@article@Understandig Virtual Tables in C++](https://pabloariasal.github.io/2017/06/10/understanding-virtual-tables/)
- [@video@Classes part 18 - Understanding the vtable (Popular interview question) | Modern Cpp Series Ep. 54](https://www.youtube.com/watch?v=hS7kPtVB1vI)