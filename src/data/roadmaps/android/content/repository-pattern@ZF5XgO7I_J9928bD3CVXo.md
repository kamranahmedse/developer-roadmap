# Repository Pattern

The `Repository Pattern` separates the data sources from the rest of the application. It acts as a mediator between different data sources, such as persistent models, web services, or caches. Instead of having the network and database calls spread out throughout your ViewModel, they are encapsulated within a Repository class. This separation will make the code clean, easy to read and testable. It provides a simple API for data access, the rest of the app doesn't need to know where the data is coming from it just asks the repository.

Visit the following resources to learn more:

- [@article@Repository Pattern](https://en.wikipedia.org/wiki/Repository_pattern)
