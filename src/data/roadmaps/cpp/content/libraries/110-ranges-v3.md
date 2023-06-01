# Ranges v3

Ranges v3 is a C++ library designed to work with ranges of values, rather than individual values. It provides a set of utilities and algorithms to manipulate and transform ranges of values in an efficient and expressive way. The library is inspired by the Range concept proposed for inclusion in the C++ standard library for C++20.

---

## Overview

Ranges v3 includes three main components:

1. **Range adaptors:** These are composable algorithms that transform a range into a new range. They help to create lazy views over the data without actually modifying it.

2. **Action adaptors:** These are algorithms that modify a range in-place. For example, sorting or filtering elements in a container directly.

3. **Trait concepts and utility functions:** Provide tools for working with range types, like determining if a type is a range, getting the iterator type for a range, etc.

---

## Code examples

Here are some code examples of using the Ranges v3 library:

### Including the library

First, you need to include the appropriate header files from the library. To use the entire Ranges v3 library, you can simply include the `range/v3/all.hpp` header file:

```cpp
#include <range/v3/all.hpp>
```

### Using range adaptors

You can use range adaptors to manipulate and transform ranges. For example, you can use the `view::filter` and `view::transform` adaptors to create a new range containing only even numbers and then square them:

```cpp
#include <iostream>
#include <range/v3/all.hpp>

using namespace ranges;

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6};

    // Create a new range containing only even numbers, and then square them.
    auto even_squares = numbers | view::filter([](int n) { return n % 2 == 0; })
                                 | view::transform([](int n) { return n * n; });

    // Print the even_squares range.
    for (auto n : even_squares) {
        std::cout << n << ' ';
    }
    // Output: 4 16 36

    return 0;
}
```

### Using action adaptors

Action adaptors are used to modify ranges in-place. For example, you can use the `action::sort` and `action::unique` adaptors to sort and remove duplicate elements from a container:

```cpp
#include <iostream>
#include <range/v3/all.hpp>

using namespace ranges;

int main() {
    std::vector<int> numbers = {5, 3, 1, 4, 4, 2, 2};

    // Sort the numbers and remove duplicates.
    numbers |= action::sort | action::unique;

    // Print the modified numbers vector.
    for (auto n : numbers) {
        std::cout << n << ' ';
    }
    // Output: 1 2 3 4 5

    return 0;
}
```

Ranges v3 provides a wide range of adaptors and actions to work with ranges in a more expressive and efficient way. You can explore more in the [official documentation](https://github.com/ericniebler/range-v3/blob/master/doc/index.md).