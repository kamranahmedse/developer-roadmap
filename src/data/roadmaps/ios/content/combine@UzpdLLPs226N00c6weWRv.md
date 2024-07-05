# Combine
Combine is Apple's built-in framework for reactive programming, using the same publisher-subscriber pattern as most modern approaches to this issue.
Combine introduces the concept of a `Cancellable` (i.e. a subscription) and many different operators to use on these Cancellables.
When writing Combine code, developers will notice complex generic types. For this reason, type-erasure can be done through `AnyCancellable`.

Visit the following resources to learn more:

- [@official@Combine](https://developer.apple.com/documentation/combine)
- [@video@Understanding Combine](https://youtu.be/rz0yx0Qz2jE)
