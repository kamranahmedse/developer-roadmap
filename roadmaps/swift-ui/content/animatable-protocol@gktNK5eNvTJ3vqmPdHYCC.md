# Animatable Protocol

The `Animatable` protocol allows you to customize how changes to your custom data types are animated in SwiftUI. By conforming to this protocol, you define a `var animatableData: Self.AnimatableData` property that SwiftUI uses to interpolate between the starting and ending values of your data during an animation. This enables smooth transitions for properties that aren't directly animatable by default, giving you fine-grained control over animation behavior.

Visit the following resources to learn more:

- [@official@Animatable](https://developer.apple.com/documentation/SwiftUI/Animatable)
- [@article@How to create animatable views, modifiers, and more](https://www.hackingwithswift.com/quick-start/swiftui/how-to-create-animatable-views-modifiers-and-more)
- [@article@The magic of Animatable values in SwiftUI](https://swiftwithmajid.com/2020/06/17/the-magic-of-animatable-values-in-swiftui/)
- [@video@Animate Custom shapes with AnimateableData in SwiftUI | Advanced Learning #7](https://www.youtube.com/watch?v=kzrtiPbR3LQ)