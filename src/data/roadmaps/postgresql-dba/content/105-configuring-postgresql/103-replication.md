# Replication

## Replication in PostgreSQL

Replication in PostgreSQL is a technique used for creating and maintaining one or more copies of the database, called replicas, across different servers so as to assure high-availability and fault-tolerance. PostgreSQL supports both physical and logical replication, which differ in terms of what data gets replicated and how it is used in the target databases. Let's dive deeper into each type.

### Physical Replication

Physical replication involves copying the exact data files and file system layout of a primary database to one or more secondary databases called standbys. With this method, all changes to the primary database are transferred to the standby in the form of write-ahead log (WAL) records. This ensures that the primary and standby databases are always identical.

Physical replication can be either synchronous or asynchronous:

- **Synchronous Replication**: With synchronous replication, the primary database waits for changes to be written to the standby before considering a transaction complete. This guarantees data consistency between primary and standby databases but can have an impact on performance.
- **Asynchronous Replication**: In asynchronous replication, the primary database does not wait for changes to be written to the standby before considering a transaction complete. This provides better performance but risks data loss due to the possibility of the primary node failing before changes are written to the standby.

To set up physical replication, you need to configure both primary (`postgresql.conf` and `pg_hba.conf`) and standby (`recovery.conf` and `postgresql.conf`) nodes accordingly.

### Logical Replication

Logical replication is a more flexible way of replicating data in PostgreSQL where you can have only specific tables or databases replicated, and even apply database-level transformations during replication. With logical replication, the primary database sends changes in the form of logical events, not WAL records. Logical replication is asynchronous and uses logical decoding and replication slots to ensure data consistency.

Since logical replication is table-level, you can have writeable replicas, which may serve specific purposes such as analytics or reporting. Additionally, logical replication supports cross-version replication, making major version upgrades simpler.

To set up logical replication, create a Publication on the primary node, and a Subscription on the replica for each table you want to replicate.

### Choosing Between Physical and Logical Replication

The choice between physical and logical replication depends on the specific requirements of your application. If you need a complete copy of your database with the sole purpose of providing a high-availability failover, physical replication is the best choice. On the other hand, if you need only a subset of your data, require writeable replicas, or need to support cross-version replication, then logical replication is the way to go.

In summary, replication in PostgreSQL is a powerful feature that helps assure high-availability and fault-tolerance. Understanding the differences between physical and logical replication will help you choose the best solution to meet your requirements.