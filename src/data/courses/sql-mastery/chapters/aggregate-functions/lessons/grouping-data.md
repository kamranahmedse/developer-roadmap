---
title: Grouping Data
description: Learn how to group data and perform aggregate calculations on groups using GROUP BY
order: 120
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

In our previous lesson, we learned about basic aggregate functions. While these functions are useful, they become even more powerful when combined with the `GROUP BY` clause.

The `GROUP BY` clause allows us to group rows that have the same values in specified columns and then perform aggregate calculations on each group.

## Basic GROUP BY Syntax

The basic syntax for using `GROUP BY` is:

```sql
SELECT column1, aggregate_function(column2)
FROM table_name
GROUP BY column1;
```

Let's look at some examples using our bookstore `sale` table.

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

## Grouping by Single Column

Let's find the total sales amount for each book category:

```sql
SELECT
    category,
    SUM(amount) as total_sales
FROM sale
GROUP BY category;
```

The output from this query will look like this:

| category    | total_sales |
| ----------- | ----------- |
| Fiction     | 92.96       |
| Non-Fiction | 65.97       |
| Technical   | 124.97      |

### How does this work?

Let's break it down and see how it works behind the scenes.

[![](https://assets.roadmap.sh/guest/aggregate-step-1-wlykl.png)](https://assets.roadmap.sh/guest/aggregate-step-1-wlykl.png)

**Step 1:** The `GROUP BY` clause creates the groups based on the `category` column i.e. `Fiction`, `Non-Fiction`, and `Technical`:.

[![](https://assets.roadmap.sh/guest/grouped-data-my35f.png)](https://assets.roadmap.sh/guest/grouped-data-my35f.png)

Now that we have the groups, we can perform the aggregate function on any column in the group. In this case, we want to calculate the total sales amount for each group.

**Step 2:** The `SUM(amount)` function calculates the total sales amount for each group.

[![](https://assets.roadmap.sh/guest/grouped-data-eysmb.png)](https://assets.roadmap.sh/guest/grouped-data-eysmb.png)

**Step 3:** The result is returned with the `category` and `total_sales` columns as the output.

[![](https://assets.roadmap.sh/guest/final-aggregate-result-rmxeh.png)](https://assets.roadmap.sh/guest/final-aggregate-result-rmxeh.png)

Let's take another example and count how many sales we have for each store location using the same `sale` table:

```sql
SELECT
    store_location,
    COUNT(*) as sale_count
FROM sale
GROUP BY store_location;
```

The output from this query will look like this:

| store_location | sale_count |
| -------------- | ---------- |
| Airport        | 2          |
| Downtown       | 5          |
| Suburb         | 3          |

## Grouping by Multiple Columns

You can group by multiple columns to get more detailed insights. For example, let's find the total order count for each category and store location:

```sql
SELECT
    store_location,
    category,
    COUNT(*) as sale_count
FROM sale
GROUP BY store_location, category;
```

The output from this query will look like this:

| store_location | category    | sale_count |
| -------------- | ----------- | ---------- |
| Airport        | Non-Fiction | 1          |
| Airport        | Technical   | 1          |
| Downtown       | Fiction     | 4          |
| Downtown       | Technical   | 1          |
| Suburb         | Non-Fiction | 2          |
| Suburb         | Technical   | 1          |

## Multiple Aggregate Functions

You can also use multiple aggregate functions in the same query. For example, let's find the total sales and average sales for each category:

```sql
SELECT
    category,
    SUM(amount) as total_sales,
    AVG(amount) as avg_sale_value
FROM sale
GROUP BY category;
```

The output from this query will look like this:

| category    | total_sales | avg_sale_value |
| ----------- | ----------- | -------------- |
| Fiction     | 92.96       | 23.24          |
| Non-Fiction | 65.97       | 21.99          |
| Technical   | 124.97      | 41.66          |

Let's take another example and find the total number of sales and the total amount of sales for each store location:

```sql
SELECT
    store_location,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY store_location;
```

The output from this query will look like this:

| store_location | sale_count | total_sales |
| -------------- | ---------- | ----------- |
| Airport        | 2          | 62.98       |
| Downtown       | 5          | 142.95      |
| Suburb         | 3          | 77.97       |

Similarly, the total number of sales and the total amount of sales for each store location and category (i.e. multiple group columns):

```sql
SELECT
    store_location,
    category,
    COUNT(*) as sale_count,
    SUM(amount) as total_sales
FROM sale
GROUP BY store_location, category;
```

The output from this query will look like this:

| store_location | category    | sale_count | total_sales |
| -------------- | ----------- | ---------- | ----------- |
| Airport        | Non-Fiction | 1          | 27.99       |
| Airport        | Technical   | 1          | 34.99       |
| Downtown       | Fiction     | 4          | 92.96       |
| Downtown       | Technical   | 1          | 49.99       |
| Suburb         | Non-Fiction | 2          | 37.98       |
| Suburb         | Technical   | 1          | 39.99       |

## Conditional Aggregate Functions

Before we talk about adding conditional logic to our aggregate functions, let's talk about the `CASE WHEN` statement.

### CASE WHEN

The `CASE WHEN` is SQL's way of writing IF-ELSE logic in our `SELECT` statement. It is quite powerful and helps us write conditional column values.

Let's say that we want to assign a price category to each sale based on the amount of the sale i.e.

| if sale amount   | price_category |
| ---------------- | -------------- |
| `< 25`           | Budget         |
| `>= 25 AND < 40` | Regular        |
| `>= 40`          | Premium        |

We can achieve this by using the `CASE WHEN` statement in our `SELECT` statement i.e.

```sql
SELECT
    id,
    sale_date,
    category,
    amount,
    CASE
      WHEN amount < 25 THEN 'Budget'
      WHEN amount >= 25 AND amount < 40 THEN 'Regular'
      ELSE 'Premium'
    END as price_category
FROM sale
ORDER BY price_category;
```

This would categorize each sale like this:

| id  | sale_date  | category    | amount | price_category |
| --- | ---------- | ----------- | ------ | -------------- |
| 3   | 2024-01-16 | Fiction     | 24.99  | Budget         |
| 8   | 2024-01-17 | Fiction     | 22.99  | Budget         |
| 9   | 2024-01-18 | Non-Fiction | 17.99  | Budget         |
| 2   | 2024-01-15 | Non-Fiction | 19.99  | Budget         |
| 5   | 2024-01-16 | Fiction     | 14.99  | Budget         |
| 6   | 2024-01-17 | Technical   | 49.99  | Premium        |
| 10  | 2024-01-18 | Technical   | 34.99  | Regular        |
| 4   | 2024-01-16 | Technical   | 39.99  | Regular        |
| 7   | 2024-01-17 | Non-Fiction | 27.99  | Regular        |
| 1   | 2024-01-15 | Fiction     | 29.99  | Regular        |

Notice how it added the `price_category` based on the amount of the sale.

### Combining CASE WHEN with Aggregates

Now let's combine `CASE WHEN` with aggregate functions to analyze our sales. Let's find the total number of sales and the number of sales in each price category for each category:

```sql
SELECT
    category,
    COUNT(*) as total_sales,
    COUNT(CASE
        WHEN amount < 25 THEN 1
        END) as budget_sales,
    COUNT(CASE
        WHEN amount >= 25 AND amount < 40 THEN 1
        END) as regular_sales,
    COUNT(CASE
        WHEN amount >= 40 THEN 1
        END) as premium_sales
FROM sale
GROUP BY category;
```

This query would output something like:

| category    | total_sales | budget_sales | regular_sales | premium_sales |
| ----------- | ----------- | ------------ | ------------- | ------------- |
| Fiction     | 4           | 3            | 1             | 0             |
| Non-Fiction | 3           | 2            | 1             | 0             |
| Technical   | 3           | 0            | 2             | 1             |

---

## Important Rules and Gotchas

When working with GROUP BY and aggregate functions, there are some important rules to keep in mind:

### SELECT Columns

When using `GROUP BY`, every column in your `SELECT` list must either be included in the `GROUP BY` clause, or be used within an aggregate function.

For example, this query will fail:

```sql
-- ERROR: category_name must appear in GROUP BY clause
SELECT
    category_name,    -- Not in GROUP BY
    store_location,   -- Not in GROUP BY
    SUM(amount)      -- This is fine (aggregate function)
FROM sale
GROUP BY category;    -- Only grouping by category
```

To fix it, either include all columns in GROUP BY:

```sql
-- OK! This works
SELECT
    category_name,
    store_location,
    SUM(amount)
FROM sale
GROUP BY category_name, store_location;
```

Or use them in aggregate functions:

```sql
-- OK! This also works
SELECT
    category_name,
    COUNT(DISTINCT store_location),
    SUM(amount)
FROM sale
GROUP BY category_name;
```

### NULL Values in Groups

`NULL` values are ignored by all the aggregate functions except `COUNT(*)`. Also, when using `GROUP BY`, `NULL` values form their own group and appear first in the results unless ordered otherwise.

### Order of Operations

SQL processes clauses in the following order:

| Top to Bottom |
| ------------- |
| `FROM`        |
| `WHERE`       |
| `GROUP BY`    |
| `HAVING`      |
| `SELECT`      |
| `ORDER BY`    |

Some common gotchas when working with `GROUP BY`:

- `WHERE` filters rows before they're grouped
- `HAVING` filters after grouping. We will learn more about this in the next lesson
- You can't use column aliases from `SELECT` in `WHERE` or `GROUP BY`, because as you can see in the order of operations, `WHERE` and `GROUP BY` are processed before `SELECT`
- You can use column aliases in `ORDER BY`

---

In the next lesson, we will learn about grouping and filtering data using the `HAVING` clause.
