# pg_dumpall: Backing Up Entire PostgreSQL Clusters

`pg_dumpall` is a utility for backing up all databases in a PostgreSQL cluster, including cluster-wide data such as roles and tablespaces. It creates a plain text SQL script file that contains the commands to recreate the cluster's databases and their contents, as well as the global objects. This utility is useful for comprehensive backups where both database data and cluster-wide settings need to be preserved. Unlike `pg_dump`, which targets individual databases, `pg_dumpall` ensures that the entire PostgreSQL cluster can be restored from the backup, making it essential for complete disaster recovery scenarios.

Learn more from the following resources:

- [@official@pg_dumpall](https://www.postgresql.org/docs/current/app-pg-dumpall.html)
- [@article@pg_dump & pg_dumpall](https://www.postgresqltutorial.com/postgresql-administration/postgresql-backup-database/)