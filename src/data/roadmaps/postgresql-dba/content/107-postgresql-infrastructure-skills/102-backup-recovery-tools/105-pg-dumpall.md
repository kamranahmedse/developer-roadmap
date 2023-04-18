# pg_dumpall

### pg_dumpall

`pg_dumpall` is a utility tool in PostgreSQL that allows you to create a backup of all the databases in a PostgreSQL server. It is especially useful for DBAs who need a complete backup of the entire PostgreSQL system, including global objects such as roles, tablespaces, and databases. 

#### Usage

To use `pg_dumpall`, simply execute the command in the following format:

```
pg_dumpall [OPTIONS] > outputfile
```

The PostgreSQL server's entire contents will be written to the specified `outputfile`. Some commonly used options with `pg_dumpall` include:

- `-h`: Specifies the server host. If not provided, it will default to the environment variable `PGHOST`, or "local socket" if none is set.
- `-p`: Specifies the server port number. If not provided, it will default to the environment variable `PGPORT`, or 5432 if none is set.
- `-U`: Sets the PostgreSQL username. If not provided, it will default to the environment variable `PGUSER`, or the username of the system it is being executed on, if none is set.
- `-W`: Prompts for a password. By default, a password is not required.
- `-f`: Specifies the output file. If not provided, it will default to the standard output.
- `--globals-only`: Dumps only global objects (roles, tablespaces).
- `--roles-only`: Dumps only role information.
- `--tablespaces-only`: Dumps only tablespace information.

#### Restoring a Backup

Restoring a backup created using `pg_dumpall` is easy. Simply execute the below command:

```
psql -f outputfile postgres
```

This command reads the SQL commands in the `outputfile` and executes them on the PostgreSQL server. Replace "outputfile" with the file created during the backup process.

#### Notes 

- `pg_dumpall` doesn't support parallel processing, so for large databases, it might take a considerable amount of time to create a backup.
- Consider using the `--clean` option to include drop statements in the SQL script, which is useful when restoring a backup to an existing system, as it will remove existing objects before recreating them.

In conclusion, `pg_dumpall` is a powerful and essential tool for PostgreSQL DBAs that provides an easy, comprehensive solution for creating full backups of the entire PostgreSQL server system.