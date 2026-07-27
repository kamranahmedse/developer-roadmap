# Implementing Delegates
 
Implementing a delegate involves defining a protocol with required methods, adding a weak delegate property to the delegating class, and calling delegate methods at the appropriate times. The conforming class implements the protocol methods to respond to events. The weak reference is necessary to prevent retain cycles between the delegate and the delegating object.

Visit the following resources to learn more:

- [@article@Delegates in Swift](https://medium.com/@muhammad.cse11/delegates-in-swift-ios-application-6dfb37897f9b)
- [@article@What is a delegate in Swift](https://www.hackingwithswift.com/example-code/language/what-is-a-delegate-in-ios)
- [@video@Delegate protocol - Swift example](https://www.youtube.com/watch?v=Z9eSUE-lzig)