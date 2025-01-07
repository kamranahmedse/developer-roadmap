---
title: New Customer Analysis
description: Practice using multiple CTEs to analyze book sales and customer data
order: 144
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      price DECIMAL(10,2)
  );

  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(100),
      joined_date DATE
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      book_id INT,
      customer_id INT,
      sale_date DATE,
      quantity INT
  );

  INSERT INTO book (id, title, price) VALUES
      (1, 'SQL Basics', 29.99),
      (2, 'Advanced SQL', 49.99),
      (3, 'Data Science', 39.99),
      (4, 'Web Development', 34.99);

  INSERT INTO customer (id, name, joined_date) VALUES
      (1, 'John Smith', '2024-12-15'),
      (2, 'Jane Doe', '2025-01-10'),
      (3, 'Bob Wilson', '2025-01-15'),
      (4, 'Alice Brown', '2024-12-20'),
      (5, 'Charlie Davis', '2025-02-01');

  INSERT INTO sale (id, book_id, customer_id, sale_date, quantity) VALUES
      (1, 1, 1, '2025-01-01', 2),
      (2, 1, 2, '2025-01-15', 1),
      (3, 1, 3, '2025-02-01', 3),
      (4, 2, 2, '2025-01-20', 1),
      (5, 2, 3, '2025-02-05', 2),
      (6, 3, 4, '2025-01-10', 1),
      (7, 3, 5, '2025-02-10', 2),
      (8, 4, 1, '2025-01-05', 1);
  ```
---

The bookstore wants to analyze how their bestselling books are performing with new customers who joined after January 1st, 2025.

Given the following data in `book` table:

| id  | title           | price |
| --- | --------------- | ----- |
| 1   | SQL Basics      | 29.99 |
| 2   | Advanced SQL    | 49.99 |
| 3   | Data Science    | 39.99 |
| 4   | Web Development | 34.99 |

Following data in `customer` table:

| id  | name          | joined_date |
| --- | ------------- | ----------- |
| 1   | John Smith    | 2024-12-15  |
| 2   | Jane Doe      | 2025-01-10  |
| 3   | Bob Wilson    | 2025-01-15  |
| 4   | Alice Brown   | 2024-12-20  |
| 5   | Charlie Davis | 2025-02-01  |

Following data in `sale` table:

| id  | book_id | customer_id | sale_date  | quantity |
| --- | ------- | ----------- | ---------- | -------- |
| 1   | 1       | 1           | 2025-01-01 | 2        |
| 2   | 1       | 2           | 2025-01-15 | 1        |
| 3   | 1       | 3           | 2025-02-01 | 3        |
| 4   | 2       | 2           | 2025-01-20 | 1        |
| 5   | 2       | 3           | 2025-02-05 | 2        |
| 6   | 3       | 4           | 2025-01-10 | 1        |
| 7   | 3       | 5           | 2025-02-10 | 2        |
| 8   | 4       | 1           | 2025-01-05 | 1        |

Write a query using CTEs that shows the top 3 selling books and how many new customers (joined after `2025-01-01`) have purchased each book. Show:

- Book title
- Total quantity sold
- Number of new customers who bought the book

## Expected Output

| title        | total_sold | new_customer_count |
| ------------ | ---------- | ------------------ |
| SQL Basics   | 6          | 2                  |
| Advanced SQL | 3          | 2                  |
| Data Science | 3          | 1                  |

## Solution

```sql
WITH top_selling_books AS (
    -- Find the top 3 selling books
    SELECT
        book_id,
        SUM(quantity) AS total_sold
    FROM sale
    GROUP BY book_id
    ORDER BY SUM(quantity) DESC
    LIMIT 3
),
recent_customers AS (
    -- Find customers who joined after 2025-01-01
    SELECT id
    FROM customer
    WHERE joined_date > '2025-01-01'
)
SELECT
    b.title,
    tsb.total_sold,
    COUNT(DISTINCT s.customer_id) as new_customer_count
FROM top_selling_books tsb
INNER JOIN book b ON b.id = tsb.book_id
INNER JOIN sale s ON s.book_id = tsb.book_id
INNER JOIN recent_customers c ON c.id = s.customer_id
GROUP BY b.title, tsb.total_sold
ORDER BY tsb.total_sold DESC;
```
