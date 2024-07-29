# Workload Dependant Tuning

Online Transaction Processing (OLTP) in PostgreSQL refers to a class of systems designed to manage transaction-oriented applications, typically for data entry and retrieval transactions in database systems. OLTP systems are characterized by a large number of short online transactions (INSERT, UPDATE, DELETE), where the emphasis is on speed, efficiency, and maintaining data integrity in multi-access environments. PostgreSQL supports OLTP workloads through features like ACID compliance (Atomicity, Consistency, Isolation, Durability), MVCC (Multi-Version Concurrency Control) for high concurrency, efficient indexing, and robust transaction management. These features ensure reliable, fast, and consistent processing of high-volume, high-frequency transactions critical to OLTP applications.

Learn more from the following resources:

- [@video@OLTP vs OLAP](https://www.youtube.com/watch?v=iw-5kFzIdgY)
- [@article@What is OLTP?](https://www.oracle.com/uk/database/what-is-oltp/)