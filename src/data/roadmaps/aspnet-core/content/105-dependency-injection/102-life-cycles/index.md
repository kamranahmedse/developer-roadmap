# Life Cycles

In ASP.NET, dependency injection (DI) lifecycles determine the lifetime of objects that are resolved through the DI container. There are several predefined lifecycle options in the `Microsoft.Extensions.DependencyInjection` library, including:

- **Transient:** A new instance of the object is created every time it is requested.
- **Scoped:** A new instance of the object is created for each request within the same scope.
- **Singleton:** A single instance of the object is created and shared across the entire application.

Additionally, you can also create a custom lifecycle by implementing the `Microsoft.Extensions.DependencyInjection.IServiceScopeFactory` interface

For more resources, visit the following links:

- [@video@Complete Guide to Dependency Injection Lifecycles](https://www.youtube.com/watch?v=wA5bPsv2CLA)
- [@article@What are Service Life Cyles in ASP.NET Core?](https://endjin.com/blog/2022/09/service-lifetimes-in-aspnet-core)
- [@article@Learn Service Lifetimes in .NET Core](https://henriquesd.medium.com/dependency-injection-and-service-lifetimes-in-net-core-ab9189349420)
