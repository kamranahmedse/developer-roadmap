---
title: Sorting and Filtering
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 370
type: challenge
initSteps:
  - CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    total_amount REAL NOT NULL,
    shipped_at DATE
    );
  - INSERT INTO orders (id, customer_name, total_amount, shipped_at) VALUES
    (1, 'Alice', 100, '2024-01-01'),
    (2, 'Bob', 200, NULL),
    (3, 'Charlie', 300, '2024-01-03'),
    (4, 'David', 400, NULL),
    (5, 'Eve', 500, '2024-01-05'),
    (6, 'Frank', 600, NULL),
    (7, 'Grace', 700, '2024-01-07'),
    (8, 'Henry', 800, NULL),
    (9, 'Henry', 900, '2024-01-09'),
    (10, 'Ivy', 1000, NULL);

expectedResults:
  - columns: [id, customer_name, total_amount, shipped_at]
    values:
      - [10, 'Ivy', 1000, NULL]
      - [8, 'Henry', 800, NULL]
      - [6, 'Frank', 600, NULL]
---

Given the following table for `orders`:

| id  | customer_name | total_amount | shipped_at |
| --- | ------------- | ------------ | ---------- |
| 1   | Alice         | 100          | 2024-01-01 |
| 2   | Bob           | 200          | NULL       |
| 3   | Charlie       | 300          | 2024-01-03 |
| 4   | David         | 400          | NULL       |
| 5   | Eve           | 500          | 2024-01-05 |
| 6   | Frank         | 600          | NULL       |
| 7   | Grace         | 700          | 2024-01-07 |
| 8   | Henry         | 800          | NULL       |
| 9   | Henry         | 900          | 2024-01-09 |
| 10  | Ivy           | 1000         | NULL       |

Write an SQL query to return the top 3 most expensive orders that don't have a `shipped_at` date.

## Expected Results

| id  | customer_name | total_amount | shipped_at |
| --- | ------------- | ------------ | ---------- |
| 10  | Ivy           | 1000         | NULL       |
| 8   | Henry         | 800          | NULL       |
| 6   | Frank         | 600          | NULL       |
