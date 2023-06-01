# SFINAE (Substitution Failure Is Not An Error)

SFINAE is a principle in C++ template metaprogramming that allows the compiler to select the appropriate function or class when a specific template specialization fails during substitution. The term "substitution failure" refers to the process where the compiler tries to substitute template arguments into a function template or class template. If the substitution causes an error, the compiler won't consider that specific specialization as a candidate and will continue searching for a valid one.

The key idea behind SFINAE is that if a substitution error occurs, it is silently ignored, and the compiler continues to explore other template specializations or overloads. This allows you to write more flexible and generic code, as it enables you to have multiple specializations for different scenarios.

### Code Example

Here's an example that demonstrates SFINAE in action:

```cpp
#include <iostream>
#include <type_traits>

template <typename T, typename = std::enable_if_t<std::is_arithmetic<T>::value>>
void foo(T t) {
    std::cout << "Called when T is arithmetic" << std::endl;
}

template <typename T, typename = std::enable_if_t<!std::is_arithmetic<T>::value>>
void foo(T t) {
    std::cout << "Called when T is not arithmetic" << std::endl;
}

int main() {
    int a = 5;
    foo(a); // output: Called when T is arithmetic

    std::string s = "example";
    foo(s); // output: Called when T is not arithmetic
}
```

In this example, we define two `foo` function template specializations. The first one is enabled when `T` is an arithmetic type, while the second one is enabled when `T` is not an arithmetic type. The `std::enable_if_t` inside the template parameter list allows us to control which specialization is valid for a given type of `T`.

When calling `foo(a)` with an integer, the first specialization is selected, and when calling `foo(s)` with a string, the second specialization is selected. If there is no valid specialization, the code would fail to compile.