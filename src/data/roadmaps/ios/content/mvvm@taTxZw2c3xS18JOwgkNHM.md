# MVVM

The Model-View-ViewModel (MVVM) architectural pattern is a design approach that separates an application's user interface logic from its business logic. In iOS development:

**Model**: Represents data and business logic, independent of the UI.

**View**: Displays information and captures user input. In iOS, this is typically a UIView or UIViewController.

**ViewModel**: Acts as an intermediary between Model and View, containing the presentation logic and state. It exposes data and commands for the View to bind to.

MVVM promotes a clear separation of concerns, enhances testability, and facilitates data binding. The ViewModel transforms Model information for View consumption and handles View-related logic, making the View as passive as possible.

Learn more from the following resources:

- [@video@]MVVM In 100 Seconds](https://www.youtube.com/watch?v=-xTqfilaYow)
- [@article@Understanding MVVM: Model-View-ViewModel Architecture Explained](https://www.ramotion.com/blog/what-is-mvvm/)
- [@article@MVVM - Wikipedia](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
- [@article@MVVM - Microsoft](https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm)
