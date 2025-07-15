# SFINAE (Substitution Failure Is Not An Error)

SFINAE is a principle in C++ template metaprogramming that allows the compiler to select the appropriate function or class when a specific template specialization fails during substitution. The term "substitution failure" refers to the process where the compiler tries to substitute template arguments into a function template or class template. If the substitution causes an error, the compiler won't consider that specific specialization as a candidate and will continue searching for a valid one.

The key idea behind SFINAE is that if a substitution error occurs, it is silently ignored, and the compiler continues to explore other template specializations or overloads. This allows you to write more flexible and generic code, as it enables you to have multiple specializations for different scenarios.

## Code Example

Here's an example that demonstrates SFINAE in action:

```cpp
#include <iostream>
#include <type_traits>

template <typename T, typename = void>
struct foo_impl {
    void operator()(T t) {
        std::cout << "Called when T is not arithmetic\n";
    }
};

template <typename T>
struct foo_impl<T, std::enable_if_t<std::is_arithmetic<T>::value>> {
    void operator()(T t) {
        std::cout << "Called when T is arithmetic\n";
    }
};

template <typename T>
void foo(T t) {
    foo_impl<T>()(t);
}

int main() {
    int a = 5;
    foo(a); // output: Called when T is arithmetic

    std::string s = "example";
    foo(s); // output: Called when T is not arithmetic
}
```

In this example, we define two `foo_impl` functions are specialized based on the boolean value of `std::is_arithmetic<T>`. The first one is enabled when `T` is an arithmetic type, while the second one is enabled when `T` is not an arithmetic type. The `foo` function then calls the appropriate `foo_impl` specialization based on the result of the type trait.

When calling `foo(a)` with an integer, the first specialization is selected, and when calling `foo(s)` with a string, the second specialization is selected. If there is no valid specialization, the code would fail to compile.
