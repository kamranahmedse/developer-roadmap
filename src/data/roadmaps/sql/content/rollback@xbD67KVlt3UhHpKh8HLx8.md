# ROLLBACK

The `ROLLBACK` command is a transactional control language (TCL) instruction that undoes an unsuccessful or unsatisfactory running transaction. This process also applies to SQL Server where all individual statements in SQL Server are treated as a single atomic transaction.

When a `ROLLBACK` command is issued, all the operations (such as Insert, Delete, Update, etc.) are undone and the database is restored to its initial state before the transaction started. 

## When to use `ROLLBACK`

1. If the transaction is unacceptable or unsuccessful.
2. If you want to revert the unwanted changes.

Here is a basic example:

```sql
BEGIN TRANSACTION;  

-- This would delete all rows from the table.
DELETE FROM Employee;

-- Oh no! That's not what I wanted. Let's roll that back.
ROLLBACK;
```

In this example, the `ROLLBACK` command would restore all deleted data into the `Employee` table.

SQL also allows the usage of `SAVEPOINT`s along with the `ROLLBACK` command, which allows rolling back to a specific point in a transaction, instead of rolling back the entire transaction.

Here is an example of using `SAVEPOINT`s:

```sql
BEGIN TRANSACTION;

-- Adding new employee.
INSERT INTO Employee(ID, Name) VALUES(1, 'John');

-- Create a savepoint to be able to roll back to this point.
SAVEPOINT SP1;

-- Oh no! I made a mistake creating this employee. Let's roll back to the savepoint.
ROLLBACK TO SAVEPOINT SP1;

-- Now I can try again.
INSERT INTO Employee(ID, Name) VALUES(1, 'Jack');

-- Commit the changes.
COMMIT;
```

In this example, `ROLLBACK TO SAVEPOINT SP1` would undo the first insert into the `Employee` table while preserving the state of the database as it was at the savepoint `SP1`. So, the second insert command would properly add 'Jack' in place of 'John'.