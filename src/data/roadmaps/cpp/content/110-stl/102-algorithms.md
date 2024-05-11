# STL Algorithms

The Standard Template Library (STL) in C++ provides a collection of generic algorithms that are designed to work with various container classes. These algorithms are implemented as functions and can be applied to different data structures, such as arrays, vectors, lists, and others. The primary header file for algorithms is `<algorithm>`.

## Key Concepts

## Sorting

Sorting refers to arranging a sequence of elements in a specific order. The STL provides several sorting algorithms, such as `std::sort`, `std::stable_sort`, and `std::partial_sort`.

### std::sort

`std::sort` is used to sort a range of elements [first, last) in non-descending order (by default). You can also use custom comparison functions or lambda expressions to change the sorting order.

Example:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {10, 9, 8, 7, 6, 5};
    std::sort(nums.begin(), nums.end());

    for (int num : nums) {
        std::cout << num << ' ';
    }
    // Output: 5 6 7 8 9 10
}
```

## Searching

Searching refers to finding if a particular element is present within a given range of elements. STL provides various searching algorithms, such as `std::find`, `std::binary_search`, and `std::find_if`.

### std::find

`std::find` is used to find the iterator of the first occurrence of a given value within the range [first, last).

Example:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {5, 6, 7, 8, 9, 10};
    auto it = std::find(nums.begin(), nums.end(), 9);

    if (it != nums.end()) {
        std::cout << "Found 9 at position: " << (it - nums.begin());
    } else {
        std::cout << "9 not found";
    }
    // Output: Found 9 at position: 4
}
```

## Modifying Sequences

The STL also provides algorithms for modifying sequences, such as `std::remove`, `std::replace`, and `std::unique`.

### std::remove

`std::remove` is used to remove all instances of a value from a container within the given range [first, last). Note that the function does not resize the container after removing elements.

Example:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {5, 6, 7, 6, 8, 6, 9, 6, 10};
    nums.erase(std::remove(nums.begin(), nums.end(), 6), nums.end());

    for (int num : nums) {
        std::cout << num << ' ';
    }
    // Output: 5 7 8 9 10
}
```

## Summary

STL algorithms in C++ provide a set of useful functions for key operations such as sorting, searching, and modifying sequences. The algorithms can be used with a variety of container classes, making them highly versatile and an essential part of C++ programming.
