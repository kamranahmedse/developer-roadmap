---
title: Aliases and Constants
description: Learn the basics of SQL, the language for querying databases.
order: 110
type: lesson-challenge
---

In our previous lesson, we looked at the basic `SELECT` statement and how to select columns from a table. However, there is much more to what we can `SELECT` from a table.

## Column Aliases

You may sometimes want to rename a column in the output of a query. This can be done using the `AS` keyword.

Taking the same `books` table from our previous lesson:

| id | title | author | price |
|----|-------|--------|-------|
| 1  | The Great Gatsby | F. Scott Fitzgerald | 10.99 |
| 2  | 1984 | George Orwell | 12.99 |
| 3  | To Kill a Mockingbird | Harper Lee | 8.99 |

Let's say we want to rename the `price` column to `cost`. We can do this by using the `AS` keyword:

```sql
SELECT title, price AS cost
FROM books;
```

The output will contain the `title` and `cost` columns i.e.

| title | cost |
|-------|------|
| The Great Gatsby | 10.99 |
| 1984 | 12.99 |
| To Kill a Mockingbird | 8.99 |

## Constants

In our previous lesson I mentioned that the `SELECT` statement has the following syntax:

```sql
SELECT column1, column2, ...
FROM table_name;
```

It is not entirely true. The reality is that the `SELECT` alone can be used without a `FROM` clause as well and you can have functions, expressions, and constants in the `SELECT` statement. For example the query below will return a single row containing `100`:

```sql
SELECT 100;
```

The output will be:

| 100 |
|-----|
| 100 |

As you can see the output is a single row containing the value `100` and a single column named `100`. You can also add aliases to the constants. For example the query below will return a single row containing the value `100` and a column named `cost`:

```sql
SELECT 100 AS cost;
```

The output will be:

| cost |
|------|
| 100  |


You can also add constants to the `SELECT` statement with a `FROM` clause. Let's say we want to return a hardcoded price of `100` for all books regardless of the actual price in the database, we can do this using the following query:

```sql
SELECT title, 100 AS price
FROM books;
```

The output will be:

| title | price |
|-------|------|
| The Great Gatsby | 100 |
| 1984 | 100 |
| To Kill a Mockingbird | 100 |