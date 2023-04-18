# pg_restore

`pg_restore` is a powerful recovery tool in PostgreSQL, specifically designed to restore data and objects from a database backup created by the `pg_dump` utility. This command only works with backups in the `custom`, `directory`, and `tar` formats. It cannot restore backups in plain-text format, which are typically created using the `-Fp` option with `pg_dump`.

`pg_restore` can handle numerous scenarios, such as:

- Restoring a full database backup
- Selectively recovering specific database objects (tables, indexes, functions, etc.)
- Remapping database object names or owners
- Restoring to a different database server

## Using pg_restore

The basic usage of `pg_restore` is as follows:

```bash
pg_restore [options] [backup_file]
```

Here's an example of restoring a full database backup:

```sh
pg_restore -U username -W -h host -p port -Ft -C -d dbname backup_file.tar
```

In this example:

- `-U` specifies the user to connect as.
- `-W` prompts for the password.
- `-h` and `-p` specify the host and port, respectively.
- `-Ft` indicates the file format (`t` for tar).
- `-C` creates a new database before performing the restore.
- `-d` specifies the target database.

## Selective Restore

`pg_restore` allows you to selectively restore specific database objects. You need to use the `-L` option followed by the list of desired objects.

To generate a list of objects in a backup file, use the `-l` option:

```sh
pg_restore -l backup_file.tar > object_list.txt
```

Edit the `object_list.txt` file to keep only the objects you'd like to restore, and then use the following command:

```sh
pg_restore -U username -W -h host -p port -Ft -d dbname -L object_list.txt backup_file.tar
```

## Remapping Object Names and Owners

`pg_restore` can also remap object names and owners using the `--tablespace-mapping`, `--role-mapping`, and other options. For more information, consult the [official PostgreSQL documentation](https://www.postgresql.org/docs/current/app-pgrestore.html).

## Summary

`pg_restore` is an essential tool for recovering data from PostgreSQL backups created by `pg_dump`. It offers flexible options for restoring full backups, selecting objects to recover, and remapping object names and owners.