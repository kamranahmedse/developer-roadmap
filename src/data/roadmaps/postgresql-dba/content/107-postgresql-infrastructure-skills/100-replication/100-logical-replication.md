# Logical Replication

## Logical Replication

Logical replication is a method of replicating data and database objects (such as tables, indexes, and sequences) from one PostgreSQL database to another. This replication method is based on the logical decoding of the database's write-ahead log (WAL). Logical replication provides more flexibility than physical replication and is suitable for replicating a specific set of tables or a subset of the data in the source database.

### Advantages

* **Selective replication**: Unlike physical replication, logical replication allows you to choose specific tables that will be replicated to the subscriber. This can save bandwidth and resources, as you don't need to replicate the entire database.
* **Different PostgreSQL versions**: With logical replication, you can replicate data between databases running different PostgreSQL versions, provided that the publisher is running a version equal to or older than the subscriber.
* **Schema changes**: Logical replication supports applying schema changes on the subscriber without breaking replication. However, some schema changes may still require conflicts to be resolved manually.

### Configuration

To set up logical replication, you need to perform the following steps:

1. **Enable logical replication**: In the `postgresql.conf` file, set the `wal_level` to `logical`:

   ```sh
   wal_level = logical
   ```

   Also, increase `max_replication_slots` and `max_wal_senders` according to the number of subscribers you want to support.

2. **Create the replication role**: Create a new user with `REPLICATION` and `LOGIN` privileges. This user will be used to authenticate the replication process on the publisher.

   ```sql
   CREATE ROLE replication_user WITH REPLICATION LOGIN PASSWORD 'your-password';
   ```

3. **Configure authentication**: Add a new entry in the `pg_hba.conf` file for the replication user. This entry should be added on both the publisher and subscriber.

   ```sh
   host replication replication_user publisher/subscriber-ip/32 md5
   ```

4. **Add the publications**: On the publisher database, create a publication for the tables you want to replicate.

   ```sql
   CREATE PUBLICATION my_publication FOR TABLE table1, table2;
   ```

5. **Add the subscriptions**: On the subscriber database, create a subscription to consume data from the publications.

   ```sql
   CREATE SUBSCRIPTION my_subscription CONNECTION 'host=publisher-host user=replication_user password=your-password dbname=source-dbname' PUBLICATION my_publication;
   ```

After these steps, logical replication should be functional, and any changes made to the publisher's tables will be replicated to the subscriber's tables.

### Monitoring and Troubleshooting

To monitor the performance and status of logical replication, you can query the `pg_stat_replication` and `pg_stat_subscription` views on the publisher and subscriber databases, respectively. If you encounter any issues, check the PostgreSQL logs for more detailed information.

Keep in mind that logical replication may have some limitations, such as not replicating DDL changes, large objects, or truncation. Always test your configuration thoroughly and plan for necessary manual interventions when needed.