---
title: Date Functions
description: Learn how to manipulate and format dates using SQL date functions
order: 130
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
      sale_id SERIAL PRIMARY KEY,
      sale_date DATE NOT NULL,
      amount NUMERIC NOT NULL
  );

  INSERT INTO sale (sale_date, amount) VALUES
    ('2024-01-01', 100),
    ('2024-02-02', 200),
    ('2024-01-03', 300), 
    ('2024-03-04', 400),
    ('2024-01-05', 500),
    ('2024-05-06', 600),
    ('2024-03-07', 700),
    ('2024-02-08', 800),
    ('2024-01-09', 900),
    ('2024-05-10', 1000);
  ```
---

Date functions help you work with temporal data in SQL. These functions are essential for handling dates in reports, analyzing time-based data, and managing date-related business logic.

We have already seen some date functions in the previous lessons, but let's look at some more examples in this lesson.

## Extracting Date Parts

Often you need to extract specific parts of a date (like year or month) for analysis or grouping:

```sql
-- Get year from date
SELECT EXTRACT(YEAR FROM DATE '2024-03-15');    -- Returns: 2024

-- Get month from date
SELECT EXTRACT(MONTH FROM DATE '2024-03-15');   -- Returns: 3

-- Get day from date
SELECT EXTRACT(DAY FROM DATE '2024-03-15');     -- Returns: 15

-- Get quarter
SELECT EXTRACT(QUARTER FROM DATE '2024-03-15'); -- Returns: 1
```

## Date Formatting

Converting dates to strings in specific formats is common for reporting and display purposes:

```sql
-- Format date as "Month DD, YYYY"
SELECT TO_CHAR(DATE '2024-03-15', 'Month DD, YYYY');
-- Returns: March 15, 2024

-- Format as "MM/DD/YY"
SELECT TO_CHAR(DATE '2024-03-15', 'MM/DD/YY');
-- Returns: 03/15/24
```

> `DATE` keyword in the `DATE '2024-03-15'` is used to explicitly specify that the value being passed to the function is a date.

## Adding and Subtracting Dates

Date arithmetic is essential for calculating durations and future/past dates:

```sql
-- Add days to date
SELECT DATE '2024-03-15' + INTEGER '5';
-- Returns: 2024-03-20

-- Subtract days from date
SELECT DATE '2024-03-15' - INTEGER '5';
-- Returns: 2024-03-10

-- Add days to date
SELECT DATE '2024-03-15' + INTERVAL '5 days';
-- Returns: 2024-03-20

-- Adding interval to date
SELECT DATE '2024-03-15' + INTERVAL '1 year 2 months 3 days';
-- Returns: 2025-05-17

-- Add months to date
SELECT DATE '2024-03-15' + INTERVAL '2 months';
-- Returns: 2024-05-15

-- Using INTERVAL for complex subtractions
SELECT DATE '2024-03-15' - INTERVAL '2 weeks 3 days';
-- Returns: 2024-02-27

-- Combining multiple intervals
SELECT DATE '2024-03-15' + INTERVAL '1 month' + INTERVAL '14 days';
-- Returns: 2024-04-28

-- Using INTERVAL with hours (converts to timestamp)
SELECT DATE '2024-03-15' + INTERVAL '2 days 12 hours';
-- Returns: 2024-03-17 12:00:00
```

## Date Differences

Calculating the time between dates is a common requirement:

```sql
-- Get days between dates
SELECT DATE '2024-03-15' - DATE '2024-03-10';
-- Returns: 5

-- Get difference between two dates
SELECT AGE(DATE '2025-01-04', DATE '1992-07-25');
-- Returns: 32 years 5 months 18 days
-- Output is in INTERVAL format

-- Extract year from INTERVAL
SELECT EXTRACT(YEAR FROM AGE(DATE '2025-01-04', DATE '1992-07-25')) - 1;
-- Returns: 31
```

> **Note:** `AGE` is a PostgreSQL specific function.

## Current Date and Time

SQL provides functions to get the current date and time:

```sql
-- Get current date
SELECT CURRENT_DATE;

-- Get current timestamp
SELECT CURRENT_TIMESTAMP;

-- Get current time
SELECT CURRENT_TIME;
```

## Practical Examples

Let's look at some real-world examples that combine multiple date functions. We'll use the following `sale` table:

| sale_id | sale_date  | amount |
| ------- | ---------- | ------ |
| 1       | 2024-01-01 | 100    |
| 2       | 2024-02-02 | 200    |
| 3       | 2024-01-03 | 300    |
| 4       | 2024-03-04 | 400    |
| 5       | 2024-01-05 | 500    |
| 6       | 2024-05-06 | 600    |
| 7       | 2024-03-07 | 700    |
| 8       | 2024-02-08 | 800    |
| 9       | 2024-01-09 | 900    |
| 10      | 2024-05-10 | 1000   |

### Time Since Sale

To calculate the time since a sale, we can use the `AGE` function.

```sql
-- Format sale dates and calculate time since sale
SELECT
    sale_id,
    TO_CHAR(sale_date, 'Month DD, YYYY') as formatted_date,
    AGE(CURRENT_DATE, sale_date) as time_since_sale
FROM sale;
```

It will show the time since the sale in the format of `years months days`.

### Sales by Month

To group sales by month, we can use the `EXTRACT` function.

```sql
-- Group sales by month
SELECT
    EXTRACT(MONTH FROM sale_date) as month,
    COUNT(*) as sale_count,
    SUM(amount) as total_amount
FROM sale
GROUP BY EXTRACT(MONTH FROM sale_date)
ORDER BY month;
```

### Sales from Current Month

To find sales from the current month, we can use the `EXTRACT` function.

```sql
-- Find sales from current month
SELECT *
FROM sale
WHERE EXTRACT(MONTH FROM sale_date) = EXTRACT(MONTH FROM CURRENT_DATE)
AND EXTRACT(YEAR FROM sale_date) = EXTRACT(YEAR FROM CURRENT_DATE);
```

### Date Filtering

When working with date ranges in reports or analysis:

```sql
-- Sales from last 30 days
SELECT *
FROM sale
WHERE sale_date >= CURRENT_DATE - INTEGER '30';

-- Sales between two dates
SELECT *
FROM sale
WHERE sale_date BETWEEN DATE '2024-01-01' AND DATE '2024-12-31';
```

### Date Bucketing

Grouping data by time periods is common in reporting:

```sql
-- Sales by quarter
SELECT
    EXTRACT(YEAR FROM sale_date) as year,
    EXTRACT(QUARTER FROM sale_date) as quarter,
    SUM(amount) as total_sales
FROM sale
GROUP BY
    EXTRACT(YEAR FROM sale_date),
    EXTRACT(QUARTER FROM sale_date)
ORDER BY year, quarter;
```

### Age Calculations

Calculating ages or durations:

```sql
-- Calculate customer age
SELECT
    customer_name,
    date_of_birth,
    extract(year from age(current_date, date_of_birth)) as age
FROM customers;
```

> **Note**: While date functions are available in all major SQL databases, the syntax and function names can vary significantly. For example, Oracle uses `ADD_MONTHS` for adding months, while PostgreSQL uses the `INTERVAL` type. Some databases use `DATEADD` instead of the `+` operator. Always check your database's documentation for the exact syntax.

In the next lesson, we'll explore conversion functions for transforming data between different types.
