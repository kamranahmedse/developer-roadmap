# Iterators

Iterators are objects in the C++ Standard Library (`STL`) that help us traverse containers like arrays, lists, and vectors. Essentially, they act as a bridge between container classes and algorithms. Iterators behave similar to pointers but provide a more generalized and abstract way of accessing elements in a container.

There are different types of iterators which you would encounter depending on their use cases:

- **Input Iterator**: Used to read elements in a container only once, in a forward direction. They cannot modify elements.

Example:

```cpp
std::vector<int> nums = {1, 2, 3, 4};
std::istream_iterator<int> input(std::cin);
std::copy(input, std::istream_iterator<int>(), std::back_inserter(nums));
```

- **Output Iterator**: Used to write elements in a container only once, in a forward direction. They cannot re-write elements.

Example:

```cpp
std::vector<int> nums = {1, 2, 3, 4};
std::ostream_iterator<int> output(std::cout, ", ");
std::copy(nums.begin(), nums.end(), output);
```

- **Forward Iterator**: Similar to input iterators but can be used for multiple passes over the elements in a container. They cannot move backward.

Example:

```cpp
std::forward_list<int> nums = {1, 2, 3, 4};
std::forward_list<int>::iterator itr = nums.begin();
while (itr != nums.end()) {
    std::cout << *itr << " ";
    ++itr;
}
```

**Reverse Iterator**: Similar to input iterators but can be used for multiple passes over the elements in a container. They cannot move forward.

Example:

```cpp
std::list<int> nums = {1, 2, 3, 4};
std::list<int>::reverse_iterator itr = nums.rbegin();
while (itr != nums.rend()) {
    std::cout << *itr << " ";
    ++itr;
}
```

- **Bidirectional Iterator**: These iterators offer the ability to move both forward and backward in a container. List and set containers have bi-directional iterators.

Example:

```cpp
std::list<int> nums = {1, 2, 3, 4};
std::list<int>::iterator itr;
for (itr = nums.begin(); itr != nums.end(); ++itr) {
    std::cout << *itr << " ";
}
for (--itr; itr != nums.begin(); --itr) {
    std::cout << *itr << " ";
}
```

- **Random Access Iterator**: These iterators provide the most flexible ways to access elements in a container. They can move forwards, backwards, jump directly to other elements, and access elements at a given index.

Example:

```cpp
std::vector<int> nums = {1, 2, 3, 4};
std::vector<int>::iterator itr;
for (itr = nums.begin(); itr != nums.end(); ++itr) {
    std::cout << *itr << " ";
}
for (itr -= 1; itr != nums.begin() - 1; --itr) {
    std::cout << *itr << " ";
}
```

For most cases, you would want to start with the `auto` keyword and the appropriate container methods (like `begin()` and `end()`) to work with iterators.

Example:

```cpp
std::vector<int> nums = {1, 2, 3, 4};
for (auto itr = nums.begin(); itr != nums.end(); ++itr) {
    std::cout << *itr << " ";
}
```

When working with algorithms, remember that the C++ Standard Library provides various algorithms that already utilize iterators for tasks like searching, sorting, and manipulating elements.
