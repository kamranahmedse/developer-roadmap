# Combine and MVVM

Combine and MVVM (Model-View-ViewModel) form a powerful combination in iOS development. Combine's reactive approach complements MVVM's separation of concerns. In this pairing, ViewModels use Combine publishers to expose data streams to Views, which subscribe to these streams for reactive UI updates. Models can publish changes through Combine, which ViewModels then process and transform. This setup allows for clean, declarative bindings between Views and ViewModels, reducing boilerplate code and improving testability. Combine's operators facilitate complex data transformations within ViewModels, while its handling of asynchronous operations simplifies tasks like network requests.

Learn more from the following resoureces:

- [@article@MVVM Design Pattern with Combine Framework](https://medium.com/@mshcheglov/mvvm-design-pattern-with-combine-framework-on-ios-5ff911011b0b)
- [@article@MVVM and Combine](https://betterprogramming.pub/uikit-mvvm-combine-912c80c02262)
- [@video@MVVM Combine Swift (2022)](https://www.youtube.com/watch?v=KK6ryBmTKHg)