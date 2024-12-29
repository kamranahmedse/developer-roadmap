---
title: Types of Queries
description: Learn the different types of queries in SQL.
order: 160
type: lesson
---

SQL provides a variety of query types each designed to fulfill specific tasks from retrieving data to modifying database structures and controlling access. These query types can be categorized into five main groups:

- Data Query Language (DQL)
- Data Manipulation Language (DML)
- Data Definition Language (DDL)
- Data Control Language (DCL)
- Transaction Control Language (TCL)

While this course focuses primarily on DQL, DML, and DDL, a brief overview of DCL and TCL is given below to give you an idea of what they are.

## Data Query Language (DQL)

DQL is used to retrieve data from a database, enabling you to extract meaningful insights based on specified conditions. The primary statement in DQL is `SELECT`, which allows users to fetch data from tables.

For example, the following statement retrieves all rows from the `users` table:

```sql
SELECT * FROM users;
```

## Data Manipulation Language (DML)

DML is used to modify data stored in a database. It includes commands to insert, update, and delete records. The most commonly used DML statements are `INSERT`, `UPDATE`, and `DELETE`.

For example, the following statement inserts a new row into the `users` table:

```sql
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john.doe@example.com', 25);
```

The following statement updates the email address of the user with the id 1:

```sql
UPDATE users 
SET email = 'john.doe@example.com' 
WHERE id = 1;
```

The following statement deletes the user with the id 1:

```sql
DELETE FROM users 
WHERE id = 1;
```

We will look each of these statements and more in detail in later chapters.

## Data Definition Language (DDL)

Before we start inserting data into our database, we need to set up the database and the tables. This is done using the DDL statements. These statements are used to create, modify, and delete database objects such as tables, indexes, and views. Most common DDL statements are `CREATE`, `ALTER`, and `DROP`.

For example, the following statement creates a new table called `users`:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT
);
```

Again, don't worry about the syntax for now. We will cover it in detail in the coming chapters.

## Data Control Language (DCL)

DCL is used to manage access permissions and security within a database. It allows administrators to grant or revoke rights to specific users. The most common DCL statements are `GRANT` and `REVOKE`. 

For example, the following statement grants the user `john` access to the `users` table:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO john;
```

Although DCL is not covered extensively in this course, it is crucial for database security and user management.

## Transaction Control Language (TCL)

TCL manages database transactions to ensure data integrity. Transactions group multiple operations into a single unit, allowing them to be committed or rolled back together. Example of transaction could be a bank transfer where money is deducted from one account and added to another account while updating the bank statement for both accounts. If any of these steps fail, the transaction is rolled back, and the database is left in a consistent state. Here is an simplified example of a transaction:

```sql
BEGIN;
-- Deduct money from source account
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
-- Add money to destination account
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- Update bank statement for source and destination account
UPDATE bank_statements SET balance = balance - 100 WHERE account_id = 1;
UPDATE bank_statements SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

Most common TCL statements are `COMMIT` (saves the changes), `ROLLBACK` (undoes changes in case of an error), and `SAVEPOINT` (sets checkpoints within a transaction).

---
Takeaways

- SQL provides a variety of query types each designed to fulfill specific tasks from retrieving data to modifying database structures and controlling access.
- DQL is used to retrieve data from a database, enabling you to extract meaningful insights based on specified conditions. Common DQL statement is `SELECT`.
- DML is used to modify data stored in a database. Common DML statements are `INSERT`, `UPDATE`, and `DELETE`.
- DDL is used to create, modify, and delete database objects such as tables, indexes, and views. Common DDL statements are `CREATE`, `ALTER`, and `DROP`.
- DCL is used to manage access permissions and security within a database. Common DCL statements are `GRANT` and `REVOKE`.
- TCL manages database transactions to ensure data integrity. Common TCL statements are `COMMIT`, `ROLLBACK`, and `SAVEPOINT`.
---

In the next chapter, we will start looking at DQL queries first to get you started with SQL and then move on to DDL and DML.