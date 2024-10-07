# Dependency Injection

`Dependency Injection` is a technique where an object does not need to create its own dependencies; instead, dependencies are provided (or injected) at runtime. This technique is highly beneficial in Android Development. It helps in creating loosely coupled and easily testable code. For example, the `Retrofit` instance that your application requires to make network calls can be created somewhere else and can be injected whenever required using libraries like `Dagger`, `Koin` or `Hilt`. The `ViewModel` instances can also be injected rather than being created in the required classes directly. Through dependency injection, plugins ensure the code becomes easier to change, understand, and maintain, hence, improving the quality of the code.

Visit the following resources to learn more:

- [@official@Dependency Injection](https://developer.android.com/training/dependency-injection)
