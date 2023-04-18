# pg_probackup

## pg_probackup

`pg_probackup` is an advanced backup and recovery tool designed to work with PostgreSQL databases. This open-source utility provides efficient, reliable, and flexible backup solutions for PostgreSQL administrators, allowing them to create full, incremental, and differential backups, perform point-in-time recovery, and manage multiple backup instances.

### Features

Some of the key features of `pg_probackup` include:

1. **Backup Types**: Supports full, page-level incremental, and ptrack (block-level incremental) backups.
2. **Backup Validation**: Ensures the consistency and correctness of the backups with built-in validation mechanisms.
3. **Backup Compression**: Allows you to save storage space by compressing backup files.
4. **Multi-threading**: Speeds up the backup and recovery process by taking advantage of multiple CPU cores.
5. **Backup Retention**: Automatically deletes old backup files based on a retention policy.
6. **Backup Management**: Manages multiple backup instances and performs various backup maintenance tasks.
7. **Point-in-Time Recovery**: Allows you to recover the database to a specific point in time, based on transaction log (WAL) files.
8. **Standby Support**: Allows you to perform backups from a standby database server.
9. **Tablespaces**: Supports backing up and restoring PostgreSQL tablespaces.
10. **Remote Mode**: Allows you to perform backup and recovery tasks on a remote PostgreSQL server.

### Installation

To install `pg_probackup`, follow the steps outlined in the official documentation: [https://github.com/postgrespro/pg_probackup#installation](https://github.com/postgrespro/pg_probackup#installation)

### Basic Usage

Here's a brief overview of the basic commands used with `pg_probackup`:

- To create a backup:

```
pg_probackup backup -B /path/to/backup/catalog -D /path/to/datadir --instance your_instance_name --backup-mode=full --remote-proto=protocol --remote-host=host_address --remote-user=user_name
```

- To restore a backup:

```
pg_probackup restore -B /path/to/backup/catalog -D /path/to/new/datadir --instance your_instance_name --recovery-target-time="YYYY-MM-DD HH:MI:SS"
```

- To validate a backup:

```
pg_probackup validate -B /path/to/backup/catalog --instance your_instance_name
```

- To manage backup retention:

```
pg_probackup delete -B /path/to/backup/catalog --instance your_instance_name --delete-expired --retention-redundancy=number_of_backups --retention-window=days
```

For more details and advanced usage, consult the official documentation: [https://postgrespro.com/docs/postgresql-14/pg-probackup](https://postgrespro.com/docs/postgresql-14/pg-probackup)