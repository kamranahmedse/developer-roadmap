---
title: Daily Sales Report
description: Practice using recursive CTEs to generate dates and analyze daily sales
order: 145
type: challenge
setup: |
  ```sql
  CREATE TABLE sale (
      id INT PRIMARY KEY,
      sale_date DATE,
      amount DECIMAL(10,2)
  );

  INSERT INTO sale (id, sale_date, amount) VALUES
      (1, '2025-01-01', 99.99),
      (2, '2025-01-01', 149.99),
      (3, '2025-01-03', 49.99),
      (4, '2025-01-05', 199.99),
      (5, '2025-01-05', 29.99),
      (6, '2025-01-08', 79.99),
      (7, '2025-01-10', 159.99),
      (8, '2025-01-15', 89.99),
      (9, '2025-01-15', 199.99);
  ```
---

The bookstore manager wants a complete daily sales report for the first half of January 2025, including days with no sales. This will help identify patterns in daily sales performance.

Given the following data in table `sale`:

| id | sale_date  | amount |
| -- | ---------- | ------ |
| 1  | 2025-01-01 | 99.99  |
| 2  | 2025-01-01 | 149.99 |
| 3  | 2025-01-03 | 49.99  |
| 4  | 2025-01-05 | 199.99 |
| 5  | 2025-01-05 | 29.99  |
| 6  | 2025-01-08 | 79.99  |
| 7  | 2025-01-10 | 159.99 |
| 8  | 2025-01-15 | 89.99  |
| 9  | 2025-01-15 | 199.99 |

Write a query using a recursive CTE that shows:

- Date (from January 1st to January 15th, 2025)
- Number of sales for that date
- Total amount of sales for that date

Include all dates in the range, even if there were no sales (show 0 for those days).

## Expected Output

| date       | sale_count | total_amount |
| ---------- | ---------- | ------------ |
| 2025-01-01 | 2          | 249.98       |
| 2025-01-02 | 0          | 0.00         |
| 2025-01-03 | 1          | 49.99        |
| 2025-01-04 | 0          | 0.00         |
| 2025-01-05 | 2          | 229.98       |
| 2025-01-06 | 0          | 0.00         |
| 2025-01-07 | 0          | 0.00         |
| 2025-01-08 | 1          | 79.99        |
| 2025-01-09 | 0          | 0.00         |
| 2025-01-10 | 1          | 159.99       |
| 2025-01-11 | 0          | 0.00         |
| 2025-01-12 | 0          | 0.00         |
| 2025-01-13 | 0          | 0.00         |
| 2025-01-14 | 0          | 0.00         |
| 2025-01-15 | 2          | 289.98       |

## Solution

```sql
WITH RECURSIVE date_range AS (
    -- Base case: start with January 1st
    SELECT DATE '2025-01-01' as date
    
    UNION ALL
    
    -- Recursive case: add one day until January 15th
    SELECT date + 1
    FROM date_range
    WHERE date < DATE '2025-01-15'
)
SELECT 
    date_range.date,
    COUNT(s.id) as sale_count,
    COALESCE(SUM(s.amount), 0.00) as total_amount
FROM date_range
LEFT JOIN sale s ON s.sale_date = date_range.date
GROUP BY date_range.date
ORDER BY date_range.date;
```