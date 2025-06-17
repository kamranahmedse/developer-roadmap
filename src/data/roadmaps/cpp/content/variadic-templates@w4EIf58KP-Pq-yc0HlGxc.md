# Variadic Templates

Variadic templates are a feature in C++11 that allows you to define a template with a variable number of arguments. This is especially useful when you need to write a function or class that can accept different numbers and types of arguments.

## Syntax

The syntax for variadic templates is very simple. To define a variadic template, use the `...` (ellipsis) notation:

```cpp
template <typename... Args>
```

This notation represents a parameter pack, which can contain zero or more arguments. You can use this parameter pack as a variable list of template parameters in your template definition.

## Examples

### Summing Multiple Arguments Using Variadic Templates

```cpp
#include <iostream>

// Base case for recursion
template <typename T>
T sum(T t) {
  return t;
}

// Variadic template
template <typename T, typename... Args>
T sum(T t, Args... args) {
  return t + sum(args...);
}

int main() {
  int result = sum(1, 2, 3, 4, 5);  // expands to 1 + 2 + 3 + 4 + 5
  std::cout << "The sum is: " << result << '\n';

  return 0;
}
```

### Tuple Class Using Variadic Templates

```cpp
template <typename... Types>
class Tuple;

// Base case: empty tuple
template <>
class Tuple<> {};

// Recursive case: Tuple with one or more elements
template <typename Head, typename... Tail>
class Tuple<Head, Tail...> : public Tuple<Tail...> {
 public:
  Tuple(Head head, Tail... tail) : Tuple<Tail...>(tail...), head_(head) {}

  Head head() const { return head_; }

 private:
  Head head_;
};

int main() {
  Tuple<int, float, double> tuple(1, 2.0f, 3.0);
  std::cout << "First element: " << tuple.head() << '\n';
  return 0;
}
```

Please note that the examples shown are for educational purposes and might not be the most efficient or production-ready implementations. With C++17 and onward, there are even more concise ways to handle variadic templates, like using fold expressions.