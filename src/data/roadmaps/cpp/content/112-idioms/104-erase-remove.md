# Erase-remove idiom

The erase-remove idiom is a common C++ technique to efficiently remove elements from a container, particularly from standard sequence containers like `std::vector`, `std::list`, and `std::deque`. It leverages the standard library algorithms `std::remove` (or `std::remove_if`) and the member function `erase()`.

The idiom consists of two steps:
- `std::remove` (or `std::remove_if`) moves the elements to be removed towards the end of the container and returns an iterator pointing to the first element to remove.
- `container.erase()` removes the elements from the container using the iterator obtained in the previous step.

Here's an example:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 3, 2, 4, 3, 5, 3};
    
    // Remove all occurrences of 3 from the vector.
    numbers.erase(std::remove(numbers.begin(), numbers.end(), 3), numbers.end());

    for (int number : numbers) {
        std::cout << number << " ";
    }

    return 0;
}
```

Output:

```
1 2 4 5
```

In this example, we used the `std::remove` algorithm to remove all occurrences of the number 3 from the `std::vector<int> numbers`. After the removal, the vector contains only 1, 2, 4, and 5, as the output shows.