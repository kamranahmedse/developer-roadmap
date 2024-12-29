---
title: Creating Tables
description: Learn how to create tables in a database.
order: 100
type: lesson-challenge
---

So far in this course, we have been querying data from tables that were already created for us. In reality, we need to create tables before we can store data in them and query them.

In this lesson, we will learn how to create tables in a database.

## What is a Table?

We already covered what tables are in the previous lessons. But to recap, tables in relational databases are used to store data in a structured format. They are made up of rows and columns. Each row represents a record and each column represents a field.

For example, let's say we want to store information about books in a database. We might create a table with the following columns:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |

Another important thing to note is that each column/field has a data type. What is a data type? Data types identify the type of data that can be stored in a column. For example, a column with a data type of `INTEGER` can only store numeric values without decimals, a column with a data type of `VARCHAR` can store text values, and a column with a data type of `FLOAT` can store decimal values. We will learn more about data types in the next lesson.

> Data types are a crucial part of SQL because they ensure that the data stored in a database is consistent and accurate. They also help the database engine optimize storage and performance.

Alright, enough with the theory. Let's go ahead and create a table.

## Creating a Table

To create a table, we use the `CREATE TABLE` statement. The basic syntax for the `CREATE TABLE` statement is as follows:

```sql
-- Syntax for creating a table
CREATE TABLE table_name (
  column1_name data_type,
  column2_name data_type,
  ...
);
```

Let's say we want to create a table to store information about books. We might create a table with the following columns:

| id  | title                 | author              | price | year |
| --- | --------------------- | ------------------- | ----- | ---- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 | 1925 |
| 2   | 1984                  | George Orwell       | 12.99 | 1949 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  | 1960 |

Here is the SQL code to create this table:

```sql
CREATE TABLE books (
  id INT,
  title VARCHAR(255),
  author VARCHAR(255),
  price FLOAT,
  year INT
);
```

In this example, we are creating a table called `books` with the following columns:

| Column   | Data Type | Data it can store                         |
| -------- | --------- | ----------------------------------------- |
| `id`     | INT       | Non-decimal numbers e.g. 1, 2, 3, etc.    |
| `title`  | VARCHAR   | Max 255 characters long string of text    |
| `author` | VARCHAR   | Max 255 characters long string of text    |
| `price`  | FLOAT     | Decimal numbers e.g. 10.99, 12.99, etc.   |
| `year`   | INT       | Non-decimal numbers e.g. 1925, 1949, etc. |

Now, let's run the above SQL query in the editor on the right and have a look at the "Schema" tab to see the table we created.

---

## Error Handling

In the previous example, we created a table called `books`. But what if we run the same query again? It will throw the error

```
ERROR: table "books" already exists
```

To avoid this error, we can use the `IF NOT EXISTS` clause. This clause checks if a table with the same name already exists before creating it. If it does, it will not create the table again.

```sql
CREATE TABLE IF NOT EXISTS books (
  id INT,
  title VARCHAR(255),
  author VARCHAR(255),
  price FLOAT,
  year INT
);
```

You can run the above query as many times as you want and there will be no error.

---

## Challenge

Create a table called `books` with the following columns:

| Column   | Data it can store                         |
| -------- | ----------------------------------------- |
| `id`     | Non-decimal numbers e.g. 1, 2, 3, etc.    |
| `title`  | Max 250 characters long string of text    |
| `author` | Max 250 characters long string of text    |
| `price`  | Decimal numbers e.g. 10.99, 12.99, etc.   |
| `year`   | Non-decimal numbers e.g. 1925, 1949, etc. |

You are required to identify the correct data types for the columns based on the description above.