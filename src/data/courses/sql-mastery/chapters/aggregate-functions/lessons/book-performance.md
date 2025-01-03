---
title: Book Performance
description: Practice using aggregate functions with temporal data and joins
order: 120
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      category VARCHAR(100),
      release_date DATE
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      book_id INT,
      sale_timestamp TIMESTAMP,
      quantity INT,
      unit_price DECIMAL(10,2)
  );

  INSERT INTO book (id, title, category, release_date) VALUES
      (1, 'The Great Gatsby', 'Fiction', '2024-01-01'),
      (2, 'SQL Mastery', 'Technical', '2024-01-15'),
      (3, 'Data Science 101', 'Technical', '2024-02-01'),
      (4, 'Pride and Prejudice', 'Fiction', '2024-02-15');

  INSERT INTO sale (id, book_id, sale_timestamp, quantity, unit_price) VALUES
      (1, 1, '2024-02-01 10:30:00', 2, 19.99),
      (2, 1, '2024-02-15 14:20:00', 1, 19.99),
      (3, 2, '2024-02-01 11:15:00', 3, 29.99),
      (4, 2, '2024-02-20 16:45:00', 2, 29.99),
      (5, 3, '2024-02-05 09:30:00', 1, 24.99),
      (6, 3, '2024-02-25 13:20:00', 2, 24.99),
      (7, 4, '2024-02-15 15:45:00', 1, 14.99),
      (8, 4, '2024-02-28 10:10:00', 3, 14.99);
  ```
---

The bookstore manager wants to analyze book performance for February 2024. They need a report showing how each book performed during that month, including details about when the book was released.

Given the following data in table `book`:

| id  | title               | category  | release_date |
| --- | ------------------- | --------- | ------------ |
| 1   | The Great Gatsby    | Fiction   | 2024-01-01   |
| 2   | SQL Mastery         | Technical | 2024-01-15   |
| 3   | Data Science 101    | Technical | 2024-02-01   |
| 4   | Pride and Prejudice | Fiction   | 2024-02-15   |

And the following data in table `sale`:

| id  | book_id | sale_timestamp      | quantity | unit_price |
| --- | ------- | ------------------- | -------- | ---------- |
| 1   | 1       | 2024-02-01 10:30:00 | 2        | 19.99      |
| 2   | 1       | 2024-02-15 14:20:00 | 1        | 19.99      |
| 3   | 2       | 2024-02-01 11:15:00 | 3        | 29.99      |
| 4   | 2       | 2024-02-20 16:45:00 | 2        | 29.99      |
| 5   | 3       | 2024-02-05 09:30:00 | 1        | 24.99      |
| 6   | 3       | 2024-02-25 13:20:00 | 2        | 24.99      |
| 7   | 4       | 2024-02-15 15:45:00 | 1        | 14.99      |
| 8   | 4       | 2024-02-28 10:10:00 | 3        | 14.99      |

Write a query that shows:

- Book title
- Category
- Whether the book was released in February (show as 'New Release' or 'Existing')
- Total quantity sold
- Total revenue
- Number of sales transactions

Only include books that had sales in February 2024, and order the results by total revenue in descending order.

## Expected Output

| title               | category  | release_status | total_quantity | total_revenue | sale_count |
| ------------------- | --------- | -------------- | -------------- | ------------- | ---------- |
| SQL Mastery         | Technical | Existing       | 5              | 149.95        | 2          |
| Data Science 101    | Technical | New Release    | 3              | 74.97         | 2          |
| The Great Gatsby    | Fiction   | Existing       | 3              | 59.97         | 2          |
| Pride and Prejudice | Fiction   | New Release    | 4              | 59.96         | 2          |

## Solution

```sql
SELECT
    b.title,
    b.category,
    CASE
        WHEN EXTRACT(MONTH FROM b.release_date) = 2 THEN 'New Release'
        ELSE 'Existing'
    END as release_status,
    SUM(s.quantity) as total_quantity,
    SUM(s.quantity * s.unit_price) as total_revenue,
    COUNT(*) as sale_count
FROM book b
INNER JOIN sale s ON b.id = s.book_id
WHERE
    EXTRACT(MONTH FROM s.sale_timestamp) = 2
    AND EXTRACT(YEAR FROM s.sale_timestamp) = 2024
GROUP BY
    b.title,
    b.category,
    CASE
        WHEN EXTRACT(MONTH FROM b.release_date) = 2 THEN 'New Release'
        ELSE 'Existing'
    END
ORDER BY total_revenue DESC;
```

### Explanation

Let's break down how this query works:

First, we join the tables to get book information with sales:

```sql
FROM book b
INNER JOIN sale s ON b.id = s.book_id
```

We filter for February 2024 sales:

```sql
WHERE
    EXTRACT(MONTH FROM s.sale_timestamp) = 2
    AND EXTRACT(YEAR FROM s.sale_timestamp) = 2024
```

We use a CASE statement to identify new releases:

```sql
CASE
    WHEN EXTRACT(MONTH FROM b.release_date) = 2 THEN 'New Release'
    ELSE 'Existing'
END as release_status
```

We calculate aggregates for each book:

```sql
SUM(s.quantity) as total_quantity,
SUM(s.quantity * s.unit_price) as total_revenue,
COUNT(*) as sale_count
```

Finally, we group by the necessary columns and order by revenue:

```sql
GROUP BY
    b.title,
    b.category,
    CASE
        WHEN EXTRACT(MONTH FROM b.release_date) = 2 THEN 'New Release'
        ELSE 'Existing'
    END
ORDER BY total_revenue DESC
```
