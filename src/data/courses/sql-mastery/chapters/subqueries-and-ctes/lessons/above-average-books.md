---
title: Above Average Books
description: Practice using scalar subqueries to find books above average price in their category
order: 140
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      published_date DATE
  );

  INSERT INTO book (id, title, category, price, published_date) VALUES
      (1, 'SQL Basics', 'Programming', 29.99, '2024-01-15'),
      (2, 'Advanced SQL', 'Programming', 49.99, '2024-02-20'),
      (3, 'Data Science', 'Data Analysis', 39.99, '2024-01-10'),
      (4, 'Web Development', 'Programming', 34.99, '2024-03-01'),
      (5, 'Statistics 101', 'Data Analysis', 24.99, '2024-02-15'),
      (6, 'Machine Learning', 'Data Analysis', 44.99, '2024-03-15'),
      (7, 'Database Design', 'Programming', 39.99, '2024-01-20'),
      (8, 'Python Basics', 'Programming', 29.99, '2024-02-01');
  ```
---

The bookstore manager wants to identify books that are priced above the average price in their respective categories, but only for books published in 2024. This information will help in adjusting pricing strategies.

Given the following data in table `book`:

| id  | title            | category      | price | published_date |
| --- | ---------------- | ------------- | ----- | -------------- |
| 1   | SQL Basics       | Programming   | 29.99 | 2024-01-15     |
| 2   | Advanced SQL     | Programming   | 49.99 | 2024-02-20     |
| 3   | Data Science     | Data Analysis | 39.99 | 2024-01-10     |
| 4   | Web Development  | Programming   | 34.99 | 2024-03-01     |
| 5   | Statistics 101   | Data Analysis | 24.99 | 2024-02-15     |
| 6   | Machine Learning | Data Analysis | 44.99 | 2024-03-15     |
| 7   | Database Design  | Programming   | 39.99 | 2024-01-20     |
| 8   | Python Basics    | Programming   | 29.99 | 2024-02-01     |

Write a query that shows:

- Book title
- Category
- Book price
- Category average price (rounded to 2 decimal places)
- Price difference from category average (rounded to 2 decimal places)

Only include books that are:

1. Published in 2024
2. Priced above their category's average price

## Expected Output

| title            | category      | price | category_avg | price_diff |
| ---------------- | ------------- | ----- | ------------ | ---------- |
| Machine Learning | Data Analysis | 44.99 | 36.66        | 8.33       |
| Data Science     | Data Analysis | 39.99 | 36.66        | 3.33       |
| Advanced SQL     | Programming   | 49.99 | 36.99        | 13.00      |
| Database Design  | Programming   | 39.99 | 36.99        | 3.00       |

## Solution

```sql
SELECT
    b1.title,
    b1.category,
    b1.price,
    ROUND(avg_price, 2) AS category_avg,
    ROUND(b1.price - avg_price, 2) AS price_diff
FROM book b1
INNER JOIN (
    -- Subquery to calculate average price per category for 2024
    SELECT
        category,
        AVG(price) AS avg_price
    FROM book
    WHERE EXTRACT(YEAR FROM published_date) = 2024
    GROUP BY category
) AS ca ON b1.category = ca.category
WHERE
    EXTRACT(YEAR FROM b1.published_date) = 2024 -- Filter for books published in 2024
    AND b1.price > ca.avg_price                 -- Filter books above category average
ORDER BY
    b1.category, price_diff DESC;               -- Sort results
```
