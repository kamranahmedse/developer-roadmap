---
title: INSERT Operations
description: Learn how to insert data into a table.
order: 100
type: lesson-challenge
---

In our previous chapter, we learned all about selecting existing data from a table. This chapter is all about Data Manipulation Language (DML), which includes inserting, updating, and deleting data. We will learn about creating tables in the next chapter. For now, let's work with the existing tables that I have created for you.

In this lesson, we will learn how to insert data into a table.

## What is an INSERT Operation?

An `INSERT` operation is used to add new rows to a table. It allows you to specify the values for each column in the new row.

For example, let's say we have a table called `books` with the following columns:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |

We can insert a new row into this table using:

```sql
INSERT INTO books (id, title, author, price)
VALUES (4, 'The Catcher in the Rye', 'J.D. Salinger', 9.99);
```

This statement will add a new row to the `books` table with the following values:

| id  | title                  | author        | price |
| --- | ---------------------- | ------------- | ----- |
| 4   | The Catcher in the Rye | J.D. Salinger | 9.99  |

We can also insert multiple rows at once using:

```sql
INSERT INTO books (id, title, author, price)
VALUES (4, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
       (5, 'Pride and Prejudice', 'Jane Austen', 11.99),
       (6, 'The Hobbit', 'J.R.R. Tolkien', 13.99),
       (7, 'The Lord of the Rings', 'J.R.R. Tolkien', 14.99);
```

This will insert the following 4 rows into the `books` table:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 4   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 5   | Pride and Prejudice   | Jane Austen         | 11.99 |
| 6   | The Hobbit            | J.R.R. Tolkien      | 13.99 |
| 7   | The Lord of the Rings | J.R.R. Tolkien      | 14.99 |

---

## Challenge

I have already created a `books` table with the following columns:

| Column Name | Data Type      |
| ----------- | -------------- |
| id          | INTEGER        |
| title       | VARCHAR(250)   |
| author      | VARCHAR(250)   |
| price       | DECIMAL(10, 2) |

Insert the following 3 rows into the `books` table:

| id  | title                  | author        | price |
| --- | ---------------------- | ------------- | ----- |
| 8   | The Catcher in the Rye | J.D. Salinger | 9.99  |
| 9   | 1984                   | George Orwell | 12.99 |
| 10  | To Kill a Mockingbird  | Harper Lee    | 8.99  |
