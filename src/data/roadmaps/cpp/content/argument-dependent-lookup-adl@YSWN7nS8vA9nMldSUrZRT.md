# Argument Dependent Lookup (ADL)

Argument Dependent Lookup (ADL) or Koenig Lookup is a mechanism in C++ that allows the compiler to search for the appropriate function to call based on the types of arguments provided. It is particularly helpful when using overloaded functions or operators in a namespace.

ADL allows the compiler to find functions in the same namespace as the arguments, even if the function is not declared at the point of use or within the namespace provided. This is especially useful when working with templates or generic programming.

## Example

Consider the following example using a namespace and overloaded `operator<<()`:

```cpp
namespace MyNamespace {
    class MyClass {
    public:
        int value;
    };

    std::ostream& operator<<(std::ostream& os, const MyClass& obj) {
        os << "MyClass: " << obj.value;
        return os;
    }
}

int main() {
    MyNamespace::MyClass obj;
    obj.value = 42;
    using std::cout; // Required to use 'cout' without fully qualifying it.
    cout << obj << '\n'; // ADL is used to find the correct overloaded 'operator<<'.
}
```

In this example, when you call `cout << obj;` in `main()`, ADL is used to find the correct `operator<<()` in the `MyNamespace` namespace because the argument `obj` is of type `MyNamespace::MyClass`.