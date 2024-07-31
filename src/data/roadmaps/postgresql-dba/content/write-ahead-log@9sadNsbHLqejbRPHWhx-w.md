# Write Ahead Log (WAL)

The Write Ahead Log, also known as the WAL, is a crucial part of PostgreSQL's data consistency strategy. The WAL records all changes made to the database in a sequential log before they are written to the actual data files. In case of a crash, PostgreSQL can use the WAL to bring the database back to a consistent state without losing any crucial data. This provides durability and crash recovery capabilities for your database.

Learn more from the following resources:

- [@official@Write Ahead Logging](https://www.postgresql.org/docs/current/wal-intro.html)
- [@article@Working With Postgres WAL Made Easy 101](https://hevodata.com/learn/working-with-postgres-wal/)
- [@video@Write Ahead Logging](https://www.youtube.com/watch?v=yV_Zp0Mi3xs)