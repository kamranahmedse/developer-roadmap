---
title: Monthly Sales Analysis
description: Practice using CASE expressions to analyze monthly book sales
order: 221
type: challenge
setup: |
  ```sql
  CREATE TABLE book_sale (
      id INT PRIMARY KEY,
      sale_date DATE,
      total_amount DECIMAL(10,2)
  );

  INSERT INTO book_sale (id, sale_date, total_amount) VALUES
      (1, '2024-01-15', 125.50),
      (2, '2024-01-28', 85.99),
      (3, '2024-02-03', 45.50),
      (4, '2024-02-14', 225.00),
      (5, '2024-02-28', 180.75),
      (6, '2024-03-05', 95.25),
      (7, '2024-03-15', 155.50),
      (8, '2024-03-30', 320.00);
  ```
---

The bookstore owner wants to analyze their sales data by month. They need a report showing monthly totals and sales performance.

Given the following data in table `book_sale`:

| sale_date  | total_amount |
| ---------- | ------------ |
| 2024-01-15 | 125.50       |
| 2024-01-28 | 85.99        |
| 2024-02-03 | 45.50        |
| 2024-02-14 | 225.00       |
| 2024-02-28 | 180.75       |
| 2024-03-05 | 95.25        |
| 2024-03-15 | 155.50       |
| 2024-03-30 | 320.00       |

Write a query that shows:

- Month (formatted as 'Month YYYY')
- Total sales for the month
- Performance category:
  - `Excellent` if monthly total > 500
  - `Good` if monthly total between 200 and 500
  - `Needs Improvement` if monthly total < 200

## Expected Output

| month         | total_sales | performance |
| ------------- | ----------- | ----------- |
| January 2024  | 211.49      | Good        |
| February 2024 | 451.25      | Good        |
| March 2024    | 570.75      | Excellent   |

## Solution

```sql
SELECT
    TO_CHAR(sale_date, 'Month YYYY') as month,
    SUM(total_amount) as total_sales,
    CASE
        WHEN SUM(total_amount) > 500 THEN 'Excellent'
        WHEN SUM(total_amount) >= 200 THEN 'Good'
        ELSE 'Needs Improvement'
    END as performance
FROM book_sale
GROUP BY TO_CHAR(sale_date, 'Month YYYY'), DATE_TRUNC('month', sale_date)
ORDER BY DATE_TRUNC('month', sale_date);
```
