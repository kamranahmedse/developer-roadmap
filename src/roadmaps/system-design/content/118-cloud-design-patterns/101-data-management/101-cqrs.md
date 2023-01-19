# CQRS

CQRS (Command Query Responsibility Segregation) in system design is a pattern that separates the responsibilities of handling read and write operations in a system. This pattern allows for the separation of concerns between the read and write operations, and can be used to improve the scalability, performance, and maintainability of a system.

In this pattern, the read and write operations are handled by different components in the system. The write operations, known as commands, are handled by a Command component that updates the state of the system. The read operations, known as queries, are handled by a Query component that retrieves the current state of the system.

Learn more from the following links:

- [CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)