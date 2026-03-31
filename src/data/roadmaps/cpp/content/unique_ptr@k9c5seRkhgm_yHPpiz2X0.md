# unique_ptr

`unique_ptr` is a smart pointer in C++ that provides exclusive ownership of a dynamically allocated object. It ensures that only one `unique_ptr` can point to a given object at any time, preventing memory leaks by automatically deleting the managed object when the `unique_ptr` goes out of scope or is explicitly reset. Ownership can be transferred to another `unique_ptr` using `std::move`, but copying is disallowed to enforce the single-ownership principle.

Visit the following resources to learn more:

- [@official@std::unique_ptr - Detailed Reference](https://en.cppreference.com/w/cpp/memory/unique_ptr)
- [@article@Smart Pointers – unique_ptr](https://www.learncpp.com/cpp-tutorial/stdunique_ptr/)
- [@video@When should you use std::unique_ptr? - StackOverflow Discussion](https://stackoverflow.com/questions/13782051/when-should-you-use-stdunique-ptr)