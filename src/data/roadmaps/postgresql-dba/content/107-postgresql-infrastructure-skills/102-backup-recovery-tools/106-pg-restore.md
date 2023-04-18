# pg_restore

### Pg_restore

`Pg_restore` is a powerful and essential utility provided by PostgreSQL for recovering your database from a previously created dump file. It can be used to restore an entire database or individual database objects, such as tables, indexes, and sequences.

#### Key Features

- Restores data from custom, tar, and directory format archival outputs.
- Allows selective restoration of specific database objects.
- Supports parallel restoration of large databases.
- Displays a preview of the restoration process with the `-L` option.

#### Usage

The basic syntax to use `pg_restore` is given below:

```
pg_restore [options] [file-name]
```

Here, `options` represent different configuration flags, and `file-name` is the name of the backup file created using `pg_dump`.

##### Example

To restore a database named `mydatabase` from a tar file named `mydatabase.tar`, you can use the following command:

```
pg_restore -U postgres -C -d mydatabase -v -Ft mydatabase.tar
```

In this example:

- `-U` specifies the username for the PostgreSQL server (in this case, `postgres`).
- `-C` creates the database before restoring.
- `-d` selects the target database.
- `-v` displays verbose output as the restoration progresses.
- `-Ft` specifies that the backup format is tar.

#### Important Notes

- Note that `pg_dump` and `pg_restore` must be used together as they are designed to complement each other for creating and restoring backup files. Using other tools or processes for restoration may lead to unreliable results.

- Please be aware of PostgreSQL version compatibility between the server where the dump was created and the target server being restored.

- It is recommended to practice using `pg_restore` in a test environment before applying them to your production systems.

In conclusion, `pg_restore` is a powerful yet easy-to-use PostgreSQL utility designed to simplify the process of restoring your databases. Getting familiar with `pg_restore` and its options will help you be more confident in managing and maintaining the integrity of your data.