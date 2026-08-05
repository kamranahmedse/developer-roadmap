# CQRS, Eventual Consistency
 
CQRS, or Command Query Responsibility Segregation, separates the operations that change data from the operations that read data, often using different models for each. This separation pairs naturally with eventual consistency, where updates propagate across a system over time instead of instantly. These patterns are common in distributed systems where strict, immediate consistency would hurt performance or scalability.

Visit the following resources to learn more:

- [@article@CQRS](https://martinfowler.com/bliki/CQRS.html)
- [@article@Introduction to CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)