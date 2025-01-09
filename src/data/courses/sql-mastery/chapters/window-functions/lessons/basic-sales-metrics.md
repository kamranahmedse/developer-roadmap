---
title: Basic Sales Metrics
description: Practice using basic window functions to analyze book sales
order: 120
type: challenge
setup: |
  ```sql
  CREATE TABLE sale (
      id INT PRIMARY KEY,
      book_title VARCHAR(100),
      category VARCHAR(50),
      sale_date DATE,
      quantity INT,
      price DECIMAL(10,2)
  );

  INSERT INTO sale (id, book_title, category, sale_date, quantity, price) VALUES
      (1, 'SQL Basics', 'Programming', '2024-01-15', 3, 29.99),
      (2, 'Advanced SQL', 'Programming', '2024-01-15', 2, 49.99),
      (3, 'Data Science', 'Data Analysis', '2024-01-15', 4, 39.99),
      (4, 'Web Development', 'Programming', '2024-01-16', 1, 34.99),
      (5, 'Statistics 101', 'Data Analysis', '2024-01-16', 2, 24.99),
      (6, 'Python Basics', 'Programming', '2024-01-16', 5, 29.99),
      (7, 'Machine Learning', 'Data Analysis', '2024-01-16', 2, 44.99);
  ```
---

The bookstore manager wants to compare each book's price with the average price in its category. This will help identify which books might be overpriced or underpriced within their categories.

Given the following data in table `sale`:

| id  | book_title       | category      | sale_date  | quantity | price |
| --- | ---------------- | ------------- | ---------- | -------- | ----- |
| 1   | SQL Basics       | Programming   | 2024-01-15 | 3        | 29.99 |
| 2   | Advanced SQL     | Programming   | 2024-01-15 | 2        | 49.99 |
| 3   | Data Science     | Data Analysis | 2024-01-15 | 4        | 39.99 |
| 4   | Web Development  | Programming   | 2024-01-16 | 1        | 34.99 |
| 5   | Statistics 101   | Data Analysis | 2024-01-16 | 2        | 24.99 |
| 6   | Python Basics    | Programming   | 2024-01-16 | 5        | 29.99 |
| 7   | Machine Learning | Data Analysis | 2024-01-16 | 2        | 44.99 |

Write a query that shows:

- Book title
- Category
- Price
- Average price for the book's category

Order the results by category (ascending) and price (descending).

## Expected Output

| book_title       | category      | price | category_avg |
| ---------------- | ------------- | ----- | ------------ |
| Machine Learning | Data Analysis | 44.99 | 36.66        |
| Data Science     | Data Analysis | 39.99 | 36.66        |
| Statistics 101   | Data Analysis | 24.99 | 36.66        |
| Advanced SQL     | Programming   | 49.99 | 36.24        |
| Web Development  | Programming   | 34.99 | 36.24        |
| Python Basics    | Programming   | 29.99 | 36.24        |
| SQL Basics       | Programming   | 29.99 | 36.24        |

## Solution

```sql
SELECT
    book_title,
    category,
    price,
    ROUND(AVG(price) OVER (
        PARTITION BY category
    ), 2) as category_avg
FROM sale
ORDER BY category, price DESC;
```
