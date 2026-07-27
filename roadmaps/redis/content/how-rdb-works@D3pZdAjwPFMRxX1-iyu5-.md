# How RDB Works?

The RDB (Redis Database Backup) mechanism in Redis creates snapshots of the dataset at specified intervals and saves them to disk as a compact binary file. This process is triggered manually, via the `SAVE` or `BGSAVE` commands, or automatically based on predefined conditions. During a snapshot, Redis forks a child process to write the in-memory data to the RDB file, ensuring that the main process is not blocked. While RDB offers a lightweight and fast backup option, it may lead to potential data loss if Redis crashes between snapshots, making it ideal for periodic backups rather than real-time persistence.

Learn more from the following resources:

- [@official@Backup Data](https://redis.io/docs/latest/operate/rc/databases/back-up-data/)
- [@article@About RDB Snapshots](https://cloud.google.com/memorystore/docs/redis/about-rdb-snapshots)