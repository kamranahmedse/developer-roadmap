# pg_dump: A PostgreSQL Backup Tool

`pg_dump` is a utility for backing up a PostgreSQL database by exporting its data and schema. Unlike `pg_basebackup`, which takes a physical backup of the entire cluster, `pg_dump` produces a logical backup of a single database. It can output data in various formats, including plain SQL, custom, directory, and tar, allowing for flexible restore options. `pg_dump` can be used to selectively backup specific tables, schemas, or data, making it suitable for tasks like migrating databases or creating development copies. The utility ensures the backup is consistent by using the database's built-in mechanisms to capture a snapshot of the data at the time of the dump.

Learn more from the following resources:

- [@official@pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [@article@pg_dump - VMWare](https://docs.vmware.com/en/VMware-Greenplum/5/greenplum-database/utility_guide-client_utilities-pg_dump.html)