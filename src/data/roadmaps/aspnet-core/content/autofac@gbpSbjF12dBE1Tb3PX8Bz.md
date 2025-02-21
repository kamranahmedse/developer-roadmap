# Autofac

Autofac is an open-source dependency injection framework for .NET. It is designed to make it easier to manage the dependencies of an application by automatically resolving and managing the lifetime of objects and their dependencies.

Autofac uses a technique called "component registration" to define the objects and dependencies of an application. This is done by creating instances of the `ContainerBuilder` class and using its methods to register types, instances and factories. Then, the `Build()` method is called to create an instance of the `IContainer` interface, which can be used to resolve dependencies throughout the application.

Visit the following resources for more information:

- [@article@Autofac’s Documentation](https://autofac.readthedocs.io/en/latest/)
- [@official@Getting started with Autofac](https://autofac.org/)
- [@article@Dependency Injection with Autofac](https://www.codeproject.com/Articles/25380/Dependency-Injection-with-Autofac)
