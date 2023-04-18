# Transactions

## Transactions

A *transaction* is a single sequence of one or more SQL operations (queries, updates, or other data manipulations) that are executed as a single unit of work. They allow databases to remain in a consistent and predictable state even when multiple users are modifying the data concurrently.

In PostgreSQL, a transaction can be defined using the `BEGIN`, `COMMIT`, and `ROLLBACK` SQL statements. It's essential to understand the main concepts within transactions, such as the ACID properties, isolation levels, and concurrency issues. 

### ACID Properties

Transactions provide ACID properties, which are essential for maintaining data consistency and integrity:

1. **Atomicity**: A transaction is either fully completed or not executed at all. If any operation within the transaction fails, the entire transaction is aborted and rolled back.

2. **Consistency**: The database remains in a consistent state before and after each transaction. All constraints, rules, and triggers must be satisfied in every transaction's final state.

3. **Isolation**: Each transaction occurs independently and does not affect other ongoing transactions. The state of the database during one transaction should not be visible to other concurrent transactions.

4. **Durability**: Once a transaction is committed, the changes to the data are permanent, even in the case of system failure.

### Isolation Levels

PostgreSQL offers different transaction isolation levels, which define the visibility of changes made by other concurrent transactions:

1. **Read Uncommitted**: The lowest level of isolation, allowing a transaction to see uncommitted changes made by other transactions. This level is not supported in PostgreSQL.

2. **Read Committed**: A transaction can only see changes committed before it started or those committed during its execution. This is the default isolation level in PostgreSQL.

3. **Repeatable Read**: A transaction sees a consistent snapshot of the database at the time the transaction begins, providing a higher level of isolation than Read Committed. 

4. **Serializable**: The highest level of isolation, ensuring that transactions will behave as if they were executed sequentially.

You can set the isolation level for a specific transaction using the `SET TRANSACTION` command, followed by the `ISOLATION LEVEL` keyword and the desired level.

### Concurrency Issues

When running transactions concurrently, some issues may arise that can affect data consistency and integrity, such as:

- **Dirty Read**: A transaction reads data written by an uncommitted transaction.
- **Non-repeatable Read**: A transaction reads the same data more than once, but the data is changed by another transaction during that time.
- **Phantom Read**: A transaction reads a set of data that meets specific criteria, but another concurrent transaction adds or removes rows that meet the criteria.

To prevent these issues, PostgreSQL uses a multi-version concurrency control (MVCC) model, ensuring that each transaction sees a consistent snapshot of the data and allowing high concurrency levels without the need for locks.

By understanding transactions and their essential concepts, you can effectively manage data changes, ensuring data consistency and integrity in your PostgreSQL databases.