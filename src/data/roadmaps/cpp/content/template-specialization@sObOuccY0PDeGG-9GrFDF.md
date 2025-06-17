# Template Specialization

Template specialization is a way to customize or modify the behavior of a template for a specific type or a set of types. This can be useful when you want to optimize the behavior or provide specific implementation for a certain type, without affecting the overall behavior of the template for other types.

There are two main ways you can specialize a template:

- **Full specialization:** This occurs when you provide a specific implementation for a specific type or set of types.

- **Partial specialization:** This occurs when you provide a more general implementation for a subset of types that match a certain pattern or condition.

## Full Template Specialization

Full specialization is used when you want to create a separate implementation of a template for a specific type. To do this, you need to use keyword `template<>` followed by the function template with the desired specialized type.

Here is an example:

```cpp
#include <iostream>

template <typename T>
void printData(const T& data) {
    std::cout << "General template: " << data << '\n';
}

template <>
void printData(const char* const & data) {
    std::cout << "Specialized template for const char*: " << data << '\n';
}

int main() {
    int a = 5;
    const char* str = "Hello, world!";
    printData(a); // General template: 5
    printData(str); // Specialized template for const char*: Hello, world!
}
```

## Partial Template Specialization

Partial specialization is used when you want to create a separate implementation of a template for a subset of types that match a certain pattern or condition.

Here is an example of how you can partially specialize a template class:

```cpp
#include <iostream>

template <typename K, typename V>
class MyPair {
public:
    MyPair(K k, V v) : key(k), value(v) {}

    void print() const {
        std::cout << "General template: key = " << key << ", value = " << value << '\n';
    }

private:
    K key;
    V value;
};

template <typename T>
class MyPair<T, int> {
public:
    MyPair(T k, int v) : key(k), value(v) {}

    void print() const {
        std::cout << "Partial specialization for int values: key = " << key
                  << ", value = " << value << '\n';
    }

private:
    T key;
    int value;
};

int main() {
    MyPair<double, std::string> p1(3.2, "example");
    MyPair<char, int> p2('A', 65);
    p1.print(); // General template: key = 3.2, value = example
    p2.print(); // Partial specialization for int values: key = A, value = 65
}
```

In this example, the `MyPair` template class is partially specialized to provide a different behavior when the second template parameter is of type `int`.
