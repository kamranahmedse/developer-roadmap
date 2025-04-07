# Components

The Spring MVC (Model-View-Controller) framework has several key components that work together to handle the requests and generate the appropriate responses in a web application. These components include:

- `DispatcherServlet`: This is the front controller of the Spring MVC architecture. It is responsible for handling incoming requests, delegating responsibility to other components, and ultimately returning a response to the user.
- `Controller`: Controllers handle the incoming requests, perform any necessary business logic on the Model, and then forward or redirect the request to the appropriate view.
- `Model`: The Model represents the data and the business logic of the application. It can be implemented using JavaBeans, POJOs, or other Java objects.
- `View`: The View is responsible for generating the HTML that is sent to the client's web browser. In Spring MVC, views are typically implemented using JSPs, but other view technologies such as Thymeleaf, FreeMarker, Velocity can also be used.
- `ViewResolver`: This is responsible for resolving views based on the request and configured view resolvers. It maps logical view names to actual views, such as JSPs or Thymeleaf templates.
- `Form Controllers`: These are special type of controllers that handle form submissions, and are responsible for data binding, validation and error handling.
- `HandlerMapping`: This maps requests to appropriate controllers, responsible for handling the requests.
- `HandlerAdapter`: This is used to handle the request and generate the response.

There are other supporting components that are used to manage the lifecycle of the application's objects, such as the Spring IoC container and different interceptors that provides additional functionality, such as caching and security.