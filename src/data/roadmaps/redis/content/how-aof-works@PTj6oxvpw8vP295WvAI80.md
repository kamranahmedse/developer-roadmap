# How AOF Works?

The Append-Only File (AOF) in Redis is a persistence mechanism that logs every write operation to a file in sequential order, ensuring data durability. Each command is appended to the end of the AOF file, which Redis can replay to rebuild the dataset in case of a restart. The AOF file can grow over time, so Redis provides an automatic background process called *AOF rewrite* to create a compact version by eliminating redundant commands. AOF is generally safer than the default RDB snapshotting, as it provides finer granularity for data recovery and minimizes the potential for data loss.

Learn more from the following resources:

- [@article@About AOF Persistence - Google](https://cloud.google.com/memorystore/docs/cluster/about-aof-persistence)