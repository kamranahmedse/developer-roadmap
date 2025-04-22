# No Persistence Option

The **No Persistence** option in Redis disables all data persistence mechanisms, meaning that no data will be saved to disk. This can be configured by turning off both RDB snapshots and AOF (Append-Only File) logging. Running Redis without persistence is ideal for use cases where high-speed caching is prioritized over data durability, such as storing ephemeral data or managing sessions that don’t need to survive a server restart. While this option reduces disk I/O and maximizes performance, it also means that all data will be lost if the server is shut down or crashes, making it suitable only for scenarios where data loss is acceptable.

Learn more from the following resources:

- [@official@Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)