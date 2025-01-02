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

The bookstore's marketing team wants to run a special promotion targeting customers who haven't made any purchases yet. They believe these potential customers might need a little extra encouragement to make their first purchase. Your task is to help identify these inactive customers from the database.

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

Write a query to identify all customers who have never placed an order. These are the customers the marketing team wants to target with their special promotion.

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

### Explanation

We start with the `customer` table as we want to keep all customers regardless of whether they have made a purchase:

```sql
FROM customer c
```

We use a `LEFT JOIN` with the `sale` table to include all customers and their sales (if any):

```sql
LEFT JOIN sale s ON c.id = s.customer_id
```

The `WHERE` clause filters for customers who have no matching records in the `sale` table:

```sql
WHERE s.id IS NULL
```

This query efficiently identifies customers who haven't made any purchases yet. The LEFT JOIN ensures we keep all customers from the customer table, while the `WHERE` clause filters out those who have made purchases.
