# Streaming Replication

### Streaming Replication

Streaming Replication allows a primary PostgreSQL database server to transmit real-time changes (also known as WAL - Write Ahead Log) to one or more secondary (standby) servers. This process increases availability and provides redundancy for the database system. 

#### Advantages of Streaming Replication

- **High availability**: Standby servers can immediately take over if the primary server fails, minimizing downtime.
- **Load balancing**: Read-only queries can be distributed among standby servers, thus improving query performance.
- **Data protection**: Data is automatically backed up on standby servers, reducing the risk of data loss.

#### Setting up Streaming Replication

1. **Configure the primary server**: Enable replication by modifying some configuration parameters in the `postgresql.conf` and `pg_hba.conf` files.

In `postgresql.conf`, set the following parameters:

```
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 32
```

In `pg_hba.conf`, add the following line to allow connections from standby server's IP address:

```
host replication replicator [standby_ip] md5
```

2. **Create replication user**: On the primary server, create a new role with the `REPLICATION` privilege:

```sql
CREATE ROLE replicator WITH REPLICATION PASSWORD 'your-password' LOGIN;
```

3. **Transfer initial data to the standby server**: On the primary server, use the `pg_basebackup` command to transfer the initial data to the standby server:

```bash
pg_basebackup -h [standby_host] -D [destination_directory] -U replicator -P --wal-method=stream
```

4. **Configure the standby server**: Create a `recovery.conf` file in the PostgreSQL data directory on the standby server with the following content:

```
standby_mode = 'on'
primary_conninfo = 'host=[primary_host] port=5432 user=replicator password=your-password'
trigger_file = '/tmp/trigger'
```

5. **Start PostgreSQL on the standby server**: Start PostgreSQL on the standby server to begin streaming replication.

#### Monitoring Streaming Replication

You can monitor the streaming replication status by running the following query on the primary server:

```sql
SELECT * FROM pg_stat_replication;
```

The query returns information about the connected standby servers, such as application_name, client_addr, and state.

#### Performing Failover

In case of primary server failure, you can promote a standby server to become the new primary server by creating the trigger file specified in the `recovery.conf` file:

```bash
touch /tmp/trigger
```

Once the failover is complete, you will need to reconfigure the remaining standby servers to connect to the new primary server.

That's a brief summary of streaming replication in PostgreSQL. You can dive deeper into this topic by exploring the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION).