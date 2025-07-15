# Virtual Functions in C++

Virtual functions enable runtime polymorphism in C++, allowing derived classes to override base class behavior. When called via a base pointer/reference, the *actual object's type* determines which function is executed (dynamic dispatch). Non-virtual functions use compile-time resolution based on the pointer/reference type (static dispatch), which prevents overriding.

```cpp
// Base class with virtual function
class Animal {
public:
    virtual void speak() { std::cout << "Generic sound"; }
};

// Derived class override
class Dog : public Animal {
public:
    void speak() override { std::cout << "Woof!"; } // Dynamic dispatch
};
```

Visit the following resources to learn more:

- [@official@C++ Virtual Functions Documentation](https://en.cppreference.com/w/cpp/language/virtual)
- [@article@GeeksforGeeks Virtual Functions Guide](https://www.geeksforgeeks.org/virtual-function-cpp/)
- [@video@Virtual Functions Explained (YouTube)](https://www.youtube.com/watch?v=oIV2KchSyGQ&ab_channel=TheCherno)
