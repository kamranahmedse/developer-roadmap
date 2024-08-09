# COMMIT

The SQL COMMIT command is used to save all the modifications made by the current transaction to the database. A COMMIT command ends the current transaction and makes permanent all changes performed in the transaction. It is a way of ending your transaction and saving your changes to the database.

After the SQL COMMIT statement is executed, it can not be rolled back, which means you can't undo the operations. COMMIT command is used when the user is satisfied with the changes made in the transaction, and these changes can now be made permanent in the database.

## Syntax:

```sql
COMMIT;
```
In some databases, if AUTOCOMMIT is enabled (which is typically the default setting), then every single SQL statement is treated as a transaction and automatically committed right after it is executed. 

Example:

Imagine you have a transaction that transfers money from Account A to Account B. The SQL might look something like this:

```sql
START TRANSACTION;
UPDATE Account SET amount = amount - 2000 WHERE name = 'A';
UPDATE Account SET amount = amount + 2000 WHERE name = 'B';
COMMIT;
```
In this transaction, $2000 is transferred from account 'A' to account 'B'. The COMMIT statement makes these changes permanent in the database.

However, keep in mind that if there was an error during this transaction (for instance if Account A did not have enough money), you'd want to ROLLBACK the transaction, not COMMIT, to undo any changes made before the error occurred.

## Syntax with ROLLBACK:

```sql
START TRANSACTION;
UPDATE Account SET amount = amount - 2000 WHERE name = 'A';
UPDATE Account SET amount = amount + 2000 WHERE name = 'B';
IF @@ERROR != 0 
   ROLLBACK  
ELSE 
   COMMIT;
```
Here, if @@ERROR is not 0, the transaction will be rolled back. Otherwise, the transaction will be committed.