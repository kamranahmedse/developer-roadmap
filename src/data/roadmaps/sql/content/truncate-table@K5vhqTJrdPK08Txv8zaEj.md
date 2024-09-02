# Truncate Table

The `TRUNCATE TABLE` statement is a Data Definition Language (DDL) operation that is used to mark the extents of a table for deallocation (empty for reuse). The result of this operation quickly removes all data from a table, typically bypassing a number of integrity enforcing mechanisms intended to protect data (like triggers).

It effectively eliminates all records in a table, but not the table itself. Unlike the `DELETE` statement, `TRUNCATE TABLE` does not generate individual row delete statements, so the usual overhead for logging or locking does not apply.

Learn more from the following resources:

- [@article@TRUNCATE TABLE](https://www.tutorialspoint.com/sql/sql-truncate-table.htm)
- [@video@SQL Tutorial - TRUNCATE TABLE](https://www.youtube.com/watch?v=zJidbjOQlJM)