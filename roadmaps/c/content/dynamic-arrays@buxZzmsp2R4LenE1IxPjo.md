# Dynamic Arrays

A dynamic array is an array-like structure that can grow or shrink at runtime, typically implemented by allocating memory on the heap and reallocating a larger block, often using `realloc`, when it runs out of space. Unlike a fixed-size C array, it tracks both its current length and its allocated capacity separately. This pattern underlies dynamic array types like C++'s `std::vector` or Python's list, though C requires implementing it manually.

Visit the following resources to learn more:

- [@article@Dynamic Arrays in C](https://www.bytesbeneath.com/p/dynamic-arrays-in-c?hide_intro_popup=true)
- [@article@Dynamic arrays in C: An implementation guide](https://medium.com/@sohaib.arshid101/dynamic-arrays-in-c-an-implementation-guide-4a959de94332)
- [@video@Dynamic Arrays in C](https://www.youtube.com/watch?v=_KSKH8C9Gf0)