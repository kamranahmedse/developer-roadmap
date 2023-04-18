# Low Level Internals

## Low-Level Internals

As a PostgreSQL DBA, knowing about the low-level internals is crucial for troubleshooting, optimizing, and understanding the PostgreSQL architecture. In this section, we are going to explore some key low-level concepts and components such as storage layout, database pages, MVCC, and WAL.

### Database Storage Layout

PostgreSQL organizes its files on the disk in a hierarchical structure, with the following levels:

1. Data directory: This is the root directory where all data is stored. It's specified by the `data_directory` configuration option.
2. Tablespaces: PostgreSQL allows you to define custom tablespaces database storage areas.
3. Databases: Each PostgreSQL cluster has multiple databases, and you can have multiple schemas within a database.
4. Files: Each database contains a set of files for tables, indexes, sequences, and other objects.

### Database Pages

Database pages are the smallest unit of storage in PostgreSQL. A page is the fixed-size block of data, usually 8KB. Each table and index is stored as a collection of pages. Here's how PostgreSQL manages database pages:

1. Table and index pages are managed by a parameter called `fillfactor`, which determines the space utilization within the page.
2. The free space map (FSM) keeps track of free space available for each page in a table or index.
3. The visibility map (VM) stores information about which tuples are visible to all active queries, helping in improving query performance.

### Multi-Version Concurrency Control (MVCC)

PostgreSQL uses MVCC to allow multiple transactions to access the database concurrently without affecting each other's operations. MVCC works by:

1. Assigning transaction IDs to each transaction.
2. Storing transaction IDs within each row in the table (xmin and xmax) to track the creation and deletion of the corresponding rows.
3. Keeping track of a snapshot of the database state for each transaction.
4. Ensuring each transaction operates on its own snapshot of the data and concurrent write operations don't overwrite each other's changes.

### Write-Ahead Logging (WAL)

The Write-Ahead Logging (WAL) is an integral part of PostgreSQL's concurrency control and crash recovery mechanisms. It ensures data consistency and durability by writing changes to a log before they are applied to the actual data files. WAL helps in:

1. Maintaining a continuous archive of database changes.
2. Providing a way to recover from a crash or failure by replaying the logged operations.
3. Supporting replication and standby servers.

Understanding these low-level internals provides a solid foundation for effective PostgreSQL administration and performance tuning. As a DBA, you should be able to leverage this knowledge for making informed decisions when working with PostgreSQL databases.