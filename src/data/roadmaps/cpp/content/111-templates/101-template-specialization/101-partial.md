# Partial Template Specialization

Partial template specialization is a concept in C++ templates, which allows you to specialize a template for a subset of its possible type arguments. It is particularly useful when you want to provide a customized implementation for a particular group of types without having to define separate specializations for all types in that group.

Partial template specialization is achieved by providing a specialization of a template with a new set of template parameters. This new template will be chosen when the compiler deduces the types that match the partial specialization.

Here is a code example that demonstrates partial template specialization:

```cpp
// Primary template
template <typename T>
struct MyTemplate {
    static const char* name() {
        return "General case";
    }
};

// Partial specialization for pointers
template <typename T>
struct MyTemplate<T*> {
    static const char* name() {
        return "Partial specialization for pointers";
    }
};

// Full specialization for int
template <>
struct MyTemplate<int> {
    static const char* name() {
        return "Full specialization for int";
    }
};

int main() {
    MyTemplate<double> t1; // General case
    MyTemplate<double*> t2; // Partial specialization for pointers
    MyTemplate<int> t3; // Full specialization for int

    std::cout << t1.name() << '\n';
    std::cout << t2.name() << '\n';
    std::cout << t3.name() << '\n';

    return 0;
}
```

In the example above, we have defined a primary template `MyTemplate` with a single type parameter `T`. We then provide a partial template specialization for pointer types by specifying `MyTemplate<T*>`. This means that the partial specialization will be chosen when the type argument is a pointer type.

Lastly, we provide a full specialization for the `int` type by specifying `MyTemplate<int>`. This will be chosen when the type argument is `int`.

When running this example, the output will be:

```
General case
Partial specialization for pointers
Full specialization for int
```

This demonstrates that the partial specialization works as expected, and is chosen for pointer types, while the full specialization is chosen for the `int` type.