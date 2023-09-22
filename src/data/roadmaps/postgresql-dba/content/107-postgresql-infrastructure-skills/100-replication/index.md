# Replication in PostgreSQL

Replication is an essential aspect of PostgreSQL infrastructure skills as it plays a crucial role in ensuring data redundancy and high availability. Replication is the process of copying data changes made on one database (the primary) to another database (the replica). This sync happens in real-time or as close to it as possible. Replication is highly useful in disaster recovery, read-scaling, and backup scenarios.

## Types of Replication

There are two main types of replication in PostgreSQL:

- **Physical Replication**: In physical replication, the changes at the block level (i.e., binary data) of the primary database are copied to the replica. The replica is an identical copy of the primary, including the structure and data.

- **Logical Replication**: In logical replication, a specific set of changes (INSERT, UPDATE, DELETE or TRUNCATE) at the row level of the primary database are replicated to the replica. It provides more flexibility as it allows replicating changes to specific tables, or even selective columns, which may differ in their structure compared to the primary.

## Replication Methods

PostgreSQL offers various replication methods, including:

- **Streaming Replication**: This method uses primary's write-ahead logs (WALs) to keep the replica up-to-date. WALs consist of every change made to the primary's data. The primary sends WALs to the replica, which applies the changes to stay in sync. You can configure streaming replication as synchronous or asynchronous.

- **Logical Decoding**: This method is responsible for generating a sequence of logical changes by decoding the primary's WALs. Logical decoding can be used in logical replication for capturing specific data changes and replicating them to the replica.

- **Trigger-Based Replication**: This method involves using triggers on the primary database to record changes into specific tables. Third-party tools like Slony and Londiste use trigger-based replication.

## Setting up Replication

To set up replication in PostgreSQL, you will need to follow these steps:

- **Primary Server Configuration**: Set the following parameters in the `postgresql.conf` on the primary server.
    ```
    wal_level = 'replica'
    max_wal_senders = 3
    max_replication_slots = 3
    wal_keep_segments = 64
    listen_addresses = '*'
    ```

- **Replica Server Configuration**: Set the following parameters in the `postgresql.conf` on the replica server.
    ```
    hot_standby = on
    ```

- **Authentication**: Add an entry in the `pg_hba.conf` file on the primary server to allow the replica to connect.
    ```
    host replication <replica_user> <replica_ip>/32 md5
    ```

- **Create Replication User**: Create a replication user on the primary server with the REPLICATION attribute.
    ```
    CREATE USER <replica_user> WITH REPLICATION ENCRYPTED PASSWORD '<password>';
    ```

- **Create Base Backup**: Create a base backup of the primary server using `pg_basebackup` tool, specifying the destination directory (`<destination>`) on the replica server.
    ```
    pg_basebackup -h <primary_ip> -D <destination> -U <replica_user> -vP --wal-method=fetch
    ```

- **Configure Recovery**: On the replica server, create a `recovery.conf` file in the data directory to configure it to connect to the primary server for streaming replication.
    ```
    standby_mode = 'on'
    primary_conninfo = 'host=<primary_ip> port=5432 user=<replica_user> password=<password>'
    trigger_file = '/tmp/replica_trigger' # This can be any custom path of your choice
    ```

- **Start Replica**: Start the replica server, and it will begin syncing the data from the primary server.

## Failover and Monitoring

You can monitor the replication status using the `pg_stat_replication` view, which contains information about the replication sessions and progress.

In case of a primary server failure, you can switch to the replica server by creating a trigger file, as specified in the `recovery.conf`. The replica server will promote to a primary server, accepting read and write connections.

Remember to thoroughly understand replication in PostgreSQL, as it is a critical aspect of maintaining a successful database infrastructure.