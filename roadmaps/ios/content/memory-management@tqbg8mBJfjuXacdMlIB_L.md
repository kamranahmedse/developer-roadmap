# Memory Management
 
iOS uses Automatic Reference Counting (ARC) to manage memory. ARC tracks how many strong references point to each object and deallocates it when the count drops to zero. Developers must understand strong, weak, and unowned references to avoid retain cycles, which cause memory leaks.

Visit the following resources to learn more:

- [@official@WWDC2021: ARC in Swift: Basics and beyond](https://developer.apple.com/videos/play/wwdc2021/10216/)
- [@official@ARC(Automatic Reference Counting)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)
- [@official@About Memory Management](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/MemoryMgmt.html)
- [@official@Mac Apps That Use Garbage Collection Must Move to ARC](https://developer.apple.com/news/?id=02202015a)