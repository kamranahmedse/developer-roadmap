# @ObservedObject

`@ObservedObject` is a property wrapper in SwiftUI used to subscribe to an external class that conforms to the `ObservableObject` protocol.  When the observable object publishes changes (typically through `@Published` properties), any views observing it will automatically update to reflect the new data. This allows you to manage and share state across different parts of your SwiftUI application, ensuring that the UI stays synchronized with the underlying data model.

Visit the following resources to learn more:

- [@official@ObservedObject](https://developer.apple.com/documentation/swiftui/observedobject)
- [@article@How to use @ObservedObject to manage state from external objects](https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-observedobject-to-manage-state-from-external-objects)
- [@video@DON'T Make this MISTAKE || StateObject vs ObservedObject | What's the Difference?](https://www.youtube.com/watch?v=RvzJLekIjRs)