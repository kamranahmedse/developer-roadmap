# Transactions

# Transactions

Transactions are a crucial aspect of any database management system, and PostgreSQL is no exception. A transaction is a sequence of one or more SQL operations that constitute a single, logical unit of work. Transactions provide a consistent and reliable mechanism for safeguarding the integrity of the database when multiple operations are performed concurrently.

The primary goal of a transaction is to ensure that the database remains in a consistent state despite any errors or system crashes that may occur during its operation. To achieve this goal, PostgreSQL implements a set of properties known as **ACID**:

- **A**tomicity: A transaction must be either fully completed or fully rolled back. There can be no partial transactions.
- **C**onsistency: The database must always transition from one consistent state to another upon the completion of a transaction.
- **I**solation: Each transaction must be completely isolated from other transactions running concurrently.
- **D**urability: Once a transaction has been committed, its changes must be permanently saved in the database.

## Using Transactions in PostgreSQL

To start a transaction, use the `BEGIN` statement:

```sql
BEGIN;
```

You can then execute the SQL operations that form your transaction. For example, consider a simple banking scenario where you're transferring funds from one account to another:

```sql
-- Subtract the transferred amount from the first account's balance
UPDATE accounts SET balance = balance - 100 WHERE id = 1;

-- Add the transferred amount to the second account's balance
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
```

To commit the transaction and save the changes to the database permanently, use the `COMMIT` statement:

```sql
COMMIT;
```

If an error occurs during the transaction, or you need to cancel the transaction for any reason, you can roll back the transaction using the `ROLLBACK` statement:

```sql
ROLLBACK;
```

## Transaction Isolation Levels

PostgreSQL provides multiple transaction isolation levels that govern the visibility of data changes made by one transaction to other concurrent transactions. The default isolation level in PostgreSQL is **Read Committed**. Other isolation levels include **Read Uncommitted**, **Repeatable Read**, and **Serializable**.

To set the transaction isolation level for a specific transaction, use the `SET TRANSACTION` statement:

```sql
BEGIN;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Your SQL operations here
COMMIT;
```

Understanding and selecting the appropriate transaction isolation level is essential for achieving the desired balance between data consistency and application performance.

In summary, transactions are a powerful mechanism that PostgreSQL offers to ensure data consistency and integrity when executing multiple operations on the database. By understanding and effectively using transactions, you can build robust and reliable database applications.