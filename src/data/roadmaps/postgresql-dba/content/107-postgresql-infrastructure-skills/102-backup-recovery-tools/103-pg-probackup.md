# Pg_probackup

`Pg_probackup` is a powerful and feature-rich backup and recovery tool for PostgreSQL databases. It provides a comprehensive solution for managing and restoring backups, ensuring the safety and reliability of your data. With support for both legacy and modern PostgreSQL features, `pg_probackup` is an essential tool for database administrators to maintain and safeguard their databases.

## Features

- **Full, Incremental, and Differential Backups**: Pg_probackup supports various backup types, giving you the flexibility to choose the best backup strategy for your specific needs.
- **Backup Compression and Encryption**: Save storage space and protect sensitive data with built-in support for backup compression and encryption.
- **Automatic Restore Point Creation**: Pg_probackup creates restore points automatically, so you can easily recover your database to any point in time.
- **Backup Catalog and Retention Policies**: Manage your backups efficiently with a backup catalog and set up retention policies to automatically delete old backups.
- **Parallel Backup and Recovery**: Speed up the backup and recovery process by performing operations in parallel.
- **Validation and Verification**: Ensure the accuracy and consistency of your backups and recoveries with built-in validation and verification features.

## Usage

Pg_probackup can be installed by downloading the appropriate package for your operating system or building from the source code available on the [official repository](https://github.com/postgrespro/pg_probackup).

For example, on Debian-based systems, you can install it using `apt`:
```
sudo apt-get update
sudo apt-get install pg-probackup
```

Once installed, you can configure your PostgreSQL instance for backups by setting some configuration parameters in the `postgresql.conf` file, such as `archive_mode`, `wal_level`, and `archive_command`.

You can then start using pg_probackup to create and manage your backups. Here are some basic commands to help you get started:

- **Initialize Backup Catalog**

```bash
pg_probackup init -B /path/to/backup/catalog
```

- **Create Full Backup**

```bash
pg_probackup backup -B /path/to/backup/catalog --instance your_instance_name -b FULL --remote-proto=ssh --remote-host=your_remote_host --remote-port=your_remote_port --remote-path=/path/to/database --remote-user=your_remote_user -U your_pg_user -d your_dbname
```

- **Create Incremental Backup**

```bash
pg_probackup backup -B /path/to/backup/catalog --instance your_instance_name -b PTRACK --remote-proto=ssh --remote-host=your_remote_host --remote-port=your_remote_port --remote-path=/path/to/database --remote-user=your_remote_user -U your_pg_user -d your_dbname
```

- **Restore from Backup**

```bash
pg_probackup restore -B /path/to/backup/catalog --instance your_instance_name -D /path/to/restore/directory
```

For more detailed information and additional commands, you can refer to the [official documentation](https://pg-probackup.readthedocs.io/en/latest/index.html).

With `pg_probackup`, you can ensure your PostgreSQL data is safe and recoverable, giving you peace of mind and making database management a breeze.