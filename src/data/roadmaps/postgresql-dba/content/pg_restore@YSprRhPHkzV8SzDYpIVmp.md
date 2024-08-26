# pg_restore

`pg_restore` is a utility for restoring PostgreSQL database backups created by `pg_dump` in non-plain-text formats (custom, directory, or tar). It allows for selective restoration of database objects such as tables, schemas, or indexes, providing flexibility to restore specific parts of the database. `pg_restore` can also be used to reorder data load operations, create indexes and constraints after data load, and parallelize the restore process to speed up recovery. This utility ensures efficient and customizable restoration from logical backups.

- [@official@pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html)
- [@article@A guide to pg_restore](https://www.timescale.com/learn/a-guide-to-pg_restore-and-pg_restore-example)