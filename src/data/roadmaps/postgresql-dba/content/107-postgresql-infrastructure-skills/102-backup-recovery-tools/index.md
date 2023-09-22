# Backup Recovery Tools in PostgreSQL

Backup recovery tools are essential to ensure data safety and minimize data loss in the event of hardware and/or software failure or any other disaster. In this topic, we will discuss the most commonly used backup recovery tools in PostgreSQL.

## pg_dump and pg_restore

`pg_dump` is a utility provided by PostgreSQL to create a backup of a single database. It generates a SQL file or a custom-format archive that contains the data and schema of the specified database. The command syntax is as follows:

```bash
pg_dump --host <hostname> --port <port> --username <username> --password <password> --file <output-file> <database>
```

After creating a backup with `pg_dump`, you can use the `pg_restore` tool to restore the database from the generated SQL file or custom-format archive. The command syntax is as follows:

```bash
pg_restore --host <hostname> --port <port> --username <username> --password <password> --dbname <database> <input-file>
```

## pg_basebackup

`pg_basebackup` is a utility that creates a binary copy (base backup) of an entire PostgreSQL cluster, including all data files, tablespaces, and configuration files. The base backup can be used as a starting point for setting up a new replica or to restore the cluster during a disaster. The command syntax is as follows:

```bash
pg_basebackup --host <hostname> --port <port> --username <username> --password <password> --directory <output-directory> --progress --verbose
```

The `--progress` flag is optional and displays a progress report, while the `--verbose` flag increases information messages.

## Continuous Archiving and Point-in-Time Recovery (PITR)

Apart from backing up the entire database, PostgreSQL also allows continuous archiving of the write-ahead log (WAL) files. This technique, combined with the base backup, helps in recovering data up to a specific point in time.

To enable continuous archiving, you need to modify the `postgresql.conf` file and set the `wal_level` to `replica`, `archive_mode` to `on`, and configure `archive_command`. For example:

```
wal_level = replica
archive_mode = on
archive_command = 'cp %p /path/to/archive/%f'
```

The `archive_command` is a shell command used for archiving the WAL files, and `%p` and `%f` are placeholders for the file path and file name, respectively.

Point-in-Time Recovery (PITR) can be performed by configuring the `recovery.conf` file in the data directory of the PostgreSQL instance. It includes setting the `restore_command`, which is a shell command for restoring WAL files. An example configuration:

```
restore_command = 'cp /path/to/archive/%f %p'
recovery_target_time = '2021-12-31 23:59:59'
```

In the configuration above, the `recovery_target_time` specifies the exact time up to which the database should be recovered.

## Conclusion

In this topic, we have discussed the most commonly used backup recovery tools in PostgreSQL such as `pg_dump`, `pg_restore`, `pg_basebackup`, and continuous archiving with PITR. These tools help to ensure data safety in PostgreSQL by providing various backup and recovery options. It is crucial to have a proper backup strategy in place to handle unforeseen circumstances and ensure minimal data loss.