# Barman (Backup and Recovery Manager)

Barman, also known as Backup and Recovery Manager, is a popular open-source tool used for managing the backup, recovery and disaster recovery of PostgreSQL databases. It provides a simple command-line interface and lets you automate and centrally manage the process of taking backups of PostgreSQL instances. Barman is written in Python and is supported by EnterpriseDB, a leading PostgreSQL company.

## Features

- **Remote Backup:** Allows performing whole or incremental backups of remote PostgreSQL databases using an SSH connection.
- **Point-in-time Recovery:** Supports recovery to a specific point in time, giving the flexibility to restore data according to the needs.
- **Retention Policies:** Automatically enforces backup retention policies, allowing dataset optimization for backup storage.
- **Data Compression and Streaming:** Offers configurable data compression and streaming of backup files, saving storage space and time.
- **Continuous Archiving:** Allows continuous archiving of Write Ahead Log (WAL) files, essential for failover and recovery scenarios.
- **Data Verification and Validation:** Verifies and validates backups to ensure a safe and consistent recovery process.
- **Monitoring and Reporting:** Provides integrated monitoring and reporting features to have better control and visibility over backup management.

## Installation and Configuration

To install Barman, you can use `pip`, the Python package manager:

```bash
pip install barman
```

After installation, create a dedicated `barman` user and a configuration file:

```
sudo adduser barman
sudo mkdir /etc/barman.d
sudo chown -R barman:barman /etc/barman.d
```

Create a `barman.conf` configuration file in the `/etc/barman.d` directory:

```bash
sudo vi /etc/barman.d/barman.conf
```

Add the following sample configuration to configure Barman for a PostgreSQL server:

```
[barman]
barman_user = barman
configuration_files_directory = /etc/barman.d
barman_home = /var/lib/barman
log_file = /var/log/barman/barman.log

[my_pg_server]
description = "My PostgreSQL Server"
conninfo = host=my_pg_server user=postgres dbname=my_dbname
streaming_conninfo = host=my_pg_server user=streaming_barman dbname=my_dbname
backup_method = postgres
wal_level = replica
streaming_archiver = on
slot_name = barman
```

Replace `my_pg_server`, `my_dbname`, and other necessary details to match your PostgreSQL server.

## Usage

Perform a baseline backup using the following command:

```bash
barman backup my_pg_server
```

To recover your PostgreSQL instance, use the `barman recover` command:

```bash
barman recover --target-time "2021-11-23 12:00:00" my_pg_server latest /path/to/recovery
```

To list all backups, use:

```bash
barman list-backup my_pg_server
```

For more help, consult the Barman documentation or use `barman --help`.

## Conclusion

Barman is a powerful and feature-rich backup recovery tool for PostgreSQL, suitable for various business and production environments. Its capabilities of taking remote backups, enforcing retention policies, performing point-in-time recovery, and offering monitoring features make it an indispensable tool for managing PostgreSQL databases.