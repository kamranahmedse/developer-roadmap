---
title: Recent 3 Orders
description: Practice using LIMIT to get the top N records
order: 110
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

The bookstore manager wants to keep track of the most recent sales activity to identify current buying trends. They've asked you to create a report showing the three most recent orders with customer details to help understand who their latest customers are and what they're spending.

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
| 3   | 1           | 2024-10-20 | 200.00       |
| 4   | 4           | 2024-12-26 | 250.00       |
| 5   | 5           | 2024-11-12 | 300.00       |
| 6   | 2           | 2024-11-23 | 300.00       |
| 7   | 2           | 2024-11-11 | 300.00       |

Write a query to identify the 3 most recent orders along with customer information. The manager wants to see:

- The customer's name
- When they placed their order (formatted as "Month, YYYY")
- How much they spent

## Expected Output

| customer_name | order_date     | total_amount |
| ------------- | -------------- | ------------ |
| Bob Brown     | December, 2024 | 250.00       |
| John Doe      | December, 2024 | 100.00       |
| Jane Smith    | November, 2024 | 300.00       |

## Solution

```sql
SELECT
    c.name AS customer_name,
    TO_CHAR(s.order_date, 'Month, YYYY') AS order_date,
    s.total_amount
FROM customer c
JOIN sale s
    ON c.id = s.customer_id
ORDER BY s.order_date DESC
LIMIT 3;
```

### Explanation

Let's break down how this query works:

We start by joining the `customer` and `sale` tables to get customer information with their orders:

```sql
FROM customer c
JOIN sale s
    ON c.id = s.customer_id
```

We format the date to be more readable using `TO_CHAR`:

```sql
TO_CHAR(s.order_date, 'Month, YYYY') AS order_date
```

We order the results by order date in descending order (newest first):

```sql
ORDER BY s.order_date DESC
```

Finally, we use `LIMIT` to get only the 3 most recent orders:

```sql
LIMIT 3
```

This query helps the manager quickly see who their most recent customers are and identify any patterns in recent purchasing behavior.
