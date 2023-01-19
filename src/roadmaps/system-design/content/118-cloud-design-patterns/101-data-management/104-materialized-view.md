# Materialized View

A Materialized View in system design is a pre-computed and stored version of a query result, which is used to improve the performance of frequently executed queries. It can be used to improve the performance of read-heavy workloads, by providing a pre-computed version of the data that can be quickly accessed. Materialized views can be used in scenarios like complex queries, large datasets, and real-time analytics. A materialized view can be created by executing a query and storing the result in a table. The data in the materialized view is typically updated periodically, to ensure that it stays up-to-date with the underlying data.s

Learn more from the following links:

- [Materialized View pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view)
- [Overview of Materialized View Pattern](https://medium.com/design-microservices-architecture-with-patterns/materialized-view-pattern-f29ea249f8f8)