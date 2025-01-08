---
title: What are they?
description: Learn about window functions and how they differ from regular aggregate functions
order: 100
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    employee_name VARCHAR(100),
    sale_date DATE,
    amount DECIMAL(10, 2)
  );

  INSERT INTO sale (id, employee_name, sale_date, amount) 
  VALUES 
    (1, 'John', '2024-01-15', 100.00),
    (2, 'Sarah', '2024-01-15', 150.00),
    (3, 'John', '2024-01-16', 200.00),
    (4, 'Mike', '2024-01-16', 125.00),
    (5, 'Sarah', '2024-01-16', 175.00),
    (6, 'John', '2024-01-17', 150.00),
    (7, 'Mike', '2024-01-17', 100.00),
    (8, 'Sarah', '2024-01-17', 200.00);
  ```
---

In our previous chapters, we learned about aggregate functions that can group rows and perform calculations like `SUM`, `AVG`, `COUNT`, etc. While these are powerful, they have a limitation: they reduce multiple rows into a single result row.

There are times when we want to perform calculations across multiple rows, but still keep the detail of each row. This is where window functions come in.

## What are Window Functions?

Window functions perform calculations across a set of table rows that are somehow related to the current row. Unlike regular aggregate functions that group rows into a single output row, window functions return a single result for each row.

> Aggregate functions are used to group rows into a single output row. Window functions allow us to perform group calculations without grouping rows into a single output row.

Let's understand this with an example. Consider this `sale` table:

| id  | employee_name | sale_date  | amount |
| --- | ------------- | ---------- | ------ |
| 1   | John          | 2024-01-15 | 100.00 |
| 2   | Sarah         | 2024-01-15 | 150.00 |
| 3   | John          | 2024-01-16 | 200.00 |
| 4   | Mike          | 2024-01-16 | 125.00 |
| 5   | Sarah         | 2024-01-16 | 175.00 |
| 6   | John          | 2024-01-17 | 150.00 |
| 7   | Mike          | 2024-01-17 | 100.00 |
| 8   | Sarah         | 2024-01-17 | 200.00 |

Considering what we have learnt so far in this course, if we want to see **each sale along with the employee's total sales**, we could do this either by using a Common Table Expression (CTE):

```sql
WITH total_sales AS (
    SELECT
        employee_name,
        SUM(amount) as total_sales
    FROM sale
    GROUP BY employee_name
)
SELECT
    s.employee_name,
    s.sale_date,
    s.amount,
    total.total_sales
FROM
    sale s
INNER JOIN
    total_sales total ON s.employee_name = total.employee_name;
```

Or, by using a subquery:

```sql
SELECT
    s.employee_name,
    s.sale_date,
    s.amount,
    total.total_sales
FROM
    sale s
INNER JOIN (
    SELECT
        employee_name,
        SUM(amount) as total_sales
    FROM sale
    GROUP BY employee_name
) total ON s.employee_name = total.employee_name
ORDER BY s.sale_date, s.employee_name;
```

But with a window function, we can do this much more elegantly:

```sql
SELECT
    employee_name,
    sale_date,
    amount,
    SUM(amount) OVER (PARTITION BY employee_name) as total_sales
FROM sale
ORDER BY sale_date, employee_name;
```

All three queries above will produce the same result:

| employee_name | sale_date  | amount | total_sales |
| ------------- | ---------- | ------ | ----------- |
| John          | 2024-01-15 | 100.00 | 450.00      |
| Sarah         | 2024-01-15 | 150.00 | 525.00      |
| John          | 2024-01-16 | 200.00 | 450.00      |
| Mike          | 2024-01-16 | 125.00 | 225.00      |
| Sarah         | 2024-01-16 | 175.00 | 525.00      |
| John          | 2024-01-17 | 150.00 | 450.00      |
| Mike          | 2024-01-17 | 100.00 | 225.00      |
| Sarah         | 2024-01-17 | 200.00 | 525.00      |

Looking at the result, we can see that:

- Each row shows the individual sale `amount`
- The `total_sales` column shows the employee's total sales
- We didn't need a complex JOIN
- The window function preserved all rows while calculating totals

> Don't worry about the syntax of the query and how it works for now. We'll explore it in detail in the upcoming lessons.

## Basic Syntax

The basic syntax for a window function is:

```sql
window_function OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
    [frame_clause]
)
```

Where:

- `window_function` is the function to apply (e.g., `SUM`, `AVG`, `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, etc.)
- `PARTITION BY` divides rows into groups (optional)
- `ORDER BY` defines the order of rows within each partition (optional)
- `frame_clause` defines which rows to include in the calculation (optional)

We'll explore each of these components in detail in the upcoming lessons.

## Types of Window Functions

Window functions can be categorized into several types:

| Type                         | Functions                                  | Description                                               |
| ---------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| Aggregate Window Functions   | `SUM`, `AVG`, `COUNT`, `MIN`, `MAX`        | Like regular aggregate functions but operate over windows |
| Ranking Window Functions     | `ROW_NUMBER`, `RANK`, `DENSE_RANK`         | Assign rankings to rows within partitions                 |
| Value Window Functions       | `FIRST_VALUE`, `LAST_VALUE`, `LAG`, `LEAD` | Access values from other rows within the partition        |
| Statistical Window Functions | `PERCENT_RANK`, `CUME_DIST`                | Calculate statistical metrics across rows                 |

We'll explore each type in detail in the upcoming lessons. For now, focus on understanding that window functions allow us to perform calculations across rows while keeping the detail of each row.
