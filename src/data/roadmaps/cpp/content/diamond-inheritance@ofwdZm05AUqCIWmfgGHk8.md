# Diamond Inheritance

Diamond inheritance is a specific scenario in multiple inheritance where a class is derived from two or more classes, which in turn, are derived from a common base class. It creates an ambiguity that arises from duplicating the common base class, which leads to an ambiguous behavior while calling the duplicate members.

To resolve this ambiguity, you can use virtual inheritance. A virtual base class is a class that is shared by multiple classes using `virtual` keyword in C++. This ensures that only one copy of the base class is inherited in the final derived class, and thus, resolves the diamond inheritance problem.

*Example:*

```cpp
#include <iostream>

class Base {
public:
    void print() {
        std::cout << "Base class" << '\n';
    }
};

class Derived1 : virtual public Base {
public:
    void derived1Print() {
        std::cout << "Derived1 class" << '\n';
    }
};

class Derived2 : virtual public Base {
public:
    void derived2Print() {
        std::cout << "Derived2 class" << '\n';
    }
};

class Derived3 : public Derived1, public Derived2 {
public:
    void derived3Print() {
        std::cout << "Derived3 class" << '\n';
    }
};

int main() {
    Derived3 d3;
    d3.print(); // Now, there is no ambiguity in calling the base class function
    d3.derived1Print();
    d3.derived2Print();
    d3.derived3Print();

    return 0;
}
```

In the code above, `Derived1` and `Derived2` are derived from the `Base` class using virtual inheritance. So, when we create an object of `Derived3` and call the `print()` function from the `Base` class, there is no ambiguity, and the code executes without any issues.
