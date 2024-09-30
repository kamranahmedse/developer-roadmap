# Persistence Options

Redis provides two main persistence options: **RDB (Redis Database Backup)** and **AOF (Append-Only File)**. RDB creates point-in-time snapshots of the dataset at specified intervals, offering efficient storage with minimal performance impact, making it suitable for periodic backups but with potential data loss between snapshots. AOF logs every write operation to disk, providing higher data durability by allowing finer-grained recovery, though it can be more resource-intensive. Redis also supports a **hybrid persistence** mode that combines both RDB and AOF for faster restarts and stronger durability. Additionally, a **No Persistence** option is available for scenarios where data retention is unnecessary, prioritizing speed and memory efficiency.

Learn more from the following resources:

