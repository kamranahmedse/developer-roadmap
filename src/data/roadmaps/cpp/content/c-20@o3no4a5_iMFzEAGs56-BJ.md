# C++20

C++20 is the latest standard of the C++ programming language, which brings significant improvements and new features to the language. This version is aimed at facilitating better software development practices and enabling developers to write more efficient, readable, and maintainable code.

Here are some of the key features introduced in C++20:

## Concepts

Concepts are a way to enforce specific requirements on template parameters, allowing you to write more expressive and understandable code. They improve the error messages when using templates and ensure that the template parameters fulfill specific criteria.

```cpp
template <typename T>
concept Addable = requires (T a, T b) {
    { a + b } -> std::same_as<T>;
};

template <Addable T>
T add(T a, T b) {
    return a + b;
}
```

## Ranges

Ranges provide a new way to work with sequences of values, enhancing the power and expressiveness of the Standard Library algorithms. The range-based algorithms make it easier and more convenient to work with sequences.

```cpp
#include <algorithm>
#include <iostream>
#include <ranges>
#include <vector>

int main() {
    std::vector<int> numbers = { 1, 2, 3, 4, 5 };

    auto even_numbers = numbers | std::views::filter([](int n) { return n % 2 == 0; });

    for (int n : even_numbers) {
        std::cout << n << ' ';
    }
}
```

## Coroutines

Coroutines are a new way to write asynchronous and concurrent code with improved readability. They allow functions to be suspended and resumed, enabling you to write more efficient, non-blocking code.

```cpp
#include <coroutine>
#include <iostream>
#include <future>

std::future<int> async_value(int value) {
    co_await std::chrono::seconds(1);
    co_return value * 2;
}

int main() {
    auto result = async_value(42);
    std::cout << "Result: " << result.get() << '\n';
}
```

## The `constexpr` and `consteval` Keywords

Both `constexpr` and `consteval` are related to compile-time evaluation. Functions marked with `constexpr` can be executed at compile-time or runtime, while functions marked with `consteval` can only be executed at compile-time.

```cpp
constexpr int add(int a, int b) {
    return a + b;
}

consteval int square(int x) {
    return x * x;
}

int main() {
    constexpr int result1 = add(3, 4);   // evaluated at compile-time
    int result2 = add(5, 6);             // evaluated at runtime
    constexpr int result3 = square(7);   // evaluated at compile-time
}
```

These are just some of the highlights of the C++20 standard. It also includes many other features and improvements, like structured bindings, improved lambdas, and new standard library components. Overall, C++20 makes it easier for developers to write clean, efficient, and expressive code.