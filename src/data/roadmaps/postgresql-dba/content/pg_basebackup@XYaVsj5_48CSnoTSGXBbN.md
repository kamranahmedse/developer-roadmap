# Backup Recovery Tools: pg_basebackup

`pg_basebackup` is a utility for creating a physical backup of a PostgreSQL database cluster. It generates a consistent backup of the entire database cluster by copying data files while ensuring write operations do not interfere. Typically used for setting up streaming replication or disaster recovery, `pg_basebackup` can be run in parallel mode to speed up the process and can output backups in tar format or as a plain directory. It ensures minimal disruption to database operations during the backup process.

Learn more from the following resources:

- [@official@pg_basebackup](https://www.postgresql.org/docs/current/app-pgbasebackup.html)
- [@article@Understanding the new pg_basebackup options](https://www.postgresql.fastware.com/blog/understanding-the-new-pg_basebackup-options)