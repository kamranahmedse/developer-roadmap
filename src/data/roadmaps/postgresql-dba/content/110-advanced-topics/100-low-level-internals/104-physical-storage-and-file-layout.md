# Physical Storage and File Layout

In this section, we will delve into PostgreSQL's low-level implementation details, specifically its physical storage and file layout. Understanding these aspects will empower you with the knowledge to optimize your database, effectively allocate resources, and pinpoint potential bottlenecks or inefficiencies.

## Storage Model

PostgreSQL organizes information into a hierarchical structure as follows:

- **Clusters**: Represents a complete PostgreSQL instance containing multiple databases managed by a single server process. A single server can manage multiple clusters, typically using different ports.
- **Databases**: An individual database contains a set of schemas and is owned by one or more users.
- **Schemas**: A namespace used to group tables, indexes, and other objects. Each schema is independent and can contain objects with the same names but different purposes.
- **Tables**: Consists of rows and columns that store the actual data.

## Table Storage

Tables are divided into fixed-size **blocks** (by default, 8 KB). Each block contains a set of **rows** (also called tuples), which can store one or more values. The maximum number of columns a table can have is 1664. Each row occupies a variable amount of space depending on the data it stores. To optimize storage, PostgreSQL employs techniques such as packing smaller rows into a single block and using TOAST (The Oversized-Attribute Storage Technique) tables to handle large values.

## File Layout

PostgreSQL stores its data in the `$PGDATA` directory, typically found under `/var/lib/postgresql/` in a Linux environment. Here's an overview of the main subdirectories:

- **base/**: Holds the actual data files, with one subdirectory per database, identified by their OID (Object Identifier).
  - e.g., `base/12345/`: Contains data files for database `12345`.
- **global/**: Contains global objects such as roles and tablespaces that are shared across all databases in a cluster.
- **pg_xlog/** or **pg_wal/** (depending on the PostgreSQL version): Stores Write-Ahead Log (WAL) files used for crash recovery and replication.
- **pg_clog/** or **pg_xact/** (depending on the PostgreSQL version): Contains transaction status information.

## Table Files

Inside a database's directory, you'll find files representing tables, indexes, sequences, and other objects. Naming follows the pattern `OID` with a suffix depending on the type of file:

- **OID**: Main data file for a table or index.
- **OID_fsm**: Free Space Map (FSM) for a table or index, storing info about available space in table/index.
- **OID_vm**: Visibility Map for a table, storing info about which rows are visible to transactions.

## TOAST Tables

For large values that can't fit into a regular table row, PostgreSQL uses TOAST tables. TOAST tables are stored alongside regular tables, but their files have an additional `_toast` in their names, e.g., `OID_toast`.

In conclusion, understanding PostgreSQL's physical storage and file layout is essential for effective database performance tuning, resource allocation, and troubleshooting. With this knowledge, you are now better equipped to handle complex PostgreSQL tasks and optimizations. Happy database managing!