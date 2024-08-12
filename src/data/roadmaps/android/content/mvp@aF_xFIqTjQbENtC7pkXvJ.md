# MVP or Model View Presenter

The MVP `Model View Presenter` pattern is a derivative of the well-known MVC `Model View Controller` pattern and is one of the most popular patterns for organizing the presentation layer in Android applications.

MVP is divided into three components:

- `Model`: Responsible for managing the data input to the app. This can often be an Interactor or UseCase, handling the business logic and data operations.
- `View`: Takes care of updating the graphical part of the application. It acts as a passive view, only receiving data and requesting actions to be performed.
- `Presenter`: Handles all the logic related to the graphical interface that the View requests. It provides the View with the data it needs to display on the screen.

This structure helps to create a clear separation of concerns, making your codebase more modular and easier to maintain.
