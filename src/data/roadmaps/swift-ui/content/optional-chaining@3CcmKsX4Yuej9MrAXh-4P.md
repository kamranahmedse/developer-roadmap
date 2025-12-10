# Optional Chaining

Optional chaining is a feature that allows you to access properties, methods, and subscripts of an optional value. If the optional contains a value, the property, method, or subscript is accessed as normal. However, if the optional is `nil`, the entire chain gracefully fails and returns `nil` without causing a runtime error. This provides a concise way to conditionally access nested properties or methods when dealing with optionals.

Visit the following resources to learn more:

- [@official@Optional Chaining](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/optionalchaining/)
- [@article@Optional Binding vs. Optional Chaining: Swift Techniques to Avoid Runtime Errors](https://www.dhiwise.com/post/optional-binding-vs-optional-chaining-swift-techniques)
- [@video@Introduction to Swift: Optional chaining](https://www.youtube.com/watch?v=S8-QO2wUbRg)