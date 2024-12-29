---
title: SELECT Fundamentals
description: Learn the basics of SQL, the language for querying databases.
order: 100
type: lesson-challenge
---

`SELECT` statement is used to retrieve data from a database. The syntax for `SELECT` statement is as follows:

```sql
SELECT column1, column2, ...
FROM table_name;
```

Here, `column1, column2, ...` are the columns we want to retrieve from the table and `table_name` is the name of the table we want to retrieve the data from.

## Book Store

Let's take a hypothetical example of an online store that sells books. Imagine we have a table called `books` containing all the books available for sale with following data:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |

## Selecting All Columns

To get all the books from the `books` table, we would write the following SQL query:

```sql
SELECT * FROM books;
```

The `*` symbol is a wildcard character that represents all columns. This query will return all the columns from the `books` table.

> Notice that we end our query with a semicolon `;`. This is a common convention in SQL to indicate the end of a query. However, it is not mandatory and can be omitted if you want unless you are running multiple queries in a single file.

## Selecting Specific Columns

To get only the `title` and `author` columns from the `books` table, we would write the following SQL query:

```sql
SELECT title, author FROM books;
```

This query will return only the `title` and `author` columns from the `books` table. You can select as many columns as you want separated by commas.

---

## Challenge

Taking the same `books` table, write an SQL query to get the `title` and `price` columns from the `books` table. Your output should look like this:

| title                 | price |
| --------------------- | ----- |
| The Great Gatsby      | 10.99 |
| 1984                  | 12.99 |
| To Kill a Mockingbird | 8.99  |
