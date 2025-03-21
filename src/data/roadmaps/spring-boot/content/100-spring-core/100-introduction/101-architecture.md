# Architecture

Spring Boot follows a layered architecture in which each layer communicates with the layer directly below or above (hierarchical structure) it. There are four layers in Spring Boot are as follows:

- **Presentation Layer**: handles the HTTP requests, translates the JSON parameter to object, and authenticates the request and transfer it to the business layer.
- **Business Layer**: The business layer handles all the business logic. It consists of service classes and uses services provided by data access layers. It also performs authorization and validation.
- **Persistence Layer**: The persistence layer contains all the storage logic and translates business objects from and to database rows.
- **Database Layer**: In the database layer, CRUD (create, retrieve, update, delete) operations are performed.

For more information, visit the following links:

- [@article@Spring Boot Architecture](https://www.tpointtech.com/spring-boot-architecture)
- [@article@Spring Boot Architecture – Detailed Explanation](https://www.interviewbit.com/blog/spring-boot-architecture)
- [@feed@Explore top posts about Architecture](https://app.daily.dev/tags/architecture?ref=roadmapsh)
