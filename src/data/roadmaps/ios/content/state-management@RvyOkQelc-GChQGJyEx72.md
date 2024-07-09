# State Management

SwiftUI state management revolves around property wrappers that handle different types of app state. `@State` is used for local view state, `@Binding` for sharing state between views, `@ObservedObject` for external reference type state, `@EnvironmentObject` for dependency injection across the view hierarchy, and `@StateObject` for creating and managing the lifecycle of observed objects. These tools, combined with SwiftUI's declarative syntax, enable reactive UI updates based on state changes. For more complex state management, developers often use architectural patterns like MVVM or libraries such as Combine.

Learn more from the following resources:

- [@official@Managing user interface state](https://developer.apple.com/documentation/swiftui/managing-user-interface-state)
- [@article@Advanced: SwiftUI State Managment](https://medium.com/@canakyildz/advanced-swiftui-state-management-3816d804477e)
- [@article@A Guide to Managing State in SwiftUI](https://www.waldo.com/blog/manage-swiftui-state)