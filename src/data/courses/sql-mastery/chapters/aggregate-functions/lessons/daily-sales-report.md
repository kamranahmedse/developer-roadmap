---
title: Daily Sales Report
description: Practice using GROUP BY with aggregate functions
order: 95
type: challenge
setup: |
  ```sql
  CREATE TABLE daily_sale (
      id INT PRIMARY KEY,
      sale_date DATE,
      book_title VARCHAR(255),
      quantity INT,
      price DECIMAL(10,2)
  );

  INSERT INTO daily_sale (id, sale_date, book_title, quantity, price)
  VALUES 
      (1, '2024-01-15', 'The Great Gatsby', 2, 19.99),
      (2, '2024-01-15', 'Pride and Prejudice', 1, 14.99),
      (3, '2024-01-15', '1984', 3, 12.99),
      (4, '2024-01-16', 'The Hobbit', 2, 24.99),
      (5, '2024-01-16', 'The Great Gatsby', 1, 19.99),
      (6, '2024-01-17', 'Pride and Prejudice', 2, 14.99),
      (7, '2024-01-17', '1984', 1, 12.99),
      (8, '2024-01-17', 'The Hobbit', 3, 24.99);
  ```
---

The bookstore manager wants to see how their sales are performing each day. They need a daily report showing:
- The number of transactions per day
- Total books sold per day
- Total revenue per day

Given the following data in table `daily_sale`:

| id  | sale_date  | book_title         | quantity | price |
| --- | ---------- | ------------------ | -------- | ----- |
| 1   | 2024-01-15 | The Great Gatsby   | 2        | 19.99 |
| 2   | 2024-01-15 | Pride and Prejudice| 1        | 14.99 |
| 3   | 2024-01-15 | 1984               | 3        | 12.99 |
| 4   | 2024-01-16 | The Hobbit         | 2        | 24.99 |
| 5   | 2024-01-16 | The Great Gatsby   | 1        | 19.99 |
| 6   | 2024-01-17 | Pride and Prejudice| 2        | 14.99 |
| 7   | 2024-01-17 | 1984               | 1        | 12.99 |
| 8   | 2024-01-17 | The Hobbit         | 3        | 24.99 |

Write a query that shows the daily sales metrics:
- Date
- Number of transactions that day
- Total books sold that day
- Total revenue for that day

Order the results by date.

## Expected Output

| sale_date  | transactions | books_sold | daily_revenue |
| ---------- | ------------ | ---------- | ------------- |
| 2024-01-15 | 3            | 6          | 84.93         |
| 2024-01-16 | 2            | 3          | 69.97         |
| 2024-01-17 | 3            | 6          | 107.94        |

## Solution

```sql
SELECT 
    sale_date,
    COUNT(*) as transactions,
    SUM(quantity) as books_sold,
    SUM(quantity * price) as daily_revenue
FROM daily_sale
GROUP BY sale_date
ORDER BY sale_date;
```

### Explanation

Let's break down how this query works:

First, we specify the columns we want to see:
```sql
sale_date, -- The date we're grouping by
COUNT(*) as transactions, -- Count of sales for each date
SUM(quantity) as books_sold, -- Total books sold each date
SUM(quantity * price) as daily_revenue -- Total revenue each date
```

We group the results by date to get daily totals:
```sql
GROUP BY sale_date
```

Finally, we order the results by date:
```sql
ORDER BY sale_date
```