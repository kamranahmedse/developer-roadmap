---
title: Grouping and Filtering
description: Learn about filtering grouped data with HAVING, DISTINCT aggregation, and conditional aggregation
order: 130
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id SERIAL PRIMARY KEY,
    sale_date DATE,
    amount DECIMAL(10, 2),
    category TEXT,
    store_location TEXT
  );

  INSERT INTO sale (sale_date, amount, category, store_location) 
  VALUES 
    ('2024-01-15', 29.99, 'Fiction', 'Downtown'),
    ('2024-01-15', 19.99, 'Non-Fiction', 'Suburb'),
    ('2024-01-16', 24.99, 'Fiction', 'Downtown'),
    ('2024-01-16', 39.99, 'Technical', 'Suburb'),
    ('2024-01-16', 14.99, 'Fiction', 'Downtown'),
    ('2024-01-17', 49.99, 'Technical', 'Downtown'),
    ('2024-01-17', 27.99, 'Non-Fiction', 'Airport'),
    ('2024-01-17', 22.99, 'Fiction', 'Downtown'),
    ('2024-01-18', 17.99, 'Non-Fiction', 'Suburb'),
    ('2024-01-18', 34.99, 'Technical', 'Airport');
  ```
---

In our previous lesson, we learned about grouping data using `GROUP BY`. While grouping is powerful on its own, it becomes even more useful when combined with filtering.

In this lesson, we'll learn about filtering grouped data using the `HAVING` clause and explore other advanced grouping patterns.

## The HAVING Clause

The `HAVING` clause allows us to filter groups based on aggregate values. Think of it as a `WHERE` clause for grouped data.

The basic syntax is:

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1
HAVING condition;
```

Let's look at some examples using our bookstore `sale` table:

| id  | sale_date  | amount | category    | store_location |
| --- | ---------- | ------ | ----------- | -------------- |
| 1   | 2024-01-15 | 29.99  | Fiction     | Downtown       |
| 2   | 2024-01-15 | 19.99  | Non-Fiction | Suburb         |
| 3   | 2024-01-16 | 24.99  | Fiction     | Downtown       |
| 4   | 2024-01-16 | 39.99  | Technical   | Suburb         |
| 5   | 2024-01-16 | 14.99  | Fiction     | Downtown       |
| 6   | 2024-01-17 | 49.99  | Technical   | Downtown       |
| 7   | 2024-01-17 | 27.99  | Non-Fiction | Airport        |
| 8   | 2024-01-17 | 22.99  | Fiction     | Downtown       |
| 9   | 2024-01-18 | 17.99  | Non-Fiction | Suburb         |
| 10  | 2024-01-18 | 34.99  | Technical   | Airport        |

### Example 1: Finding Categories with High Sales

Let's find categories where total sales exceed $75. Your initial instinct might to be to write the following query:

```sql
-- ERROR: WHERE cannot use aggregate functions
SELECT
    category,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
WHERE SUM(amount) > 75;

-- ERROR: SELECT aliases cannot be used in WHERE
SELECT
    category,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
WHERE total_sales > 75;
```

Both of the above queries will result in an error because as we learned in the previous lesson, `WHERE` filters rows before they are grouped so neither `SUM(amount)` nor `total_sales` are available.

To fix this, we can use the `HAVING` clause which filters groups after they are formed.

```sql
SELECT
    category,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
HAVING SUM(amount) > 75;
```

The output will be only categories with total sales greater than $75:

| category  | total_sales |
| --------- | ----------- |
| Fiction   | 92.96       |
| Technical | 124.97      |

### Example 2: Finding Busy Store Locations

Let's find store locations with more than 3 sales:

```sql
SELECT
    store_location,
    COUNT(*) as sale_count
FROM sale
GROUP BY store_location
HAVING COUNT(*) > 3;
```

The output shows locations with more than 3 sales:

| store_location | sale_count |
| -------------- | ---------- |
| Downtown       | 5          |

## WHERE vs HAVING

While both `WHERE` and `HAVING` are used for filtering, they serve different purposes:

- `WHERE` filters individual rows **before** they're grouped
- `HAVING` filters groups **after** they're formed

Let's see this difference in action:

### Example: Sales Above $25

Using `WHERE` (filters rows **before** grouping):

```sql
SELECT
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
WHERE amount > 25
GROUP BY category;
```

This shows the count and sum of only sales above $25:

| category    | sale_count | total_sales |
| ----------- | ---------- | ----------- |
| Fiction     | 1          | 29.99       |
| Non-Fiction | 1          | 27.99       |
| Technical   | 3          | 124.97      |

Using `HAVING` (filters groups **after** aggregation). For example, let's find the categories where the average sale amount is above $25:

```sql
SELECT
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
HAVING AVG(amount) > 25;
```

This shows categories where the average sale amount is above $25:

| category  | sale_count | total_sales |
| --------- | ---------- | ----------- |
| Technical | 3          | 124.97      |

### Using Both WHERE and HAVING

You can use both `WHERE` and `HAVING` in the same query. For example, let's find categories that had more than `2` sales in `Downtown` stores:

```sql
SELECT
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
WHERE store_location = 'Downtown'
GROUP BY category
HAVING COUNT(*) > 2;
```

The output shows categories with more than 2 sales in Downtown:

| category | sale_count | total_sales |
| -------- | ---------- | ----------- |
| Fiction  | 4          | 92.96       |

Let's look at another example to find the top 2 locations by total sales:

```sql
SELECT
    store_location,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY store_location
ORDER BY total_sales DESC
LIMIT 2;
```

This shows the top 2 locations by total sales:

| store_location | sale_count | total_sales |
| -------------- | ---------- | ----------- |
| Downtown       | 5          | 142.95      |
| Suburb         | 3          | 77.97       |

## Important Rules and Gotchas

You should keep the following rules in mind when working with `GROUP BY` and `HAVING`:

### HAVING requires GROUP BY

You can't use `HAVING` without `GROUP BY` (except with window functions). For example, the following query will result in an error:

```sql
SELECT
    category,
    SUM(amount) as total_sales
FROM sale
HAVING SUM(amount) > 75;
```

This will result in an error because `HAVING` requires a `GROUP BY` clause.

### NULL in Groups

NULL values form their own group in `GROUP BY`.

### Multiple Conditions

You can combine multiple conditions in `HAVING` with `AND`/`OR`. For example, the query below finds categories with more than 3 sales:

```sql
SELECT
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
HAVING COUNT(*) >= 3;
```

The output will be:

| category    | sale_count | total_sales |
| ----------- | ---------- | ----------- |
| Fiction     | 4          | 92.96       |
| Non-Fiction | 3          | 65.97       |
| Technical   | 3          | 124.97      |

We can use `AND` to combine multiple conditions in `HAVING`. For example, the query below finds categories with more than 3 sales and total sales above $100:

```sql
SELECT
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY category
HAVING COUNT(*) >= 3
AND SUM(amount) > 100;
```

The output will be:

| category  | sale_count | total_sales |
| --------- | ---------- | ----------- |
| Technical | 3          | 124.97      |

### Aggregate Functions

`HAVING` can only use the columns in `GROUP BY` and aggregate functions.
