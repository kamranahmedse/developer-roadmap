---
title: Challenge 1
description: Write a SQL query to find the total number of orders in the `orders` table.
order: 300
type: challenge
defaultValue: SELECT * FROM orders;
initSteps:
  - CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date DATE,
    total DECIMAL(10, 2)
    );
  - INSERT INTO orders (id, customer_id, order_date, total)
    VALUES
    (1, 1, '2021-01-01', 100.00),
    (2, 2, '2021-01-02', 200.00),
    (3, 1, '2021-01-03', 300.00),
    (4, 3, '2021-01-04', 400.00),
    (5, 2, '2021-01-05', 500.00);
expectedResults:
  - columns: [total_orders]
    values:
      - [5]
---

## Instructions

Write a SQL query to find the total number of orders in the `orders` table.

## Result

Your query should return a single column with the total number of orders in the `orders` table.
