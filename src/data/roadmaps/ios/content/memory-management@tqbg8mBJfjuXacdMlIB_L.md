# Memory Management

Memory management is the process of allocating memory for objects and freeing it after use.

- Manual Retain-Release (MRR) is where you explicitly manage memory by keeping track of the objects you have. This is implemented using a model known as reference counting, which the Foundation class NSObject provides in conjunction with the runtime environment.

- In Automatic Reference Counting (ARC), the system uses the same reference counting as the MRR system, but it inserts the appropriate memory management method calls for you during compilation.

- In Garbage Collection (GC), the system automatically tracks which objects own other objects. It then automatically releases (or collects) objects that are no longer referenced. This method uses a different mechanism than those used in MRR and ARC, and is only supported in the runtime environment on Mac OS X, not iOS.
> Beginning May 1, 2015, new Mac apps and app updates submitted to the Mac App Store may no longer use garbage collection, which was deprecated in OS X Mountain Lion. Instead, migrate your apps to Automatic Reference Counting, using the migration assistant in Xcode to help with this transition. Apps may continue to use retain/release for manual memory management. For more information, read the [Transitioning to ARC Release Notes](https://developer.apple.com/library/ios/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html).

Visit the following resources to learn more:
- [@official@WWDC2021: ARC in Swift: Basics and beyond](https://developer.apple.com/videos/play/wwdc2021/10216/)
- [@official@ARC(Automatic Reference Counting)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)
- [@official@About Memory Management](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/MemoryMgmt.html)
- [@official@Mac Apps That Use Garbage Collection Must Move to ARC](https://developer.apple.com/news/?id=02202015a)
- [@official@MemoryLayout](https://developer.apple.com/documentation/swift/memorylayout)
- [@official@Detect and diagnose memory issues](https://developer.apple.com/videos/play/wwdc2021/10180/)
- [@official@ WWDC24: Analyze heap memory](https://www.youtube.com/watch?v=X_JYRz-Hd0o)
