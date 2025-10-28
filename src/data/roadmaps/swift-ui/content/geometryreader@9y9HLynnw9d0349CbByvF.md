# GeometryReader

GeometryReader is a container view that provides information about its own size and position within its parent view. It allows you to access the available space offered by the parent, enabling you to create views that adapt dynamically to different screen sizes and orientations. By using a closure, you can access a `GeometryProxy` object, which contains the frame (size and position) of the GeometryReader. This information can then be used to calculate and position other views relative to the GeometryReader's frame.

Visit the following resources to learn more:

- [@official@GeometryReader](https://developer.apple.com/documentation/swiftui/geometryreader)
- [@article@Understanding frames and coordinates inside GeometryReader](https://www.hackingwithswift.com/books/ios-swiftui/understanding-frames-and-coordinates-inside-geometryreader)
- [@video@GeometryReader in SwiftUI to get a view's size and location | Continued Learning #6](https://www.youtube.com/watch?v=lMteVjlOIbM)