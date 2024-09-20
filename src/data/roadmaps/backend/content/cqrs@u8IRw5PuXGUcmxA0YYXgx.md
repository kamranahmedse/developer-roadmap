# CQRS

CQRS (Command Query Responsibility Segregation) is an architectural pattern that separates read and write operations for a data store. In this pattern, "commands" handle data modification (create, update, delete), while "queries" handle data retrieval. The principle behind CQRS is that for many systems, especially complex ones, the requirements for reading data differ significantly from those for writing data. By separating these concerns, CQRS allows for independent scaling, optimization, and evolution of the read and write sides. This can lead to improved performance, scalability, and security. CQRS is often used in event-sourced systems and can be particularly beneficial in high-performance, complex domain applications. However, it also introduces additional complexity and should be applied judiciously based on the specific needs and constraints of the system.

Visit the following resources to learn more:

- [@article@CQRS Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [@video@Learn CQRS Pattern in 5 minutes!](https://www.youtube.com/watch?v=eiut3FIY1Cg)
