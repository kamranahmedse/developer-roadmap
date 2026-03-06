# Truncate Table

Truncate Table is a command in SQL used to remove all rows from a table.  It's like resetting the table to its initial, empty state.  The table structure itself (columns, data types, constraints) remains intact. `TRUNCATE TABLE` is generally faster than `DELETE` because it deallocates the data pages used by the table, rather than individually logging each row deletion.

Visit the following resources to learn more:

- [@article@TRUNCATE TABLE](https://www.tutorialspoint.com/sql/sql-truncate-table.htm)
- [@video@SQL Tutorial - TRUNCATE TABLE](https://www.youtube.com/watch?v=zJidbjOQlJM)