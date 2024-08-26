# Buffer Management

PostgreSQL uses a buffer pool to efficiently cache frequently accessed data pages in memory. The buffer pool is a fixed-size, shared memory area where database blocks are stored while they are being used, modified or read by the server. Buffer management is the process of efficiently handling these data pages to optimize performance.

Learn more from the following resources:

- [@article@Buffer Manager](https://dev.to/vkt1271/summary-of-chapter-8-buffer-manager-from-the-book-the-internals-of-postgresql-part-2-4f6o)
- [@official@pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache.html)
- [@official@Write Ahead Logging](https://www.postgresql.org/docs/current/wal-intro.html)