# C++ Containers

C++ Containers are a part of the Standard Template Library (STL) that provide data structures to store and organize data. There are several types of containers, each with its own characteristics and use cases. Here, we discuss some of the commonly used containers:

## 1. Vector

Vectors are dynamic arrays that can resize themselves as needed. They store elements in a contiguous memory location, allowing fast random access using indices.

## Example

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    vec.push_back(6); // Add an element to the end

    std::cout << "Vector contains:";
    for (int x : vec) {
        std::cout << ' ' << x;
    }
    std::cout << '\n';
}
```

## 2. List

A list is a doubly-linked list that allows elements to be inserted or removed from any position in constant time. It does not support random access. Lists are better than vectors for scenarios where you need to insert or remove elements in the middle frequently.

## Example

```cpp
#include <iostream>
#include <list>

int main() {
    std::list<int> lst = {1, 2, 3, 4, 5};

    lst.push_back(6); // Add an element to the end
    
    std::cout << "List contains:";
    for (int x : lst) {
        std::cout << ' ' << x;
    }
    std::cout << '\n';
}
```

## 3. Map

A map is an associative container that stores key-value pairs. It supports the retrieval of values based on their keys. The keys are sorted in ascending order by default.

## Example

```cpp
#include <iostream>
#include <map>

int main() {
    std::map<std::string, int> m;

    m["one"] = 1;
    m["two"] = 2;

    std::cout << "Map contains:" << '\n';
    for (const auto &pair : m) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
}
```

## 4. Unordered_map

Similar to a map, an unordered map stores key-value pairs, but it is implemented using a hash table. This means unordered_map has faster average-case performance compared to map, since it does not maintain sorted order. However, worst-case performance can be worse than map.

## Example

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> um;

    um["one"] = 1;
    um["two"] = 2;

    std::cout << "Unordered map contains:" << '\n';
    for (const auto &pair : um) {
        std::cout << pair.first << ": " << pair.second << '\n';
    }
}
```

These are just a few examples of C++ containers. There are other container types, such as `set`, `multiset`, `deque`, `stack`, `queue`, and `priority_queue`. Each container has its own use cases and unique characteristics. Learning about these containers and when to use them can greatly improve your efficiency and effectiveness in using C++.