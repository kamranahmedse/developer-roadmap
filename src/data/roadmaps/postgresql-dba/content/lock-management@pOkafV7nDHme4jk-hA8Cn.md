# Lock Management

Lock management in PostgreSQL is implemented using a lightweight mechanism that allows database objects, such as tables, rows, and transactions, to be locked in certain modes. The primary purpose of locking is to prevent conflicts that could result from concurrent access to the same data or resources.

There are various types of lock modes available, such as `AccessShareLock`, `RowExclusiveLock`, `ShareUpdateExclusiveLock`, etc. Each lock mode determines the level of compatibility with other lock modes, allowing or preventing specific operations on the locked object.

Learn more from the following resources:

- [@official@Lock Management](https://www.postgresql.org/docs/current/runtime-config-locks.html)
- [@article@Understanding Postgres Locks and Managing Concurrent Transactions](https://medium.com/@sonishubham65/understanding-postgres-locks-and-managing-concurrent-transactions-1ededce53d59)