---
title: High Value Orders
description: Practice using EXCEPT to identify potential technical book opportunities
order: 130
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
      (3, 1, '2024-10-20', 550.00),
      (4, 4, '2024-12-26', 250.00),
      (5, 5, '2024-11-12', 300.00),
      (6, 2, '2024-11-23', 300.00),
      (7, 2, '2024-11-11', 600.00);
  ```
---

The bookstore wants to identify their most valuable orders to better understand their high-spending customers. The marketing team plans to create a VIP program for customers who make large purchases, and they've defined a high-value order as any purchase of $500 or more. They need a report of all such orders to begin their analysis.

Given the following data in table `customer`

| id  | name          | email                     |
| --- | ------------- | ------------------------- |
| 1   | John Doe      | john.doe@example.com      |
| 2   | Jane Smith    | jane.smith@example.com    |
| 3   | Alice Johnson | alice.johnson@example.com |
| 4   | Bob Brown     | bob.brown@example.com     |
| 5   | Charlie Davis | charlie.davis@example.com |
| 6   | David Lee     | david.lee@example.com     |

And the following data in table `sale`

| id  | customer_id | order_date | total_amount |
| --- | ----------- | ---------- | ------------ |
| 1   | 1           | 2024-12-02 | 100.00       |
| 2   | 1           | 2024-11-15 | 150.00       |
| 3   | 1           | 2024-10-20 | 550.00       |
| 4   | 4           | 2024-12-26 | 250.00       |
| 5   | 5           | 2024-11-12 | 300.00       |
| 6   | 2           | 2024-11-23 | 300.00       |
| 7   | 2           | 2024-11-11 | 600.00       |

Write a query to identify all orders worth $500 or more. The marketing team wants to see:

- The customer's name
- The order amount
- When the order was placed (formatted as "Month DD, YYYY")

Results should be ordered by amount from highest to lowest to easily identify the most valuable orders.

## Expected Output

| customer_name | order_amount | order_date        |
| ------------- | ------------ | ----------------- |
| Jane Smith    | 600.00       | November 11, 2024 |
| John Doe      | 550.00       | October 20, 2024  |

## Solution

```sql
SELECT
    c.name AS customer_name,
    s.total_amount AS order_amount,
    TO_CHAR(s.order_date, 'Month DD, YYYY') AS order_date
FROM customer c
JOIN sale s
    ON c.id = s.customer_id
WHERE s.total_amount >= 500
ORDER BY s.total_amount DESC;
```

### Explanation

Let's break down how this query works:

We join the `customer` and `sale` tables to get customer information with their orders:

```sql
FROM customer c
JOIN sale s
    ON c.id = s.customer_id
```

We filter for high-value orders using the WHERE clause:

```sql
WHERE s.total_amount >= 500
```

We format the date to be more readable using `TO_CHAR`:

```sql
TO_CHAR(s.order_date, 'Month DD, YYYY') AS order_date
```

Finally, we order the results by total amount in descending order to see the highest value orders first:

```sql
ORDER BY s.total_amount DESC
```

This query helps the marketing team identify their highest-value orders and the customers who placed them, providing valuable information for their VIP program initiative.
