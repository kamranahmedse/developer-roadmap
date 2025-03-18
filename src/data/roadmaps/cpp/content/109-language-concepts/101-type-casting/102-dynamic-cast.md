# Dynamic Cast

`dynamic_cast` is a type of casting operator in C++ that is used specifically for polymorphism. It safely converts pointers and references of a base class to its derived class and checks the validity of the conversion during runtime. If the conversion is not valid (i.e., the object is not of the target type), it returns a null pointer instead of producing undefined behavior. Therefore, `dynamic_cast` can prevent potential crashes and errors when using polymorphism.

Here is a basic example of how `dynamic_cast` can be used:

```cpp
#include <iostream>

class BaseClass {
   public:
    virtual void display() {
        std::cout << "BaseClass\n";
    }
};

class DerivedClass : public BaseClass {
   public:
    void display() {
        std::cout << "DerivedClass\n";
    }
};

int main() {
    BaseClass *basePtr = new DerivedClass();  // Upcasting
    DerivedClass *derivedPtr;

    derivedPtr = dynamic_cast<DerivedClass *>(basePtr);  // Downcasting
    if (derivedPtr) {
        derivedPtr->display();  // Output: DerivedClass
    } else {
        std::cout << "Invalid type conversion.";
    }

    delete basePtr;
    return 0;
}
```

In this example, a pointer to a `DerivedClass` object is assigned to a `BaseClass` pointer (`basePtr`). Then, we attempt to downcast it back to a `DerivedClass` pointer using `dynamic_cast`. If the casting is successful, we can access the `DerivedClass` functionality through the new pointer (`derivedPtr`).