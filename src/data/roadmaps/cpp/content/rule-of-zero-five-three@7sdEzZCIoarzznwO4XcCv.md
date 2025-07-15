# Rule of Zero, Five, Three

**Rule of Zero, Three, and Five in C++**

The Rule of Zero, Three, and Five is a set of guidelines for managing object resources in modern C++, related to structures and classes. These rules deal with the default behavior of constructors, destructors, and other special member functions that are necessary for proper resource management.

**Rule of Zero**

The Rule of Zero states that if a class or structure does not explicitly manage resources, it should not define any of the special member functions, i.e., destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator. The compiler will automatically generate these functions, and the behavior will be correct for managing resources like memory and file handles.

*Example:*

```cpp
struct MyResource {
    std::string name;
    int value;
};
```

In this example, MyResource is a simple structure that does not manage any resources, so it does not define any special member functions. The compiler will generate them automatically, and the behavior will be correct.

**Rule of Three**

The Rule of Three states that a class or structure that manages resources should define the following three special member functions:

- Destructor
- Copy constructor
- Copy assignment operator

These functions are necessary for proper resource management, such as releasing memory or correctly handling deep copies.

*Example:*

```cpp
class MyResource {
public:
    // Constructor and destructor
    MyResource() : data(new int[100]) {} 
    ~MyResource() { delete[] data; } 

    // Copy constructor
    MyResource(const MyResource& other) : data(new int[100]) {
        std::copy(other.data, other.data + 100, data);
    }

    // Copy assignment operator
    MyResource& operator=(const MyResource& other) {
        if (&other == this) { return *this; }
        std::copy(other.data, other.data + 100, data);
        return *this;
    }

private:
    int* data;
};
```

In this example, MyResource is a class that manages a resource (an array of integers), so it defines the destructor, copy constructor, and copy assignment operator.

**Rule of Five**

The Rule of Five extends the Rule of Three to include two additional special member functions:

- Move constructor
- Move assignment operator

Modern C++ introduces move semantics, which allows for more efficient handling of resources by transferring ownership without necessarily copying all the data.

*Example:*

```cpp
class MyResource {
public:
    // Constructors and destructor
    MyResource() : data(new int[100]) {}
    ~MyResource() { delete[] data; }

    // Copy constructor
    MyResource(const MyResource& other) : data(new int[100]) {
        std::copy(other.data, other.data + 100, data);
    }

    // Copy assignment operator
    MyResource& operator=(const MyResource& other) {
        if (&other == this) { return *this; }
        std::copy(other.data, other.data + 100, data);
        return *this;
    }

    // Move constructor
    MyResource(MyResource&& other) noexcept : data(other.data) {
        other.data = nullptr;
    }

    // Move assignment operator
    MyResource& operator=(MyResource&& other) noexcept {
        if (&other == this) { return *this; }
        delete[] data;
        data = other.data;
        other.data = nullptr;
        return *this;
    }

private:
    int* data;
};
```

In this example, MyResource is a class that manages a resource (an array of integers), so it defines all five special member functions for proper resource management and move semantics.