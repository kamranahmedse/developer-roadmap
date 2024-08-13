# BEGIN

`BEGIN` is used in SQL to start a transaction, which is a sequence of one or more SQL operations that are executed as a single unit. A transaction ensures that all operations within it are completed successfully before any changes are committed to the database. If any part of the transaction fails, the `ROLLBACK` command can be used to undo all changes made during the transaction, maintaining the integrity of the database. Once all operations are successfully completed, the `COMMIT` command is used to save the changes. Transactions are crucial for maintaining data consistency and handling errors effectively.

Learn more from the following resources:

- [@article@BEGIN...END Statement](https://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.infocenter.dc00801.1510/html/iqrefso/BABFBJAB.htm)
- [@article@SQL 'BEGIN' & 'END' Statements](https://reintech.io/blog/understanding-sql-begin-end-statements-guide)