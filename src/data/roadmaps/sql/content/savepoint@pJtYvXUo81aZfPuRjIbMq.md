# SAVEPOINT

A savepoint is a way of implementing subtransactions (nested transactions) within a relational database management system by indicating a particular point within a transaction that a user can "roll back" to in case of failure. The main property of a savepoint is that it enables you to create a rollback segment within a transaction. This allows you to revert the changes made to the database after the Savepoint without having to discard the entire transaction. 

A Savepoint might be used in instances where if a particular operation fails, you would like to revert the database to the state it was in before the operation was attempted, but you do not want to give up on the entire transaction. 

## Savepoint Syntax

The general syntax for `SAVEPOINT`:

```sql
SAVEPOINT savepoint_name;
```

## Use of Savepoint

Here is the basic usage of savepoint:

```sql
START TRANSACTION;
INSERT INTO Table1 (Column1) VALUES ('Value1');

SAVEPOINT SP1;

INSERT INTO Table1 (Column1) VALUES ('Value2');

ROLLBACK TO SP1;

COMMIT;
```

In this example, an initial `INSERT` statement is performed before a Savepoint named `SP1` is created. Another `INSERT` statement is called and then `ROLLBACK TO SP1` is executed. This means all changes between the creation of `SP1` and `ROLLBACK TO SP1` are reverted. After that, 'COMMIT' is used to permanently store the changes made by the first `INSERT` statement.

## Release Savepoint

The `RELEASE SAVEPOINT` deletes a savepoint within a transaction.

Here’s the syntax:

```sql
RELEASE SAVEPOINT savepoint_name;
```

The action of releasing a savepoint removes the named savepoint from the set of savepoints of the current transaction. No changes are undone.

## Remove Savepoint

The `ROLLBACK TO SAVEPOINT` removes a savepoint within a transaction.

Here’s the syntax:

```sql
ROLLBACK TRANSACTION TO savepoint_name;
```

This statement rolls back a transaction to the named savepoint without terminating the transaction. 

Please note, savepoint names are not case sensitive and must obey the syntax rules of the server.
