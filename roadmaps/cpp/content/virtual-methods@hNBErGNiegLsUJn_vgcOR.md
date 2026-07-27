# Virtual Methods

Virtual methods are the cornerstone of dynamic polymorphism in C++ classes. They enable a derived class to provide its own specific implementation of a function that is already defined in a base class. When you call a virtual function through a base class pointer or reference, the runtime determines which version of the function to execute based on the actual type of the object being pointed to, not the type of the pointer or reference itself. This mechanism, known as dynamic dispatch, allows for flexible and extensible code where behavior can be tailored at runtime.

Visit the following resources to learn more:

- [@official@C++ Virtual Functions Documentation](https://en.cppreference.com/w/cpp/language/virtual)
- [@video@Virtual Functions Explained (YouTube)](https://www.youtube.com/watch?v=oIV2KchSyGQ&ab_channel=TheCherno)