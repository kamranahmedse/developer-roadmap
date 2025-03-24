# Transient

Transient lifetime is a type of dependency injection that creates a new instance of an object each time it is requested. This means that if multiple components within the same request or across different requests depend on the same service, they will each receive a new instance of the service.

Transient lifetime is useful when you have services that are stateless and do not need to maintain any data between requests, such as a service that performs a simple calculation or returns data from a database.

For more information:

- [@article@What are Transient Dependencies?](https://blazor-university.com/dependency-injection/dependency-lifetimes-and-scopes/transient-dependencies/)
- [@article@Dependency Injection Lifetime](https://www.tektutorialshub.com/asp-net-core/asp-net-core-dependency-injection-lifetime/)
- [@video@Dependency Injection Explained with Transient](https://www.youtube.com/watch?v=NkTF_6IQPiY)
