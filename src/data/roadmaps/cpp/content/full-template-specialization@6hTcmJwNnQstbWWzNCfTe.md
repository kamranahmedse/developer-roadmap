# Full Template Specialization

Full template specialization allows you to provide a specific implementation, or behavior, for a template when used with a certain set of type parameters. It is useful when you want to handle special cases or optimize your code for specific types.

## Syntax
To create a full specialization of a template, you need to define the specific type for which the specialization should happen. The syntax looks as follows:

```cpp
template <> //Indicates that this is a specialization
className<specificType> //The specialized class for the specific type
```

## Example
Consider the following example to demonstrate full template specialization:

```cpp
// Generic template
template <typename T>
class MyContainer {
public:
    void print() {
        std::cout << "Generic container." << std::endl;
    }
};

// Full template specialization for int
template <>
class MyContainer<int> {
public:
    void print() {
        std::cout << "Container for integers." << std::endl;
    }
};

int main() {
    MyContainer<double> d;
    MyContainer<int> i;

    d.print(); // Output: Generic container.
    i.print(); // Output: Container for integers.

    return 0;
}
```

In this example, we defined a generic `MyContainer` template class along with a full specialization for `int` type. When we use the container with the `int` type, the specialized implementation's `print` method is called. For other types, the generic template implementation will be used.