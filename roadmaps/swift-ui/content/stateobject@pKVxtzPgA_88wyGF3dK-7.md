# @StateObject

`@StateObject` is a property wrapper used to manage the lifecycle of reference type objects (classes) that hold state for a view. It ensures that the object is created only once when the view appears and persists across view updates, preventing the object from being re-initialized every time the view redraws. This is particularly useful for managing data that needs to be shared and maintained within a specific view's scope.

Visit the following resources to learn more:

- [@official@StateObject](https://developer.apple.com/documentation/swiftui/stateobject)
- [@article@What is the @StateObject property wrapper?](https://www.hackingwithswift.com/quick-start/swiftui/what-is-the-stateobject-property-wrapper)
- [@article@SwiftUI: StateObject x ObservedObject, when to use each one](https://pedroalvarez-29395.medium.com/swiftui-stateobject-x-observedobject-when-to-use-each-one-f738eb57ba6e)
- [@video@DON'T Make this MISTAKE || StateObject vs ObservedObject | What's the Difference?](https://www.youtube.com/watch?v=RvzJLekIjRs)