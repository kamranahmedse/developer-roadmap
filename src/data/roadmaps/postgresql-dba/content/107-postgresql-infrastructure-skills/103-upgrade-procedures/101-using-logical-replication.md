# 4.2 Using Logical Replication

In this section, we'll discuss using **Logical Replication** for upgrading your PostgreSQL database. Logical replication is an asynchronous feature that allows data modification to be transferred from a source (publisher) to a target system (subscriber) across different PostgreSQL database versions. It provides more granular control over the data copied and is useful during an upgrade.

###2.1 Advantages of Logical Replication

- It allows you to replicate only specific tables, rather than the entire database.
- You can create replicas with different database schemas by using a transformation layer between publisher and subscriber.
- It allows you to perform a live upgrade, avoiding the downtime of your database.

###2.2 Setting up Logical Replication

Follow these steps to set up logical replication during an upgrade:

- Install and configure the newer version of the PostgreSQL database on your target system.

- Set up your source (publisher) and target (subscriber) systems. You'll need to modify the `postgresql.conf` file on both systems to enable logical replication by adding or updating these parameters:

```
wal_level = logical
max_replication_slots = <desired_number_of_slots>
max_wal_senders = <desired number_of_senders>
```

- You'll also need to configure the `pg_hba.conf` file on the publisher system to allow connections from the subscriber. Add an entry like the following:

```bash
host <replication_database> <replication_user> <subscriber_IP>/32 md5
```

- Restart both source and target PostgreSQL services to apply the configuration changes.

- Create a publication on the source system using the following SQL command:

```sql
CREATE PUBLICATION my_publication FOR TABLE <table_name1>, <table_name2>, ...;
```

- On the target system, create a subscription to the publication:

```sql
CREATE SUBSCRIPTION my_subscription
    CONNECTION 'host=<publisher_IP> port=<publisher_port> dbname=<database_name> user=<replication_user> password=<password>'
    PUBLICATION my_publication;
```

###2.3 Monitoring and Managing Logical Replication

You can monitor the replication status using the following views:

- `pg_stat_replication` on the publisher system.
- `pg_subscription`, `pg_publication` and `pg_replication_origin_status` on the subscriber system.

Here are a few management commands for logical replication:

- To refresh the already copied data and schema from the publisher to the subscriber:

```sql
ALTER SUBSCRIPTION my_subscription REFRESH PUBLICATION;
```

- To remove a subscription or a publication:

```sql
DROP SUBSCRIPTION my_subscription;
DROP PUBLICATION my_publication;
```

###2.4 Finalizing the upgrade

Once the replication is complete and you're satisfied with the upgrade, you can switch the application to the target system (the newer PostgreSQL version). When you're ready, you can stop the publisher system and remove it.

In conclusion, logical replication is a powerful feature that allows for more flexible upgrades of your PostgreSQL database. By carefully following these steps, you can minimize downtime and ensure a smooth transition between database versions.