# Architecture

Spring Boot is a module of the Spring Framework. It is used to create stand-alone, production-grade Spring Based Applications with minimum efforts. It is developed on top of the core Spring Framework.

Spring Boot follows a layered architecture in which each layer communicates with the layer directly below or above (hierarchical structure) it.

Before understanding the Spring Boot Architecture, we must know the different layers and classes present in it. There are four layers in Spring Boot are as follows:

- Presentation Layer
- Business Layer
- Persistence Layer
- Database Layer

**Presentation Layer**: The presentation layer handles the HTTP requests, translates the JSON parameter to object, and authenticates the request and transfer it to the business layer. In short, it consists of views i.e., frontend part.

**Business Layer**: The business layer handles all the business logic. It consists of service classes and uses services provided by data access layers. It also performs authorization and validation.

**Persistence Layer**: The persistence layer contains all the storage logic and translates business objects from and to database rows.

**Database Layer**: In the database layer, CRUD (create, retrieve, update, delete) operations are performed.

Spring Boot Flow Architecture

- Now we have validator classes, view classes, and utility classes.
- Spring Boot uses all the modules of Spring-like Spring MVC, Spring Data, etc. The architecture of Spring Boot is the same as the architecture of Spring MVC, except one thing: there is no need for DAO and DAOImpl classes in Spring boot.
- Creates a data access layer and performs CRUD operation.
- The client makes the HTTP requests (PUT or GET).
- The request goes to the controller, and the controller maps that request and handles it. After that, it calls the service logic if required.
- In the service layer, all the business logic performs. It performs the logic on the data that is mapped to JPA with model classes.
- A JSP page is returned to the user if no error occurred.



For more information, visit the following links:

- [Spring Boot Architecture](https://www.javatpoint.com/spring-boot-architecture)
- [Spring Boot Architecture – Detailed Explanation](https://www.interviewbit.com/blog/spring-boot-architecture#:~:text=Spring%20Boot%20uses%20a%20hierarchical,above%20it%20(%20hierarchical%20structure).)
- [Spring Boot – Architecture](https://www.geeksforgeeks.org/spring-boot-architecture/)





