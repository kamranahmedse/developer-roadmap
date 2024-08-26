# WAL-G - An Advanced Backup Recovery Tool for PostgreSQL

WAL-G is an open-source archival and restoration tool for PostgreSQL and MySQL/MariaDB, designed for managing Write-Ahead Logs (WAL) and performing continuous archiving. It extends the capabilities of the traditional `pg_basebackup` by supporting features like delta backups, compression, and encryption. WAL-G is optimized for cloud storage, integrating seamlessly with services like Amazon S3, Google Cloud Storage, and Azure Blob Storage. It ensures efficient backup storage by deduplicating data and providing incremental backup capabilities. Additionally, WAL-G supports point-in-time recovery, allowing databases to be restored to any specific time, enhancing disaster recovery processes.

Learn more from the following resources:

- [@opensource@wal-g/wal-g](https://github.com/wal-g/wal-g)
- [@article@Continuous PostgreSQL Backups using WAL-G](https://supabase.com/blog/continuous-postgresql-backup-walg)