---
title: Inactive Customers
description: Practice using EXCEPT to identify potential technical book opportunities
order: 100
type: challenge
setup: |
  ```sql
  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      customer_id INT,
      order_date DATE,
      total_amount DECIMAL(10,2)
  );

  INSERT INTO customer (id, name, email)
  VALUES 
      (1, 'John Doe', 'john.doe@example.com'),
      (2, 'Jane Smith', 'jane.smith@example.com'),
      (3, 'Alice Johnson', 'alice.johnson@example.com'),
      (4, 'Bob Brown', 'bob.brown@example.com'),
      (5, 'Charlie Davis', 'charlie.davis@example.com'),
      (6, 'David Lee', 'david.lee@example.com');

  INSERT INTO sale (id, customer_id, order_date, total_amount)
  VALUES 
      (1, 1, '2024-12-02', 100.00),
      (2, 1, '2024-11-15', 150.00),
      (3, 1, '2024-10-20', 200.00),
      (4, 4, '2024-12-26', 250.00),
      (5, 5, '2024-11-12', 300.00),
      (6, 2, '2024-11-23', 300.00),
      (7, 2, '2024-11-11', 300.00);
  ```
---

Our bookstore has some marketing budget. The marketing team wants to send coupons to customers who have never placed an order. They have asked us to extract the list of customers for them.

We have the `customer` and `sale` tables.

> `customer` table has the list of customers.

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 1   | John Doe      | john.doe@example.com      |
| 2   | Jane Smith    | jane.smith@example.com    |
| 3   | Alice Johnson | alice.johnson@example.com |
| 4   | Bob Brown     | bob.brown@example.com     |
| 5   | Charlie Davis | charlie.davis@example.com |
| 6   | David Lee     | david.lee@example.com     |

> `sale` table has the list of sales.

| id  | customer_id | order_date | total_amount |
| --- | ----------- | ---------- | ------------ |
| 1   | 1           | 2024-12-02 | 100.00       |
| 2   | 1           | 2024-11-15 | 150.00       |
| 3   | 1           | 2024-10-20 | 200.00       |
| 4   | 4           | 2024-12-26 | 250.00       |
| 5   | 5           | 2024-11-12 | 300.00       |
| 6   | 2           | 2024-11-23 | 300.00       |
| 7   | 2           | 2024-11-11 | 300.00       |

Write a query to find customers who have never placed an order.

## Expected Output

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 6   | David Lee     | david.lee@example.com     |
| 3   | Alice Johnson | alice.johnson@example.com |

## Solution

```sql
SELECT c.id, c.name, c.email
FROM customer c
LEFT JOIN sale s
  ON c.id = s.customer_id
WHERE s.id IS NULL;
```
