# Automatic Reference Counting (ARC)

Automatic Reference Counting (ARC) is a memory management feature in Swift that automatically frees up memory used by class instances when they are no longer needed. It works by tracking how many references exist to each object. When the reference count drops to zero, meaning no other parts of the code are using that object, ARC deallocates the memory, preventing memory leaks. This process is automatic, reducing the need for manual memory management like in some other languages.

Visit the following resources to learn more:

- [@official@Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)
- [@article@A detailed explanation of how ARC works in Swift](https://medium.com/@ahmed044/a-detailed-explanation-of-how-arc-works-in-swift-8076fc79e03b)
- [@article@Understanding Swift ARC: The Complete Guide to Memory Management](https://www.dhiwise.com/post/understanding-swift-arc-complete-guide-to-memory-management)
- [@video@WWDC21: ARC in Swift: Basics and beyond | Apple](https://www.youtube.com/watch?v=GFq6sV2jD_c)