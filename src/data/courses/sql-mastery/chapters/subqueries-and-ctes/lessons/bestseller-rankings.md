---
title: Bestseller Rankings
description: Practice using CTEs to rank books by their sales
order: 143
type: challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      sales_count INT
  );

  INSERT INTO book (id, title, category, price, sales_count) VALUES
      (1, 'SQL Basics', 'Programming', 29.99, 150),
      (2, 'Advanced SQL', 'Programming', 49.99, 100),
      (3, 'Data Science', 'Data Analysis', 39.99, 120),
      (4, 'Web Development', 'Programming', 34.99, 80),
      (5, 'Statistics 101', 'Data Analysis', 24.99, 200),
      (6, 'Machine Learning', 'Data Analysis', 44.99, 90);
  ```
---

The bookstore wants to create a bestseller list that shows each book's sales and its percentage contribution to total sales across all books.

Given the following data in table `book`:

| id  | title            | category      | price | sales_count |
| --- | ---------------- | ------------- | ----- | ----------- |
| 1   | SQL Basics       | Programming   | 29.99 | 150         |
| 2   | Advanced SQL     | Programming   | 49.99 | 100         |
| 3   | Data Science     | Data Analysis | 39.99 | 120         |
| 4   | Web Development  | Programming   | 34.99 | 80          |
| 5   | Statistics 101   | Data Analysis | 24.99 | 200         |
| 6   | Machine Learning | Data Analysis | 44.99 | 90          |

Write a query using a CTE that shows:

- Book title
- Sales count
- Percentage of total sales (rounded to 1 decimal place)

Sort the results by sales count in descending order.

## Expected Output

| title            | sales_count | sales_percentage |
| ---------------- | ----------- | ---------------- |
| Statistics 101   | 200         | 27.0             |
| SQL Basics       | 150         | 20.3             |
| Data Science     | 120         | 16.2             |
| Advanced SQL     | 100         | 13.5             |
| Machine Learning | 90          | 12.2             |
| Web Development  | 80          | 10.8             |

> **Note:** Each book's percentage is calculated as (book_sales / total_sales \* 100)

## Solution

```sql
WITH sales_total AS (
    SELECT SUM(sales_count) as total_sales
    FROM book
)
SELECT
    title,
    sales_count,
    ROUND(
        (CAST(sales_count AS DECIMAL) / total_sales * 100),
        1
    ) as sales_percentage
FROM book
CROSS JOIN sales_total
ORDER BY sales_count DESC;
```

This challenge requires you to:

1. Create a CTE to calculate the total sales across all books
2. Use the CTE to calculate each book's percentage of total sales
3. Format the results with proper rounding

The solution demonstrates:

- Basic CTE usage to store an intermediate calculation
- Cross join between the CTE and main table
- Percentage calculation with proper decimal handling

---
