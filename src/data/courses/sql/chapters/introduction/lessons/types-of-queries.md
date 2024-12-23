---
title: Types of Queries
description: Learn the different types of queries in SQL.
order: 160
type: lesson
---

SQL (Structured Query Language) is a powerful tool for managing and manipulating data in relational databases. It provides a variety of query types that serve different purposes, from retrieving data to modifying database structures and more. There are three core types of queries in SQL:

1. Data Query Language (DQL)
2. Data Manipulation Language (DML)
3. Data Definition Language (DDL)

However, there are two additional types of queries that are used to manage the database itself:

1. Data Control Language (DCL)
2. Transaction Control Language (TCL)

DCL and TCL are not covered in this course, but we will cover the other three types of queries in detail.

## Data Query Language (DQL)

DQL is used to retrieve data from a database, enabling users to extract meaningful information based on specific conditions. The most common DQL statement is the `SELECT` statement.

For example, the following statement retrieves all rows from the `users` table:

```sql
SELECT * FROM users;
```

## Data Manipulation Language (DML)

DML is used to manipulate data stored in the database, such as inserting, updating, or deleting records. The most common DML statements are `INSERT`, `UPDATE`, and `DELETE`.

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

## Data Definition Language (DDL)

DDL is used to define the structure of the database. The most common DDL statements are `CREATE`, `ALTER`, and `DROP`.

For example, the following statement creates a new table called `users`:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT
);
```

Don't worry if you don't understand the syntax of these statements yet, we will cover them in detail in later chapters.