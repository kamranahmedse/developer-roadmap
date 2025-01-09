---
title: Month-over-Month Sales
description: Practice using LAG to compare book sales between months
order: 170
type: challenge
setup: |
  ```sql
  CREATE TABLE sale (
      id INT PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      sale_month DATE,
      copies_sold INT,
      revenue DECIMAL(10,2)
  );

  INSERT INTO sale (id, title, category, sale_month, copies_sold, revenue) VALUES
      (1, 'SQL Basics', 'Programming', '2024-01-01', 150, 4497.00),
      (2, 'SQL Basics', 'Programming', '2024-02-01', 180, 5398.20),
      (3, 'SQL Basics', 'Programming', '2024-03-01', 160, 4798.40),
      (4, 'Data Science', 'Data Analysis', '2024-01-01', 120, 4798.80),
      (5, 'Data Science', 'Data Analysis', '2024-02-01', 140, 5598.60),
      (6, 'Data Science', 'Data Analysis', '2024-03-01', 130, 5198.70),
      (7, 'Python Basics', 'Programming', '2024-01-01', 200, 5998.00),
      (8, 'Python Basics', 'Programming', '2024-02-01', 190, 5698.10),
      (9, 'Python Basics', 'Programming', '2024-03-01', 220, 6597.80);
  ```
---

The bookstore manager wants to analyze month-over-month performance for each book. They need to see how sales and revenue change each month compared to the previous month.

Given the following data in table `sale`:

| id  | title         | category      | sale_month | copies_sold | revenue |
| --- | ------------- | ------------- | ---------- | ----------- | ------- |
| 1   | SQL Basics    | Programming   | 2024-01-01 | 150         | 4497.00 |
| 2   | SQL Basics    | Programming   | 2024-02-01 | 180         | 5398.20 |
| 3   | SQL Basics    | Programming   | 2024-03-01 | 160         | 4798.40 |
| 4   | Data Science  | Data Analysis | 2024-01-01 | 120         | 4798.80 |
| 5   | Data Science  | Data Analysis | 2024-02-01 | 140         | 5598.60 |
| 6   | Data Science  | Data Analysis | 2024-03-01 | 130         | 5198.70 |
| 7   | Python Basics | Programming   | 2024-01-01 | 200         | 5998.00 |
| 8   | Python Basics | Programming   | 2024-02-01 | 190         | 5698.10 |
| 9   | Python Basics | Programming   | 2024-03-01 | 220         | 6597.80 |

Write a query that shows:

- Book title
- Sale month
- Current month's copies sold
- Previous month's copies sold
- Sales change (current month minus previous month)
- Sales change percentage (rounded to 1 decimal place)

Order the results by title (ascending) and sale month (ascending).

> **Hint:** Use `LAG()` to access the previous month's sales, and `NULLIF()` to avoid division by zero when calculating percentages. For the `pct_change` column, you can use the following formula:
>
> ```
> (copies_sold - prev_month_copies_sold) / prev_month_copies_sold * 100
> ```

## Expected Output

| title         | sale_month | current_sales | prev_sales | sales_change | pct_change |
| ------------- | ---------- | ------------- | ---------- | ------------ | ---------- |
| Data Science  | 2024-01-01 | 120           | null       | null         | null       |
| Data Science  | 2024-02-01 | 140           | 120        | 20           | 16.7       |
| Data Science  | 2024-03-01 | 130           | 140        | -10          | -7.1       |
| Python Basics | 2024-01-01 | 200           | null       | null         | null       |
| Python Basics | 2024-02-01 | 190           | 200        | -10          | -5.0       |
| Python Basics | 2024-03-01 | 220           | 190        | 30           | 15.8       |
| SQL Basics    | 2024-01-01 | 150           | null       | null         | null       |
| SQL Basics    | 2024-02-01 | 180           | 150        | 30           | 20.0       |
| SQL Basics    | 2024-03-01 | 160           | 180        | -20          | -11.1      |

## Solution

```sql
SELECT
    title,
    sale_month,
    copies_sold as current_sales,
    LAG(copies_sold) OVER (
        PARTITION BY title
        ORDER BY sale_month
    ) as prev_sales,
    copies_sold - LAG(copies_sold) OVER (
        PARTITION BY title
        ORDER BY sale_month
    ) as sales_change,
    ROUND(
        ((copies_sold - LAG(copies_sold) OVER (
            PARTITION BY title
            ORDER BY sale_month
        )) * 100.0 / NULLIF(LAG(copies_sold) OVER (
            PARTITION BY title
            ORDER BY sale_month
        ), 0)),
        1
    ) as pct_change
FROM sale
ORDER BY title, sale_month;
```
