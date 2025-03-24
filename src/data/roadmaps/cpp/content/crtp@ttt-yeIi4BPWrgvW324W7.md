# CRTP

**Curiously Recurring Template Pattern (CRTP)**

The Curiously Recurring Template Pattern (CRTP) is a C++ idiom that involves a class template being derived from its own specialization. This pattern allows for the creation of static polymorphism, which differs from regular runtime polymorphism that relies on virtual functions and inheritance.

CRTP is usually employed when you want to customize certain behavior in the base class without adding the overhead of a virtual function call. In short, CRTP can be used for achieving compile-time polymorphism without the runtime performance cost.

Here's an example demonstrating CRTP:

```cpp
template <typename Derived>
class Base {
public:
    void interface() {
        static_cast<Derived*>(this)->implementation();
    }

    void implementation() {
        std::cout << "Default implementation in Base\n";
    }
};

class Derived1 : public Base<Derived1> {
public:
    void implementation() {
        std::cout << "Custom implementation in Derived1\n";
    }
};

class Derived2 : public Base<Derived2> {
    // No custom implementation, so Base::implementation will be used.
};

int main() {
    Derived1 d1;
    d1.interface();  // Output: "Custom implementation in Derived1"

    Derived2 d2;
    d2.interface();  // Output: "Default implementation in Base"

    return 0;
}
```

In this example, the `Base` class is a template that takes a single type parameter. `Derived1` and `Derived2` are derived from their respective specialization of `Base`. CRTP is employed to allow custom implementations of the `implementation()` function in derived classes while providing a default behavior in the `Base` class. The `interface()` function in the `Base` class is a template for the derived class's behavior and calls the corresponding `implementation()` function based on the static type.

This pattern enables you to override certain behavior in derived classes with additional functionality, all while avoiding the overhead of virtual function calls and, in turn, achieving a higher degree of efficiency at runtime.