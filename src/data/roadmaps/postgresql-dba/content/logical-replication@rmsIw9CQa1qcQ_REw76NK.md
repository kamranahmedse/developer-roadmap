# Logical Replication

Logical replication in PostgreSQL allows the selective replication of data between databases, providing flexibility in synchronizing data across different systems. Unlike physical replication, which copies entire databases or clusters, logical replication operates at a finer granularity, allowing the replication of individual tables or specific subsets of data. This is achieved through the use of replication slots and publications/subscriptions. A publication defines a set of changes (INSERT, UPDATE, DELETE) to be replicated, and a subscription subscribes to these changes from a publisher database to a subscriber database. Logical replication supports diverse use cases such as real-time data warehousing, database migration, and multi-master replication, where different nodes can handle both reads and writes. Configuration involves creating publications on the source database and corresponding subscriptions on the target database, ensuring continuous, asynchronous data flow with minimal impact on performance.

Learn more from the following resources:

- [@official@Logical Replication](https://www.postgresql.org/docs/current/logical-replication.html)
- [@article@Logical Replication in PostgreSQL Explained](https://www.enterprisedb.com/postgres-tutorials/logical-replication-postgresql-explained)
- [@article@How to start Logical Replication for PostgreSQL](https://www.percona.com/blog/how-to-start-logical-replication-in-postgresql-for-specific-tables-based-on-a-pg_dump/)