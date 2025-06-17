# Commands Queries

The Command and Query Responsibility Segregation (CQRS) pattern is a technique used in enterprise application development to separate the responsibilities of handling command (write) operations and query (read) operations for performing actions that change the state of the system, such as creating, updating, or deleting data. These operations are handled by Command Handlers, which are responsible for validating the data and executing the appropriate business logic.

Queries are used for retrieving data from the system, such as reading data from a database or a cache. These operations are handled by Query Handlers, which are responsible for executing the appropriate query and returning the data to the caller.

Learn more from the following links:

- [@article@Get Started with CQRS Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
