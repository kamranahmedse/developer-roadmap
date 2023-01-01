# MVC MVP MVVM

Model-view-controller, or MVC, is a pattern used to separate user-interface, data and application logic.
It does this by separating an application into three parts: Model, View, and Controller. The model holds the data, the view encompasses the user-interface, and the controller acts as a mediator between the two.

Model-view-presenter, or MVP, was designed to ease automated unit testing and improve the separation of concerns in presentation logic. MVP is a variant of the MVC pattern, though differs in that it divides the application into the user-interface (view), data (model) and presentation logic (presenter). While the model and the view represent stay the same as in the model-view-controller pattern, the presenter differs from the controller in that it manipulates the model and updates the view.

Another variant of the MVC is the model-view-viewmodel pattern. The Model-view-viewmodel, or MVVM, separates the application into three core components: Model, View, and View Model. While the view and model represent all that they did in their parent pattern, the view model acts as a link between the model and view, retrieves data from the model and exposes it to the view through two-way data binding and can manipulate the model's data.

- [MVC, MVP and MVVM Design Pattern](https://medium.com/@ankit.sinhal/mvc-mvp-and-mvvm-design-pattern-6e169567bbad)
