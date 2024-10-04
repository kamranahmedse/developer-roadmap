# Hybrid Persistence

Hybrid persistence in Redis combines both RDB (Redis Database Backup) and AOF (Append-Only File) mechanisms to leverage the benefits of each. RDB provides efficient snapshot-based backups at defined intervals, while AOF logs every write operation to ensure minimal data loss. Using both, Redis achieves a balance between fast recovery times (thanks to compact RDB snapshots) and high durability (from the detailed logging of AOF). This approach minimizes the drawbacks of using either persistence type alone and offers a robust solution for scenarios requiring both performance and data safety.

Learn more from the following resources:

- [@official@Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)