---
title: Unique Projection
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 330
type: challenge
initSteps:
  - CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    total_price REAL,
    status TEXT
    );
  - INSERT INTO orders (id, customer_id, total_price, status)
    VALUES
    (1, 1, 100.00, 'shipped'),
    (2, 3, 150.00, 'pending'),
    (3, 1, 200.00, 'shipped'),
    (4, 3, 250.00, 'cancelled'),
    (5, 2, 300.00, 'shipped'),
    (6, 1, 300.00, 'pending'),
    (7, 2, 300.00, 'shipped'),
    (8, 3, 300.00, 'pending'),
    (9, 1, 300.00, 'pending'),
    (10, 2, 300.00, 'shipped');
expectedResults:
  - columns: [customer_id]
    values:
      - [3]
      - [1]
---

Given the following `orders` table:

| id  | customer_id | total_price | status    |
| --- | ----------- | ----------- | --------- |
| 1   | 1           | 100.00      | shipped   |
| 2   | 3           | 150.00      | pending   |
| 3   | 1           | 200.00      | shipped   |
| 4   | 3           | 250.00      | cancelled |
| 5   | 2           | 300.00      | shipped   |
| 6   | 1           | 300.00      | pending   |
| 7   | 2           | 300.00      | shipped   |
| 8   | 3           | 300.00      | pending   |
| 9   | 1           | 300.00      | pending   |
| 10  | 2           | 300.00      | shipped   |

Write an SQL query to get a unique list of `customer_id` values where the status is `pending`.

## Expected Results

| customer_id |
| ----------- |
| 1           |
| 3           |
