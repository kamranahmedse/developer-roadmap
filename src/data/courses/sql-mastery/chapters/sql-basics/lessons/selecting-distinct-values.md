---
title: Selecting DISTINCT Values
description: Learn the basics of SQL, the language for querying databases.
order: 120
type: lesson-challenge
---

We can use the `DISTINCT` keyword in our `SELECT` statement to select the unique values of a column.

Continuing the same example of an online bookstore, let's say we have a table called `orders` that contains the information about the orders placed by customers.

Let's say we have the following data in the `orders` table:

| id | customer_id | order_date | status |
|----|-------------|------------|--------|
| 1  | 101         | 2024-01-01 | completed |
| 2  | 102         | 2024-01-02 | pending |
| 3  | 101         | 2024-01-03 | completed |
| 4  | 103         | 2024-01-04 | cancelled |
| 5  | 102         | 2024-01-05 | completed |

The `status` column contains the status of the orders. We want to select the distinct values of the `status` column.

The SQL query to do this would be:

```sql
SELECT DISTINCT status 
FROM orders;
```

This will return the following result:

| status |
|--------|
| completed |
| pending |
| cancelled |

---

## Challenge

Given the same `orders` table, i.e.

| id | customer_id | order_date | status |
|----|-------------|------------|--------|
| 1  | 101         | 2024-01-01 | completed |
| 2  | 102         | 2024-01-02 | pending |
| 3  | 101         | 2024-01-03 | completed |
| 4  | 103         | 2024-01-04 | cancelled |
| 5  | 102         | 2024-01-05 | completed |

Write an SQL query to select the distinct values of the `order_date` for us to see the unique dates on which orders were placed.