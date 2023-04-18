# Using Logical Replication

## Using Logical Replication for PostgreSQL Upgrade Procedure

Logical replication is a compelling method to upgrade PostgreSQL instances with minimal downtime. It allows the transfer of data changes between two different database versions, enabling smoother upgrades without sacrificing database availability.

### Benefits of using Logical Replication

- **Minimal downtime**: Logical replication minimizes downtime during the upgrade process, ensuring your applications experience less disruption.
- **Version compatibility**: You can replicate between different PostgreSQL versions, making it ideal for upgrading to a new release.
- **Selective data replication**: You have the flexibility to replicate specific tables, schemas, or databases instead of the entire cluster.

### Steps for upgrading with Logical Replication

1. **Prepare your new PostgreSQL instance**: Set up a new PostgreSQL instance that will serve as the upgraded version. This new instance can run on a separate server, virtual machine, or container.

2. **Enable logical replication**: Enable logical replication on both the old and new PostgreSQL instances by setting up the required configuration options in `postgresql.conf`:
    ```
    wal_level = logical
    max_replication_slots = 4
    max_wal_senders = 4
    ```
    Don't forget to set appropriate authentication rules for replication connections in `pg_hba.conf` as well.

3. **Create a publication on the old instance**: A publication defines the set of tables that need to be replicated. You can create a publication for specific tables, schema, or the entire database depending on your requirements. Example:
    ```
    CREATE PUBLICATION my_publication FOR ALL TABLES;
    ```

4. **Create a subscription on the new instance**: A subscription receives data changes from a publication. On the new PostgreSQL instance, create a subscription to the publication from the old instance. Example:
    ```
    CREATE SUBSCRIPTION my_subscription
    CONNECTION 'host=old_instance_host port=5432 user=replication_user password=replication_password dbname=my_database'
    PUBLICATION my_publication;
    ```

5. **Monitor the replication progress**: Check the replication status to ensure all changes are being synchronized between the old and new instances using the following query:
    ```
    SELECT * FROM pg_stat_subscription;
    ```

6. **Switchover to the new instance**: Once the replication catches up and the new instance is in sync, perform a brief switchover by stopping writes to the old instance, ensuring the new instance is fully caught up, and then redirecting clients to the new instance.

7. **Drop the subscription and change publication**: After the upgrade is completed and traffic is going to the new instance, you can remove the subscription on the new instance and change the publication on the old instance to clean up. Example:
    ```
    DROP SUBSCRIPTION my_subscription;
    DROP PUBLICATION my_publication;
    ```

Logical replication is an efficient method to upgrade PostgreSQL instances with minimal downtime and version compatibility. By following the steps outlined above, you can ensure a smooth upgrade experience without disrupting database availability.