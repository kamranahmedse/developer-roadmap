# Scoped

Scoped lifetime is a type of dependency injection that creates a new instance of an object for each unique request, but reuses the same instance for the same request. This means that if multiple components within the same request depend on the same service, they will all receive the same instance. However, if another request is made, a new instance of the service will be created for that request.

Scoped lifetime is useful when you have services that are specific to a given request, such as a request-scoped database context. This allows you to have a separate and isolated instance of a service for each unique request, which can help to prevent cross-request contamination of data and improve performance.

For more information, visit the following resources:

- [@article@Dependency Injection - What is Scope?](https://javaranch.com/journal/2008/10/dependency-injection-what-is-scope.html)
- [@article@Effective Dependency Injection Scoping](https://medium.com/android-news/effective-dependency-injection-scoping-4bac813d4491)
