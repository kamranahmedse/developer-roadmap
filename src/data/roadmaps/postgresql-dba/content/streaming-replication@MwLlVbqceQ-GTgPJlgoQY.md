# Streaming Replication in PostgreSQL

Streaming Replication is a powerful feature in PostgreSQL that allows efficient real-time replication of data across multiple servers. It is a type of asynchronous replication, meaning that the replication process occurs continuously in the background without waiting for transactions to be committed. The primary purpose of streaming replication is to ensure high availability and fault tolerance, as well as to facilitate load balancing for read-heavy workloads. In the context of PostgreSQL, streaming replication involves a *primary* server and one or more *standby* servers. The primary server processes write operations and then streams the changes (or write-ahead logs, also known as WAL) to the standby servers, which apply the changes to their local copies of the database. The replication is unidirectional – data flows only from the primary server to the standby servers.

Learn more from the following resources:

- [@article@Streaming Replication](https://wiki.postgresql.org/wiki/Streaming_Replication)
- [@video@Postgres Streaming Replication on Centos](https://www.youtube.com/watch?v=nnnAmq34STc)