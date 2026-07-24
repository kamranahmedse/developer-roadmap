# Capturing Values & Memory Mgmt.
 
Closures capture references to the variables and constants from their surrounding context. When a closure captures a class instance, it holds a strong reference by default, which can create retain cycles if the instance also holds the closure. Capture lists using [weak self] or [unowned self] break these cycles and are a required pattern in iOS Swift development.

Visit the following resources to learn more:

- [@article@Capture lists in Swift](https://www.hackingwithswift.com/articles/179/capture-lists-in-swift-whats-the-difference-between-weak-strong-and-unowned-references)
- [@article@Swift’s closure capturing mechanics](https://www.swiftbysundell.com/articles/swifts-closure-capturing-mechanics/)