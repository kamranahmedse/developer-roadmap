# Shared Pointer

A `shared_ptr` is a type of smart pointer in C++ that allows multiple pointers to share ownership of a dynamically allocated object. The object will be automatically deallocated only when the last `shared_ptr` that points to it is destroyed.

When using a `shared_ptr`, the reference counter is automatically incremented every time a new pointer is created, and decremented when each pointer goes out of scope. Once the reference counter reaches zero, the system will clean up the memory.

## Code Example

Here's an example of how to use `shared_ptr`:

```cpp
#include <iostream>
#include <memory>

class MyClass {
public:
    MyClass() { std::cout << "Constructor is called.\n"; }
    ~MyClass() { std::cout << "Destructor is called.\n"; }
};

int main() {
    // create a shared pointer to manage the MyClass object
    std::shared_ptr<MyClass> ptr1(new MyClass());
    
    {
        // create another shared pointer and initialize it with the previously created pointer
        std::shared_ptr<MyClass> ptr2 = ptr1;

        std::cout << "Inside the inner scope.\n";
        // both pointers share the same object, and the reference counter has been increased to 2
    }

    std::cout << "Outside the inner scope.\n";
    // leaving the inner scope will destroy ptr2, and the reference counter is decremented to 1
    
    // the main function returns, ptr1 goes out of scope, and the reference counter becomes 0
    // this causes the MyClass object to be deleted and the destructor is called
}
```

Output:

```
Constructor is called.
Inside the inner scope.
Outside the inner scope.
Destructor is called.
```

In this example, `ptr1` and `ptr2` share ownership of the same object. The object is only destroyed when both pointers go out of scope and the reference counter becomes zero.