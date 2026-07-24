# Concurrency
 
Swift's structured concurrency builds on async/await with additional primitives for parallel execution. async let runs multiple async operations concurrently, TaskGroup manages a dynamic set of concurrent child tasks, and actors protect shared mutable state from data races. The Swift concurrency model enforces safety through the Sendable protocol and actor isolation.

Visit the following resources to learn more:

- [@official@Swift Documentation (How to interact)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/)
- [@official@Apple Documentation (Signatures for interaction)](https://developer.apple.com/documentation/swift/concurrency)
- [@article@Concurrency bu Example](https://www.hackingwithswift.com/quick-start/concurrency)