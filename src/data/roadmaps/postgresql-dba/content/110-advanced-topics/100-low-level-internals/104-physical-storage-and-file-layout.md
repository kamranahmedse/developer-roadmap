# Physical Storage and File Layout

### Physical Storage and File Layout

PostgreSQL's data storage is managed at two main levels: databases and tables. Databases contain tables, while tables hold the actual data. Understanding the physical storage and file layout will help you optimize storage and improve performance, as well as assist you in any disaster recovery efforts. In this section, we'll discuss how PostgreSQL's data files are laid out on the file system and how the data is organized within those files.

#### File System Layout

Each PostgreSQL cluster has a unique data directory, known as `PGDATA`, which contains multiple subdirectories:

- `base`: Stores the actual data files for all databases in the cluster. Each subdirectory here, identified by an OID (Object Identifier), corresponds to a specific database.
- `global`: Contains cluster-wide information, such as the system catalog tables containing global metadata.
- `pg_xlog` or `pg_wal` (depending on the PostgreSQL version): Stores WAL (Write-Ahead Logging) files. These files hold the transaction logs before they are replayed on the data files.
- `pg_clog` or `pg_xact`: Contains transaction status records (commit or abort).

#### Database Directories

Inside the `base` directory, each database has its own subdirectory named after its OID. For example, if a database has the OID `12345`, its data files will be located in the directory `base/12345`.

#### Table Files

Each table in PostgreSQL has two main files associated with it:

1. Main data file: Stores the actual data of the table in rows and pages. The file is named after the table's OID, for example, `12345`.
2. Free Space Map (FSM) file: Tracks the free space available within the table's data file, allowing the server to optimize and reuse space. The file is named with the OID followed by `_fsm`, for example, `12345_fsm`.

Additionally, tables with indexes have the corresponding index files stored under the same directory. These files have the same naming conventions as the table files, but with the OID of the index.

#### Data Organization

Data in PostgreSQL's table files are structured in pages. Each table has a specific page size, typically 8KB, which can be altered during compile-time. Pages are the smallest unit of storage, and each page contains one or more rows (tuples). Rows cannot span multiple pages, so the maximum size of a row is determined by the page size.

Each row of a table contains a tuple header and the actual data. The tuple header contains meta-information about the row (e.g., visibility, row length) and precedes the row data itself.

### Conclusion

Understanding PostgreSQL's physical storage and file layout is an essential aspect of being a PostgreSQL DBA. It allows you to better diagnose and manage your database's storage, troubleshoot performance issues, and devise disaster recovery strategies. By mastering these concepts, you're well on your way to becoming a proficient PostgreSQL administrator.