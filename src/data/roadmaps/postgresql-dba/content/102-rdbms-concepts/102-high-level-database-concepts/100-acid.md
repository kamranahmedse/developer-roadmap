# ACID

## ACID Properties

ACID stands for Atomicity, Consistency, Isolation, and Durability. These are the fundamental principles that help ensure the reliability of any database management system (DBMS), including PostgreSQL. A DBMS that adheres to ACID properties maintains correct and consistent data throughout its various transactions. Let's briefly discuss each principle.

### Atomicity

Atomicity refers to the all-or-nothing principle in which a transaction either completes in its entirety or fails without making any changes. This means that if any part of the transaction fails, the entire transaction is rolled back to its initial state, ensuring that no partial or intermediate changes are written to the database.

Example:
```sql
BEGIN;
INSERT INTO employees (name, salary) VALUES ('John Doe', 50000);
UPDATE employees SET salary = salary + 1000 WHERE name = 'Jane Smith';
INSERT INTO employees (name, salary) VALUES ('Mark Johnson', 60000);
-- If any of these queries fail, the entire transaction is rolled back.
COMMIT;
```

### Consistency

Consistency ensures that the database remains in a consistent state before and after every transaction. This means that a transaction can only bring a DB from one consistent state to another consistent state. Constraints, cascading actions, and triggers help enforce consistency.

Example:
```sql
ALTER TABLE employees ADD CONSTRAINT salary_check CHECK (salary > 0);
```

### Isolation

Isolation involves ensuring that concurrent transactions do not interfere with one another. When multiple transactions run simultaneously, the system should behave as if the transactions were executed serially, one after another. Isolation also helps prevent scenarios like dirty reads, non-repeatable reads, and phantom reads.

In PostgreSQL, you can enforce different isolation levels using the following syntax:

```sql
SET TRANSACTION ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED };
```

### Durability

Durability guarantees that once a transaction has been committed, the changes made by that transaction become permanent. This means that even in the event of system crashes or power failures, the data must be recoverable and persistent. PostgreSQL uses write-ahead logging (WAL) to ensure data durability.

Example of using WAL to achieve durability:
```sql
-- This command sets the minimum level of the write-ahead log (WAL) to make sure that changes are written to disk.
ALTER SYSTEM SET wal_level = 'replica';
```

In conclusion, ACID properties help in maintaining the reliability, accuracy, and consistency of a database system like PostgreSQL. By understanding and applying these principles, you as a PostgreSQL DBA can effectively manage your database and ensure smooth operation.