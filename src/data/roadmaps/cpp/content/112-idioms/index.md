# C++ Idioms

C++ idioms are well-established patterns or techniques that are commonly used in C++ programming to achieve a specific outcome. They help make code efficient, maintainable, and less error-prone. Here are some of the common C++ idioms:

## 1. Resource Acquisition is Initialization (RAII)

This idiom ensures that resources are always properly acquired and released by tying their lifetime to the lifetime of an object. When the object gets created, it acquires the resources and when it gets destroyed, it releases them.

```cpp
class Resource {
public:
    Resource() { /* Acquire resource */ }
    ~Resource() { /* Release resource */ }
};

void function() {
    Resource r; // Resource is acquired
    // ...
} // Resource is released when r goes out of scope
```

## 2. Rule of Three

If a class defines any one of the following, it should define all three: copy constructor, copy assignment operator, and destructor.

```cpp
class MyClass {
public:
    MyClass();
    MyClass(const MyClass& other); // Copy constructor
    MyClass& operator=(const MyClass& other); // Copy assignment operator
    ~MyClass(); // Destructor
};
```

## 3. Rule of Five

With C++11, the rule of three was extended to five, covering move constructor and move assignment operator.

```cpp
class MyClass {
public:
    MyClass();
    MyClass(const MyClass& other); // Copy constructor
    MyClass(MyClass&& other); // Move constructor
    MyClass& operator=(const MyClass& other); // Copy assignment operator
    MyClass& operator=(MyClass&& other); // Move assignment operator
    ~MyClass(); // Destructor
};
```

## 4. PImpl (Pointer to Implementation) Idiom

This idiom is used to separate the implementation details of a class from its interface, resulting in faster compile times and the ability to change implementation without affecting clients.

```cpp
// header file
class MyClass {
public:
    MyClass();
    ~MyClass();
    void someMethod();

private:
    class Impl;
    Impl* pImpl;
};

// implementation file
class MyClass::Impl {
public:
    void someMethod() { /* Implementation */ }
};

MyClass::MyClass() : pImpl(new Impl()) {}
MyClass::~MyClass() { delete pImpl; }
void MyClass::someMethod() { pImpl->someMethod(); }
```

## 5. Non-Virtual Interface (NVI)

This enforces a fixed public interface and allows subclasses to only override specific private or protected virtual methods.

```cpp
class Base {
public:
    void publicMethod() {
        // Common behavior
        privateMethod(); // Calls overridden implementation
    }

protected:
    virtual void privateMethod() = 0; // Pure virtual method
};

class Derived : public Base {
protected:
    virtual void privateMethod() override {
        // Derived implementation
    }
};
```

These are just a few examples of the many idioms in C++ programming. They can provide guidance when designing and implementing your code, but it's essential to understand the underlying concepts to adapt them to different situations.