# Actors

Actors are a concurrency model that provides a way to isolate state and prevent data races in concurrent Swift programs. They encapsulate mutable state and allow access to that state only through asynchronous message passing. This ensures that only one task can access the actor's state at any given time, eliminating the need for locks or other complex synchronization mechanisms. Actors are particularly useful in Swift and SwiftUI for managing shared data across different parts of your application, especially when dealing with asynchronous operations.

Visit the following resources to learn more:

- [@official@Actors](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/#Actors)
- [@article@What is an actor and why does Swift have them?](https://www.hackingwithswift.com/quick-start/concurrency/what-is-an-actor-and-why-does-swift-have-them)
- [@video@How to use Actors and non-isolated in Swift | Swift Concurrency #9](https://www.youtube.com/watch?v=UUdi137FySk)