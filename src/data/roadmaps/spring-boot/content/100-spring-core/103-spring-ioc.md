# Spring IOC

Inversion of Control (IoC) is a design pattern that is often used in conjunction with the Dependency Injection (DI) pattern. The basic idea behind IoC is to invert the flow of control in a program, so that instead of the program controlling the flow of logic and the creation of objects, the objects themselves control the flow of logic and the creation of other objects.

Spring is a popular Java framework that uses IoC and DI to provide a more flexible, modular approach to software development. The Spring IoC container is responsible for managing the creation and configuration of objects in a Spring-based application.

The Spring IoC container creates objects, wires them together, configures them, and manages their complete lifecycle from creation till destruction. This removes the burden of instantiating and configuring objects from the application code, and allows the application code to focus on the business logic rather than on infrastructure concerns.

Spring IoC container provides two ways to configure the objects:

- XML based configuration
- Annotation based configuration

In XML based configuration, you use XML file to describe the configuration metadata and the container creates the objects and wire them together.

In Annotation based configuration, you use annotations in the Java source code to describe the configuration metadata and the container creates the objects and wire them together.

Both way, Spring IoC container can be used to create, manage, and wire together objects in a Spring-based application, using a variety of different strategies, including constructor injection, setter injection, and interface injection.

Overall, Spring IoC container provides a central location to manage the lifecycle and configuration of objects in an application, making it easier to develop, test, and maintain the code.

More more resources, check out the following links:

- [@article@Spring IoC, Spring Bean Example Tutorial](https://www.digitalocean.com/community/tutorials/spring-ioc-bean-example-tutorial)
- [@article@Intro to Inversion of Control with Spring](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring)
- [@article@IoC Container](https://www.tpointtech.com/ioc-container)
- [@feed@Explore top posts about Spring Framework](https://app.daily.dev/tags/spring?ref=roadmapsh)
