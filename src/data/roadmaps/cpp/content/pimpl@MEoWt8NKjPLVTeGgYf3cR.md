# Pimpl Idiom

Pimpl (Pointer-to-Implementation) idiom, also known as a private class data, compiler firewall, or handle classes, is a technique used in C++ to hide the implementation details of a class by using a forward declaration to a private structure or class, keeping the public interface of the class clean, and reducing compile-time dependencies.

## Implementation

Here is a simple example illustrating the Pimpl idiom:

**my_class.h**
```cpp
class MyClass_Impl; // forward declaration

class MyClass
{
public:
    MyClass();
    ~MyClass();
    void some_method();

private:
    MyClass_Impl *pimpl; // pointer to the implementation
};
```

**my_class.cpp**
```cpp
#include "my_class.h"
#include <iostream>

class MyClass_Impl // the actual implementation
{
public:
    void some_method()
    {
        std::cout << "Implementation method called!" << '\n';
    }
};

MyClass::MyClass() : pimpl(new MyClass_Impl()) {} // constructor

MyClass::~MyClass() { delete pimpl; } // destructor

void MyClass::some_method()
{
    pimpl->some_method(); // delegation to the implementation
}
```

Now, all the public methods of `MyClass` will delegate the calls to the corresponding methods of `MyClass_Impl`. By doing this, you can hide the details of class implementation, reduce the compile-time dependencies, and ease the maintenance of your code.