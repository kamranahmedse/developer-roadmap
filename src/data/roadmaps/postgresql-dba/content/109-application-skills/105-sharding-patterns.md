# Sharding Patterns

Sharding is a technique that splits a large dataset across multiple database instances or servers, called shards. Each shard is an independent and self-contained unit that holds a portion of the overall data, and shards can be distributed across different geographical locations or infrastructures.

In PostgreSQL environment, sharding can be achieved in different ways:

- **Sharding at the application level:** The application defines the logic to decide which shard will store a specific data record. The application communicates directly with each shard for querying or modifying the data.

- **Sharding using foreign data wrappers:** PostgreSQL provides a feature called foreign data wrappers (FDW) that allows a PostgreSQL server to access data stored in remote servers, treating them as local tables. By using this technique, the data can be sharded across multiple remote servers, and the local PostgreSQL instance acts as a coordinator for accessing these shards.

- **Sharding using 3rd-party tools:** Several 3rd-party tools, such as Pgpool-II, Citus, and PLProxy, can be used for sharding purpose. These tools handle connection pooling, load balancing, and data distribution across multiple PostgreSQL instances. The choice of tools depends on the requirements, complexity, and the desired level of control over the sharding logic.