---
title: Challenge 6
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 600
type: challenge
initSteps:
  - CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    order_date DATE NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT CHECK(status IN ('Completed', 'Pending', 'Shipped')) NOT NULL
    );
  - INSERT INTO orders (id, customer_name, order_date, total_amount, status) VALUES
    (101, 'Alice Johnson', '2023-11-15', 150.00, 'Completed'),
    (102, 'Bob Smith', '2023-12-01', 250.50, 'Pending'),
    (103, 'Charlie Brown', '2023-12-10', 99.99, 'Completed'),
    (104, 'Diana Prince', '2023-11-20', 180.75, 'Shipped'),
    (105, 'Eve Adams', '2023-12-05', 300.00, 'Completed'),
    (106, 'Frank Castle', '2023-12-08', 120.00, 'Pending'),
    (107, 'Grace Hopper', '2023-12-12', 200.50, 'Shipped');

expectedResults:
  - columns: [id, customer_name, order_date, total_amount, status]
    values:
      - [107, 'Grace Hopper', '2023-12-12', 200.50, 'Shipped']
      - [103, 'Charlie Brown', '2023-12-10', 99.99, 'Completed']
      - [105, 'Eve Adams', '2023-12-05', 300.00, 'Completed']
---

Given the following `orders` table:

| id  | customer_name | order_date | total_amount | status    |
| --- | ------------- | ---------- | ------------ | --------- |
| 101 | Alice Johnson | 2023-11-15 | 150.00       | Completed |
| 102 | Bob Smith     | 2023-12-01 | 250.50       | Pending   |
| 103 | Charlie Brown | 2023-12-10 | 99.99        | Completed |
| 104 | Diana Prince  | 2023-11-20 | 180.75       | Shipped   |
| 105 | Eve Adams     | 2023-12-05 | 300.00       | Completed |
| 106 | Frank Castle  | 2023-12-08 | 120.00       | Pending   |
| 107 | Grace Hopper  | 2023-12-12 | 200.50       | Shipped   |

Write a query to find the top 3 most recent orders (based on the `order_date`) that are either `Completed` or `Shipped`.

## Expected Results

| id  | customer_name | order_date | total_amount | status    |
| --- | ------------- | ---------- | ------------ | --------- |
| 107 | Grace Hopper  | 2023-12-12 | 200.50       | Shipped   |
| 103 | Charlie Brown | 2023-12-10 | 99.99        | Completed |
| 105 | Eve Adams     | 2023-12-05 | 300.00       | Completed |
