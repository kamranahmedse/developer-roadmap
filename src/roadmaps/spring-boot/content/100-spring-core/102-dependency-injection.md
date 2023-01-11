# Dependency injection

Dependency injection is a technique where an object supplies the dependencies of another object. In Spring Boot, dependency injection is used to manage the objects that make up an application, and to provide those objects with the dependencies they need to function properly.

Spring Boot uses the Spring Framework's Inversion of Control (IoC) container to manage objects and their dependencies. The IoC container is responsible for creating objects, wiring them together, and managing their lifecycle. When an object is created, its dependencies are also created and injected into the object.

There are several ways to perform dependency injection in Spring Boot:

1. Using the **@Autowired** annotation: This annotation is used to mark a constructor, field, or setter method as something that should be automatically wired by Spring.

2. Using the **@Inject** annotation : This is an alternative for @Autowired, javax.inject.Inject is a standard annotation for dependency injection and Spring supports it too.

3. Using XML configuration: You can use XML files to define the dependencies that should be injected into your objects.

4. Using Java configuration: Instead of using XML files, you can use Java configuration classes to define the dependencies that should be injected.

Regardless of the approach you use, the core idea behind dependency injection in Spring Boot is to separate the concerns of an application and to make it easy to change or replace the dependencies of an object without affecting the rest of the application.

You can learn more about dependency injection in Spring Boot by reading the documentation and following some tutorials available online.

Visit the following links for more resources:

- [Spring Dependency Injection](https://www.baeldung.com/spring-dependency-injection#:~:text=Dependency%20Injection%20is%20a%20fundamental,managing%20components%20onto%20the%20container.)
- [Dependency Injection Using Spring Boot](https://medium.com/edureka/what-is-dependency-injection-5006b53af782)
- [Dependency Injection in Spring](https://www.javatpoint.com/dependency-injection-in-spring)


