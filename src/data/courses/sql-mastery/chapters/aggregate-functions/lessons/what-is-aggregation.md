---
title: What is Aggregation?
description: Learn about aggregation in SQL and how to use them effectively.
order: 100
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    amount DECIMAL(10, 2)
  );

  INSERT INTO sale (amount) 
  VALUES (24.99), (19.99), (34.99), (29.99);
  ```
---

So far in this course, we have been working with queries that process data row by row. For example, when we write a query like:

```sql
SELECT title, price
FROM books
WHERE category = 'Fiction';
```

The database processes each row individually and returns those that match our condition. These are called **single-row operations** because they work on one row at a time.

However, there are times when we need to analyze data across multiple rows to get insights such as:

- What is the total revenue from books in `Fiction` category?
- How many books do we have in each category?
- What is the average price of books in our store?
- What is the highest priced book we're selling?
- How many books have been sold this month?
- How much money a customer in the last 30 days?
- Creating a leaderboard of the most popular books.

This is where **aggregation** comes in.

## What is Aggregation?

Aggregation in SQL refers to the process of performing calculations across multiple rows to get a single result. Instead of returning individual rows, aggregate functions combine multiple rows and return a summary value.

> Aggregation refers to the process of performing calculations across multiple rows to get a single result e.g. total revenue by category, total number of orders per day, etc.

## Single-Row vs Aggregate Operations

Let's understand the difference with a simple example. Consider this `sale` table:

| sale_id | amount |
| ------- | ------ |
| 1       | 24.99  |
| 2       | 19.99  |
| 3       | 34.99  |
| 4       | 29.99  |

A single-row query like this:

```sql
SELECT amount FROM sale;
```

Would return all individual amounts:

| amount |
| ------ |
| 24.99  |
| 19.99  |
| 34.99  |
| 29.99  |

But an aggregate query like this:

```sql
SELECT SUM(amount) as total_amount FROM sale;
```

Would return a single value with the total amount of all sales:

| total_amount |
| ------------ |
| 109.96       |

In this chapter, we will be looking at the most common aggregate functions and how to use them to get insights from our data, different ways to group data and how to filter groups using the `HAVING` clause and different aggregation patterns that you may encounter in your work.

Let's dive into our first aggregate function in the next lesson!
