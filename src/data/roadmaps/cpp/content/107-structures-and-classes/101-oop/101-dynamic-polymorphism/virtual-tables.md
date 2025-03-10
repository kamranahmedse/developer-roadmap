# Virtual Tables

Virtual Tables (or Vtable) are a mechanism used by C++ compilers to support dynamic polymorphism. In dynamic polymorphism, the appropriate function is called at runtime, depending on the actual object type.

When a class contains a virtual function, the compiler creates a virtual table for that class. This table contains function pointers to the virtual functions defined in the class. Each object of that class has a pointer to its virtual table (_vptr_, virtual pointer), which is automatically initialized by the compiler during object construction.

## Example

Let's consider the following example:

```cpp
class Base {
public:
    virtual void function1() {
        std::cout << "Base::function1\n";
    }

    virtual void function2() {
        std::cout << "Base::function2\n";
    }
};

class Derived : public Base {
public:
    void function1() override {
        std::cout << "Derived::function1\n";
    }

    void function3() {
        std::cout << "Derived::function3\n";
    }
};

int main() {
    Base* obj = new Derived(); // create a Derived object and assign a pointer of type Base*
    obj->function1(); // calls Derived::function1, due to dynamic polymorphism
    obj->function2(); // calls Base::function2

    delete obj;
    return 0;
}
```

In this example, when a `Derived` object is created, the compiler generates a Vtable for `Derived` class, containing pointers to its virtual functions:

- `Derived::function1` (overridden from `Base`)
- `Base::function2` (inherits from Base)

The `_vptr_` pointer in the `Derived` object points to this Vtable. When the `function1` is called on the `Base` pointer pointing to the `Derived` object, the function pointer in the Vtable is used to call the correct function (in this case, `Derived::function1`). Similarly, the call to `function2` calls `Base::function2`, since it's the function pointer stored in the Vtable for `Derived` class.

Note that `function3` is not part of the Vtable, as it is not a virtual function.