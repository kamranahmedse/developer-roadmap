---
title: Expressions in SELECT
description: Learn the basics of SQL, the language for querying databases.
order: 110
type: lesson-challenge
---

Apart from columns and constants we discussed in the previous lessons, you can also use expressions in the `SELECT` statement. 

> Expressions are any valid combination of columns, constants, and operators.

Taking the same `books` table from our previous lesson:

| id | title | author | price |
|----|-------|--------|-------|
| 1  | The Great Gatsby | F. Scott Fitzgerald | 10.99 |
| 2  | 1984 | George Orwell | 12.99 |
| 3  | To Kill a Mockingbird | Harper Lee | 8.99 |

Let's say we are running a sale and want to add a `1` dollar discount to all books before displaying them. We can do this by using the following query:

```sql
SELECT title, author, price - 1 AS price
FROM books;
```

The output will be:

| id | title | author | price |
|----|-------|--------|-------|
| 1  | The Great Gatsby | F. Scott Fitzgerald | 9.99 |
| 2  | 1984 | George Orwell | 11.99 |
| 3  | To Kill a Mockingbird | Harper Lee | 7.99 |

You can have any valid expression in the `SELECT` statement e.g. `price - 1`, `price + 1`, `price * 2`, `price / 2`, etc.

## Combining Columns and Expressions

You can also use multiple columns in expressions. Let's say that instead of having the hardcoded discount of `1` dollar to all the books, we want to make it configurable based on the book.

Let's say we have added a new column `discount` to the `books` table. Our table now looks like this:

| id | title | author | price | discount |
|----|-------|--------|-------|------------|
| 1  | The Great Gatsby | F. Scott Fitzgerald | 10.99 | 1 |
| 2  | 1984 | George Orwell | 12.99 | 2 |
| 3  | To Kill a Mockingbird | Harper Lee | 8.99 | 3 |

We want to display the `title`, `author`, `price`, and `price - discount` as `final_price` columns.

```sql
SELECT 
    title,
    price, 
    discount,
    price - discount AS final_price,
FROM 
    books;
```

The output will be:

| title | price | discount | final_price |
|-------|-------|----------|-------------|
| The Great Gatsby | 10.99 | 1 | 9.99 |
| 1984 | 12.99 | 2 | 10.99 |
| To Kill a Mockingbird | 8.99 | 3 | 5.99 |

## Challenge

Given the same `books` table, i.e.

| id | title | author | price |
|----|-------|--------|-------|
| 1  | The Great Gatsby | F. Scott Fitzgerald | 10.99 |
| 2  | 1984 | George Orwell | 12.99 |
| 3  | To Kill a Mockingbird | Harper Lee | 8.99 |

Write an SQL query to display the `title`, `author`, `price`, and `price * 100` as `cent_price` columns. Your output should be:

| title | author | price | cent_price |
|-------|--------|-------|------------|
| The Great Gatsby | F. Scott Fitzgerald | 10.99 | 1099 |
| 1984 | George Orwell | 12.99 | 1299 |
| To Kill a Mockingbird | Harper Lee | 8.99 | 899 |
