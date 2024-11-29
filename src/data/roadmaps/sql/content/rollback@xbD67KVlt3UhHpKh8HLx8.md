# ROLLBACK

`ROLLBACK` is a SQL command used to undo transactions that have not yet been committed to the database. It reverses all changes made within the current transaction, restoring the database to its state before the transaction began. This command is crucial for maintaining data integrity, especially when errors occur during a transaction or when implementing conditional logic in database operations. `ROLLBACK` is an essential part of the ACID (Atomicity, Consistency, Isolation, Durability) properties of database transactions, ensuring that either all changes in a transaction are applied, or none are, thus preserving data consistency.

Learn more from the following resources:

- [@video@How to undo a mistake a in SQL: Rollback and Commit](https://www.youtube.com/watch?v=jomsdMLiIZM)
- [@article@Difference between COMMIT and ROLLBACK in SQL](https://byjus.com/gate/difference-between-commit-and-rollback-in-sql/)