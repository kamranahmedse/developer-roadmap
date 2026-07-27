# Smart Pointers

Smart pointers are classes that behave like regular pointers but provide automatic memory management. They help prevent memory leaks by automatically deallocating the memory they point to when they are no longer needed. This is achieved through techniques like reference counting and RAII (Resource Acquisition Is Initialization). Essentially, they encapsulate a raw pointer and ensure that the memory it points to is freed when the smart pointer goes out of scope or is reset.

Visit the following resources to learn more:

- [@article@Smart Pointers](https://en.cppreference.com/book/intro/smart_pointers)
- [@video@SMART POINTERS in C++ (std::unique_ptr, std::shared_ptr, std::weak_ptr)](https://www.youtube.com/watch?v=UOB7-B2MfwA)