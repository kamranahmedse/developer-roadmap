---
title: Window Frames
description: Learn how to use window frames to control which rows are included in window calculations
order: 130
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE daily_sales (
    id SERIAL PRIMARY KEY,
    sale_date DATE,
    book_title VARCHAR(100),
    revenue DECIMAL(10, 2)
  );

  INSERT INTO daily_sales (sale_date, book_title, revenue) 
  VALUES 
    ('2024-01-15', 'The Great Gatsby', 249.90),
    ('2024-01-15', 'SQL Basics', 399.90),
    ('2024-01-16', '1984', 199.90),
    ('2024-01-16', 'Python Programming', 449.90),
    ('2024-01-17', 'Data Science', 499.90),
    ('2024-01-17', 'Web Development', 349.90),
    ('2024-01-18', 'The Hobbit', 299.90),
    ('2024-01-18', 'Pride and Prejudice', 149.90),
    ('2024-01-19', 'SQL Basics', 399.90),
    ('2024-01-19', 'Data Science', 499.90);
  ```
---

In our previous lessons, we learned about window functions and how they work. While we used `PARTITION BY` to group rows and `ORDER BY` to sequence them, we had no control over exactly which rows were included in our window calculations.

In this lesson, we'll explore window frames, which give us precise control over which rows are included in our window calculations by letting us specify ranges like "last 3 rows" or "next 7 rows".

## What is a Window Frame?

A window frame defines a subset of rows within a partition that should be considered for a window function's calculation. While `PARTITION BY` divides rows into groups and `ORDER BY` determines the sequence, window frames let us specify exactly which rows relative to the current row should be included in the calculation.

The basic syntax for a window frame is:

```sql
(ROWS | RANGE) BETWEEN frame_start AND frame_end
```

Where `frame_start` and `frame_end` can be:

- `UNBOUNDED PRECEDING`: Start from the first row of the partition
- `CURRENT ROW`: The current row being processed
- `n PRECEDING`: n rows before the current row
- `n FOLLOWING`: n rows after the current row
- `UNBOUNDED FOLLOWING`: End at the last row of the partition

Let's explore these concepts with practical examples.

## Running Totals with Window Frames

Let's calculate a running total of daily revenue:

```sql
SELECT
    sale_date,
    book_title,
    revenue,
    SUM(revenue) OVER (
        ORDER BY sale_date
        ROWS BETWEEN
            UNBOUNDED PRECEDING AND
            CURRENT ROW
    ) as running_total
FROM daily_sales
ORDER BY sale_date;
```

This gives us:

| sale_date  | book_title          | revenue | running_total |
| ---------- | ------------------- | ------- | ------------- |
| 2024-01-15 | The Great Gatsby    | 249.90  | 249.90        |
| 2024-01-15 | SQL Basics          | 399.90  | 649.80        |
| 2024-01-16 | 1984                | 199.90  | 849.70        |
| 2024-01-16 | Python Programming  | 449.90  | 1299.60       |
| 2024-01-17 | Data Science        | 499.90  | 1799.50       |
| 2024-01-17 | Web Development     | 349.90  | 2149.40       |
| 2024-01-18 | The Hobbit          | 299.90  | 2449.30       |
| 2024-01-18 | Pride and Prejudice | 149.90  | 2599.20       |
| 2024-01-19 | SQL Basics          | 399.90  | 2999.10       |
| 2024-01-19 | Data Science        | 499.90  | 3499.00       |

Let's break down how this works:

1. `ORDER BY sale_date` sorts the rows by date
2. `UNBOUNDED PRECEDING` starts from the first row
3. `CURRENT ROW` means include all rows up to the current row
4. For each row, `SUM` adds up all revenues from the first row to the current row

## Moving Averages

Window frames are particularly useful for calculating moving averages. Let's calculate a **3-day moving average** i.e. the average revenue for the current day and the previous 2 days:

```sql
SELECT
    sale_date,
    book_title,
    revenue,
    ROUND(AVG(revenue) OVER (
        ORDER BY sale_date
        ROWS BETWEEN
            2 PRECEDING AND
            CURRENT ROW
    ), 2) as moving_avg
FROM daily_sales
ORDER BY sale_date;
```

This produces:

| sale_date  | book_title          | revenue | moving_avg |
| ---------- | ------------------- | ------- | ---------- |
| 2024-01-15 | The Great Gatsby    | 249.90  | 249.90     |
| 2024-01-15 | SQL Basics          | 399.90  | 324.90     |
| 2024-01-16 | 1984                | 199.90  | 283.23     |
| 2024-01-16 | Python Programming  | 449.90  | 349.90     |
| 2024-01-17 | Data Science        | 499.90  | 383.23     |
| 2024-01-17 | Web Development     | 349.90  | 433.23     |
| 2024-01-18 | The Hobbit          | 299.90  | 383.23     |
| 2024-01-18 | Pride and Prejudice | 149.90  | 266.57     |
| 2024-01-19 | SQL Basics          | 399.90  | 283.23     |
| 2024-01-19 | Data Science        | 499.90  | 349.90     |

Let's analyze how this works:

1. `2 PRECEDING` means include up to 2 rows before the current row
2. `CURRENT ROW` means include the current row
3. For each row, `AVG` calculates the average of up to 3 rows (2 preceding + current)
4. Initial rows have fewer values to average since there aren't enough preceding rows

Here's a detailed breakdown of how the moving average is calculated for each row:

| Current Row                  | Calculation                    | Moving Average |
| ---------------------------- | ------------------------------ | -------------- |
| The Great Gatsby (249.90)    | 249.90 ÷ 1                     | 249.90         |
| SQL Basics (399.90)          | (249.90 + 399.90) ÷ 2          | 324.90         |
| 1984 (199.90)                | (249.90 + 399.90 + 199.90) ÷ 3 | 283.23         |
| Python Programming (449.90)  | (399.90 + 199.90 + 449.90) ÷ 3 | 349.90         |
| Data Science (499.90)        | (199.90 + 449.90 + 499.90) ÷ 3 | 383.23         |
| Web Development (349.90)     | (449.90 + 499.90 + 349.90) ÷ 3 | 433.23         |
| The Hobbit (299.90)          | (499.90 + 349.90 + 299.90) ÷ 3 | 383.23         |
| Pride and Prejudice (149.90) | (349.90 + 299.90 + 149.90) ÷ 3 | 266.57         |
| SQL Basics (399.90)          | (299.90 + 149.90 + 399.90) ÷ 3 | 283.23         |
| Data Science (499.90)        | (149.90 + 399.90 + 499.90) ÷ 3 | 349.90         |

As you can see, for each row, we take up to 2 preceding values plus the current value, add them together, and divide by the number of values included. The first two rows have fewer values to average since there aren't enough preceding rows available.

## RANGE vs ROWS

SQL provides two ways to define window frames:

- `ROWS`: Works with physical row numbers
- `RANGE`: Works with logical ranges of values

Let's see the difference with an example calculating daily totals:

```sql
-- Using ROWS
SELECT
    sale_date,
    book_title,
    revenue,
    SUM(revenue) OVER (
        ORDER BY sale_date
        -- Notice: ROWS BETWEEN
        ROWS BETWEEN
            CURRENT ROW AND
            1 FOLLOWING
    ) as next_day_total
FROM daily_sales
ORDER BY sale_date;

-- Using RANGE
SELECT
    sale_date,
    book_title,
    revenue,
    SUM(revenue) OVER (
        ORDER BY sale_date
        -- Notice: RANGE BETWEEN
        RANGE BETWEEN
            CURRENT ROW AND
            INTERVAL '1 day' FOLLOWING
    ) as next_day_total
FROM daily_sales
ORDER BY sale_date;
```

The key differences between `ROWS` and `RANGE` is that:

- `ROWS` considers the **given number of rows**
- `RANGE` considers the **logical range of values**. This is particularly useful with date/time and numeric ranges.

The output of the `ROWS` query above is:

| sale_date  | book_title          | revenue | next_day_total |
| ---------- | ------------------- | ------- | -------------- |
| 2024-01-15 | The Great Gatsby    | 249.90  | 649.80         |
| 2024-01-15 | SQL Basics          | 399.90  | 599.80         |
| 2024-01-16 | 1984                | 199.90  | 649.80         |
| 2024-01-16 | Python Programming  | 449.90  | 949.80         |
| 2024-01-17 | Data Science        | 499.90  | 849.80         |
| 2024-01-17 | Web Development     | 349.90  | 649.80         |
| 2024-01-18 | The Hobbit          | 299.90  | 449.80         |
| 2024-01-18 | Pride and Prejudice | 149.90  | 549.80         |
| 2024-01-19 | SQL Basics          | 399.90  | 899.80         |
| 2024-01-19 | Data Science        | 499.90  | 499.90         |

The way it is calculated is:

| Row                 | calculation     | next_day_total |
| ------------------- | --------------- | -------------- |
| 2024-01-15 (249.90) | 249.90 + 399.90 | 649.80         |
| 2024-01-15 (399.90) | 399.90 + 199.90 | 599.80         |
| 2024-01-16 (199.90) | 199.90 + 449.90 | 649.80         |
| 2024-01-16 (449.90) | 449.90 + 499.90 | 949.80         |
| 2024-01-17 (499.90) | 499.90 + 349.90 | 849.80         |
| 2024-01-17 (349.90) | 349.90 + 299.90 | 649.80         |
| 2024-01-18 (299.90) | 299.90 + 149.90 | 449.80         |
| 2024-01-18 (149.90) | 149.90 + 399.90 | 549.80         |
| 2024-01-19 (399.90) | 399.90 + 499.90 | 899.80         |
| 2024-01-19 (499.90) | 499.90 + 499.90 | 499.90         |

The output of the `RANGE` query above is:

| sale_date  | book_title          | revenue | next_day_total |
| ---------- | ------------------- | ------- | -------------- |
| 2024-01-15 | The Great Gatsby    | 249.90  | 1299.60        |
| 2024-01-15 | SQL Basics          | 399.90  | 1299.60        |
| 2024-01-16 | 1984                | 199.90  | 1499.60        |
| 2024-01-16 | Python Programming  | 449.90  | 1499.60        |
| 2024-01-17 | Data Science        | 499.90  | 1299.60        |
| 2024-01-17 | Web Development     | 349.90  | 1299.60        |
| 2024-01-18 | The Hobbit          | 299.90  | 1349.60        |
| 2024-01-18 | Pride and Prejudice | 149.90  | 1349.60        |
| 2024-01-19 | SQL Basics          | 399.90  | 899.80         |
| 2024-01-19 | Data Science        | 499.90  | 899.80         |

Because we are using `RANGE BETWEEN CURRENT ROW AND INTERVAL '1 day' FOLLOWING`, the calculation is done for each row based on the date range of the current row and the next day i.e. if the date of current row is `2024-01-15`, the calculation will include all rows which have dates between `2024-01-15` and `2024-01-16`.

Given the data, the calculation is done as follows:

| Row                 | Calculation                       | next_day_total |
| ------------------- | --------------------------------- | -------------- |
| 2024-01-15 (249.90) | 249.90 + 399.90 + 199.90 + 449.90 | 1299.60        |
| 2024-01-15 (399.90) | 399.90 + 249.90 + 199.90 + 449.90 | 1299.60        |
| 2024-01-16 (199.90) | 199.90 + 449.90 + 499.90 + 349.90 | 1499.60        |
| 2024-01-16 (449.90) | 449.90 + 199.90 + 499.90 + 349.90 | 1499.60        |
| 2024-01-17 (499.90) | 499.90 + 349.90 + 299.90 + 149.90 | 1299.60        |
| 2024-01-17 (349.90) | 349.90 + 499.90 + 299.90 + 149.90 | 1299.60        |
| 2024-01-18 (299.90) | 299.90 + 149.90 + 399.90 + 499.90 | 1349.60        |
| 2024-01-18 (149.90) | 149.90 + 299.90 + 399.90 + 499.90 | 1349.60        |
| 2024-01-19 (399.90) | 399.90 + 499.90                   | 899.80         |
| 2024-01-19 (499.90) | 499.90 + 399.90                   | 899.80         |

Notice how `RANGE` includes all rows within the next day, while `ROWS` only included the next single row. This is why the totals are higher with `RANGE` - it's summing all sales that occurred on the current and next day.

## Practical Use Cases

Here are some common scenarios where window frames are particularly useful:

- **Moving Averages**: Perfect for smoothing out data fluctuations. For example, calculating a 7-day moving average of sales to spot trends while reducing daily noise. This is commonly used in stock market analysis and sales forecasting

- **Running Totals**: Great for financial reports where you need to show how values accumulate over time. For instance, tracking cumulative revenue throughout a fiscal year or maintaining a running balance in a checkbook

- **Time-Based Analysis**: Using `RANGE` with date intervals is perfect for comparing current period with previous period (like month-over-month growth) and calculating rolling metrics (like "last 30 days" totals) or finding trends in time-series data.

- **Sliding Window Calculations**: Useful when you need to look at a fixed number of rows before and after each row. For example, finding unusual values by comparing each row with its neighbors or calculating percentage changes between consecutive periods

In the next lesson, we'll explore more advanced window function techniques and their real-world applications.
