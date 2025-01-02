---
title: Referred Customers
description: Practice using joins to find customers who have been referred by another customer
order: 150
type: challenge
setup: |
  ```sql
  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      referred_by INT
  );

  INSERT INTO customer (id, name, email, referred_by)
  VALUES 
      (1, 'Alice Smith', 'alice@example.com', NULL),
      (2, 'Bob Johnson', 'bob@example.com', 1),
      (3, 'Carol White', 'carol@example.com', 1),
      (4, 'David Brown', 'david@example.com', 2),
      (5, 'Emily Davis', 'emily@example.com', NULL);
  ```
---

The bookstore runs a referral program where existing customers can refer new customers. Each referred customer records the ID of the referring customer in the database.

Write a query to find the names and email addresses of customers who have referred at least one other customer.

You can use the data from the existing `customer` table.

| customer_id | name        | email             | referred_by |
| ----------- | ----------- | ----------------- | ----------- |
| 1           | Alice Smith | alice@example.com | NULL        |
| 2           | Bob Johnson | bob@example.com   | 1           |
| 3           | Carol White | carol@example.com | 1           |
| 4           | David Brown | david@example.com | 2           |
| 5           | Emily Davis | emily@example.com | NULL        |

Your output should contain the following columns:

- `name`
- `email`
- `referred_by` (name of the customer or '- None -')

> **Tip:** You can use `COALESCE` function for `referred_by` column.

## Expected Output

| name        | email             | referred_by |
| ----------- | ----------------- | ----------- |
| Carol White | carol@example.com | Alice Smith |
| Bob Johnson | bob@example.com   | Alice Smith |
| David Brown | david@example.com | Bob Johnson |
| Emily Davis | emily@example.com | - None -    |
| Alice Smith | alice@example.com | - None -    |

## Solution

```sql
SELECT
    c.name,
    c.email,
    COALESCE(r.name, '- None -') AS referred_by
FROM customer c
LEFT JOIN customer r ON c.referred_by = r.id;
```
