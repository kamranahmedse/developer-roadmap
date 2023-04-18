# barman

## Barman - Backup and Recovery Manager for PostgreSQL

_Barman_ (Backup and Recovery Manager) is an open-source administration tool for disaster recovery of PostgreSQL servers. It allows you to perform remote backups of multiple PostgreSQL instances and automate the process. By using Barman, DBAs can manage the backup and recovery of their PostgreSQL databases more effectively and efficiently.

### Features

- **Remote Backup**: Barman can perform remote backups of multiple PostgreSQL servers, reducing the risk of data loss and processing overhead on the production servers.

- **Point-in-Time Recovery**: Barman enables Point-in-Time Recovery (PITR), allowing you to recover data up to a specific transaction or time.

- **Compression and Parallelism**: Barman supports configurable compression and parallelism options for backup and recovery operations.

- **Backup Catalog**: Barman keeps track of all the backups, including metadata, allowing you to easily manage and browse your backup catalog.

- **Incremental Backup**: Barman supports incremental backup, reducing the storage requirements and speeding up the backup process.

- **Retention Policy**: Barman allows you to define retention policies to keep backups within a certain timeframe or number of backups, helping to manage storage space and optimize performance.

- **Backup Verification**: Barman verifies the integrity of backups, automatically checking for data corruption, ensuring data consistency, and providing peace of mind.

- **Granular Monitoring and Reporting**: Barman includes detailed monitoring features and reports to help you stay informed and proactive about the health of your backups.

### Installation and Configuration

You can install Barman using various package managers, such as apt or yum, or from source. Follow the instructions provided in the [official Barman documentation](https://docs.pgbarman.org/#installation) for detailed installation steps.

After installation, you need to configure Barman to work with your PostgreSQL servers. The main configuration file is `/etc/barman.conf`, where you can define global settings and per-server configuration for each PostgreSQL instance. The [official Barman documentation](https://docs.pgbarman.org/#configuration) provides a comprehensive guide for configuring Barman.

### Usage

Barman provides various command-line options to manage your backups and recoveries. Here are some examples of common tasks:

- **Taking a backup**: Use `barman backup SERVER_NAME` to create a new full or incremental backup for a specific PostgreSQL instance.

- **Listing backups**: Use `barman list-backup SERVER_NAME` to list all the available backups for a specific PostgreSQL instance.

- **Recovering a backup**: Use `barman recover --target-time "YYYY-MM-DD HH:MI:SS" SERVER_NAME BACKUP_ID DESTINATION_DIRECTORY` to recover a backup to a specific destination directory up until a certain point in time.

For more examples and a complete list of command-line options, refer to the [official Barman documentation](https://docs.pgbarman.org/#using-barman).

In conclusion, Barman is an essential tool for PostgreSQL DBAs to implement an effective backup and recovery strategy. By automating and optimizing backup processes and providing comprehensive monitoring and reporting features, Barman helps ensure the reliability and stability of your PostgreSQL databases.