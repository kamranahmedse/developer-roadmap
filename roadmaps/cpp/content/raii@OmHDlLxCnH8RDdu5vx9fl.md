# RAII

RAII (Resource Acquisition Is Initialization) is a C++ idiom that ties the management of resources to the lifetime of objects. Resources are acquired during object construction and automatically released when the object is destroyed, typically in the destructor. This ensures resources are properly managed, even in the face of exceptions, preventing leaks and simplifying code by automating resource cleanup.

Visit the following resources to learn more:

- [@article@RAII](https://en.cppreference.com/w/cpp/language/raii.html)
- [@video@What is RAII (Resource Acquisition Is Initialization)?](https://www.youtube.com/watch?v=q6dVKMgeEkk)