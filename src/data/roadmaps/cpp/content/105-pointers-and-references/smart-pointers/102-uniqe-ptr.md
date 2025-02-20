# Unique Pointer (`unique_ptr`)

`std::unique_ptr` is a smart pointer provided by the C++ Standard Library. It is a template class that is used for managing single objects or arrays.

`unique_ptr` works on the concept of *exclusive ownership* - meaning only one `unique_ptr` is allowed to own an object at a time. This ownership can be transferred or moved, but it cannot be shared or copied.

This concept helps to prevent issues like dangling pointers, reduce memory leaks, and eliminates the need for manual memory management. When the `unique_ptr` goes out of scope, it automatically deletes the object it owns.

Let's take a look at some basic examples of using `unique_ptr`:

## Creating a unique_ptr

```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> p1(new int(5)); // Initialize with pointer to a new integer
    std::unique_ptr<int> p2 = std::make_unique<int>(10); // Preferred method (C++14 onwards)

    std::cout << *p1 << ", " << *p2 << std::endl;
    return 0;
}
```

## Transferring Ownership

```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> p1(new int(5));

    std::unique_ptr<int> p2 = std::move(p1); // Ownership is transferred from p1 to p2

    if (p1) {
        std::cout << "p1 owns the object\n";
    } else if (p2) {
        std::cout << "p2 owns the object\n";
    }

    return 0;
}
```

## Using unique_ptr with Custom Deleters

```cpp
#include <iostream>
#include <memory>

struct MyDeleter {
    void operator()(int* ptr) {
        std::cout << "Custom Deleter: Deleting pointer\n";
        delete ptr;
    }
};

int main() {
    std::unique_ptr<int, MyDeleter> p1(new int(5), MyDeleter());
    return 0; // Custom Deleter will be called when p1 goes out of scope
}
```

Remember that since unique_ptr has exclusive ownership, you cannot use it when you need shared access to an object. For such cases, you can use `std::shared_ptr`.