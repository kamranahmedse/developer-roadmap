# unique_ptr

One of C++'s main features includes variants of the normal *raw* C pointers. One of these is the `unique_ptr`, which is a type of smart pointer that claims exclusive ownership over a value.

These types of pointers **can be moved** (`std::move`), but not **copied** and are automatically deleted when out of scope. The recommended way to create a `unique_ptr` is using `std::make_unique`.

```cpp
#include <memory>
#include <iostream>

int main() {
    std::unique_ptr<int> uptr = std::make_unique<int>(10);
    std::cout << *uptr << std::endl;

    std::unique_ptr<int> uptr2 = uptr; // compile error
    std::unique_ptr<int> uptr2 = std::move(uptr); // transferring ownership
}
```

- [@official@std::unique_ptr - Detailed Reference](https://en.cppreference.com/w/cpp/memory/unique_ptr)  
- [@article@Smart Pointers – unique_ptr](https://www.learncpp.com/cpp-tutorial/unique-ptr/)  
- [@video@When should you use std::unique_ptr? - StackOverflow Discussion](https://stackoverflow.com/questions/13782051/when-should-you-use-stdunique-ptr)
