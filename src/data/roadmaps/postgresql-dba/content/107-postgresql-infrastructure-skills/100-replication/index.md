# Replication

## Replication in PostgreSQL

Replication involves creating and maintaining multiple copies of a database to ensure high availability and data redundancy. This plays a crucial role in the recovery process during system crashes, hardware failures, or disasters while keeping business operations running smoothly. PostgreSQL offers various techniques and tools for replication, which can be grouped into two categories: physical and logical replication.

### Physical Replication

Physical replication refers to block-level copying of data from the primary server to one or more standby servers. The primary and standby servers have an identical copy of the database cluster. This is also known as binary replication.

1. **Streaming Replication:** Streaming replication enables a standby server to stay up-to-date with the primary server by streaming Write-Ahead Logging (WAL) records. Standby servers pull the WAL records from the primary server, enabling real-time replication.

Pros:
  - It provides almost real-time replication with low-latency.
  - It supports synchronous and asynchronous replication modes.
  - Standby servers can be used for read-only queries, thus reducing the load on the primary server.
  
Cons:
  - It replicates the entire database cluster, providing no column or row-level filtering.
  - It does not facilitate bidirectional replication, which requires additional tools like Slony or SymmetricDS.

2. **File-based Replication:** This technique involves copying the actual data files to set up replication instead of streaming WAL records. One of the most common methods is using `rsync` with a custom script or scheduled `cron` jobs.

### Logical Replication

Logical replication involves copying only specific data (tables or columns) between databases, allowing more granular control over what to replicate. It is implemented using logical decoding and replication slots.

1. **Publication and Subscription Model:** PostgreSQL 10 introduced the built-in logical replication feature based on the publish-subscribe pattern. One or more tables are marked for replication with a publication, and the target database subscribes to this publication to receive the data changes.

Pros:
  - Offers row and column-level filtering.
  - Supports selective replication of specific tables between databases, reducing replication overhead.
  - No need for external tools or extensions.

Cons:
  - Not all data types and DDL statements are supported in logical replication.
  - Doesn't automatically replicate table schema changes, which requires manual intervention.

### Choosing the right replication technique

The choice between physical and logical replication in your PostgreSQL infrastructure depends on your business requirements:

- For a completely identical database cluster and low-latency replication, go with **physical replication**.
- For granular control over what data to replicate, and if you want to replicate only specific tables or a subset of the data between databases, choose **logical replication**.

Considering both the replication types' pros and cons, you should choose the approach that best fits your PostgreSQL infrastructure and business needs.