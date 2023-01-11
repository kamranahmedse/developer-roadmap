# Architecture


The Spring MVC (Model-View-Controller) architecture is a web application framework that is part of the Spring Framework. It is designed to make it easy to build web applications using the MVC design pattern.

In the Spring MVC architecture, the application is divided into three main components:

- Model: This represents the data and the business logic of the application. It can be implemented using JavaBeans, POJOs or other Java objects.
- View: This represents the presentation logic of the application, and is responsible for generating the HTML that is sent to the client's web browser In Spring MVC, views are typically implemented using JSPs, but other view technologies such as Thymeleaf, FreeMarker, Velocity can also be used.
- Controller: This acts as the intermediary between the Model and the View, and is responsible for handling HTTP requests and generating the appropriate response.

When a user makes a request to a Spring MVC application, the DispatcherServlet, which acts as the front controller, handles the request. It's responsibility is to delegate it to the appropriate controller, and that controller perform any business logic necessary on the Model and then forward or redirect it to the appropriate view.

The Spring MVC architecture also includes other components such as the Spring IoC container, which manages the lifecycle of the application's objects, and the Spring's ViewResolver, which is responsible for resolving views based on the request and configured view resolvers.

Overall, Spring MVC's architecture promotes the separation of concerns and ease of testing, while providing a robust set of features, such as a powerful data binding and validation, flexible view resolution and different type of file format support.


For more resources, visit the following resources:

- [Spring MVC Tutorial](https://www.javatpoint.com/spring-mvc-tutorial)
- [Spring – MVC Framework](https://www.geeksforgeeks.org/spring-mvc-framework/)
- [Overview of Spring MVC Architecture](https://terasolunaorg.github.io/guideline/1.0.1.RELEASE/en/Overview/SpringMVCOverview.html)









