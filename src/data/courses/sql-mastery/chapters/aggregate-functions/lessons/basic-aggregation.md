---
title: Basic Aggregation
description: Learn about fundamental SQL aggregate functions like COUNT, SUM, AVG, MIN, and MAX
order: 110
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    title TEXT,
    genre TEXT,
    price DECIMAL(10, 2),
    quantity INTEGER,
    sale_date DATE
  );

  INSERT INTO sale (id, title, genre, price, quantity, sale_date)
  VALUES 
    (1, 'The Great Gatsby', 'Fiction', 12.99, 5, '2024-01-15'),
    (2, 'SQL Basics', 'Technical', 29.99, 10, '2024-01-15'),
    (3, 'Pride and Prejudice', 'Fiction', 9.99, 3, '2024-02-16'),
    (4, 'Data Science 101', 'Technical', 34.99, 4, '2024-02-16'),
    (5, 'The Great Gatsby', 'Fiction', 12.99, 2, '2024-03-17'),
    (6, 'Pride and Prejudice', 'Fiction', 9.99, 1, '2024-02-17'),
    (7, 'SQL Basics', 'Technical', 29.99, 8, '2024-02-18'),
    (8, 'Data Science 101', 'Technical', 34.99, NULL, '2024-02-18');
  ```
---

In our previous lesson, we learned what aggregation is and why it's useful. Now, let's look at some common aggregate functions.

We will use the following `sale` table for our examples:

| id  | title               | genre     | price | quantity | sale_date  |
| --- | ------------------- | --------- | ----- | -------- | ---------- |
| 1   | The Great Gatsby    | Fiction   | 12.99 | 5        | 2024-01-15 |
| 2   | SQL Basics          | Technical | 29.99 | 10       | 2024-01-15 |
| 3   | Pride and Prejudice | Fiction   | 9.99  | 3        | 2024-02-16 |
| 4   | Data Science 101    | Technical | 34.99 | 4        | 2024-01-16 |
| 5   | The Great Gatsby    | Fiction   | 12.99 | 2        | 2024-03-17 |
| 6   | Pride and Prejudice | Fiction   | 9.99  | 1        | 2024-02-17 |
| 7   | SQL Basics          | Technical | 29.99 | 8        | 2024-02-18 |
| 8   | Data Science 101    | Technical | 34.99 | NULL     | 2024-02-18 |

## The COUNT Function

The `COUNT` function is used to count the number of rows in a result set. It's one of the most frequently used aggregate functions.

There are several ways to use `COUNT`. Let's look at different examples to understand the differences.

### Counting all rows

`COUNT(*)` is used to count all rows in the table. For example, our query to count the total number of sales in the `sale` table will be:

```sql
SELECT COUNT(*)
FROM sale;
```

The output from this query will be:

| COUNT (\*) |
| ---------- |
| 8          |

Notice how the result is `8`, which is the total number of rows in the `sale` table. Let's add an alias to make it more readable:

```sql
SELECT COUNT(*) as total_sales
FROM sale;
```

The output from this query will be:

| total_sales |
| ----------- |
| 8           |

### Filtering and Counting

We can also filter the rows before counting them. For example, we can count the number of sales for a specific genre:

```sql
SELECT COUNT(*) as total_sales
FROM sale
WHERE genre = 'Fiction';
```

The output from this query will be `4` since there are 4 rows with the genre `Fiction`.

| total_sales |
| ----------- |
| 4           |

> In the next lesson, we will learn about `GROUP BY` which we can use to count the number of sales for each genre.

### Counting specific column (excludes NULL values)

`COUNT(column)` is used to count the number of rows where the specified column is not `NULL`. For example, our query to count the number of sales with a non-NULL quantity will be:

```sql
SELECT COUNT(quantity) as total_sales_with_quantity
FROM sale;
```

The output from this query will be `7` since one of the rows has a `NULL` value for quantity.

| total_sales_with_quantity |
| ------------------------- |
| 7                         |

### Count DISTINCT values

`COUNT(DISTINCT column)` is used to count the number of unique values in a column. For example, our query to count the number of unique titles in the `sale` table will be:

```sql
SELECT COUNT(DISTINCT title) as total_unique_titles
FROM sale;
```

The output from this query will be `5` since there are 5 unique titles in the `sale` table.

| total_unique_titles |
| ------------------- |
| 5                   |

Just like `COUNT(column)`, the `COUNT(DISTINCT column)` function also ignores `NULL` values.

## The SUM Function

The `SUM` function adds up numeric values in a column e.g. our query to calculate the total number of books sold will be:

```sql
SELECT SUM(quantity) as total_books
FROM sale;
```

The output from this query will be `33` since the total quantity of books sold is 33.

| total_books |
| ----------- |
| 33          |

We can also have expressions in the `SUM` function. For example, we can calculate the total revenue by multiplying the price and quantity for each sale and summing up the results:

```sql
SELECT SUM(price * quantity) as total_revenue
FROM sale;
```

The output from this query will be `810.67` since the total revenue is $810.67.

| total_revenue |
| ------------- |
| 810.67        |

## The AVG Function

The `AVG` function calculates the average value of a numeric column. For example, our query to calculate the average price of books will be:

```sql
SELECT AVG(price) as avg_price
FROM sale;
```

The output from this query will be `21.99` since the average price of books is $21.99.

| avg_price |
| --------- |
| 21.99     |

We can also calculate the average quantity of books sold by using the `AVG` function. Our query to calculate the average quantity of books sold will be:

```sql
SELECT AVG(quantity) as avg_quantity
FROM sale;
```

The output from this query will be `4.71` since the average quantity of books sold is 4.71.

| avg_quantity |
| ------------ |
| 4.71         |

> `AVG` (like most aggregate functions) ignores `NULL` values. If you want to treat `NULL` values as 0, you need to use `COALESCE`:
>
> ```sql
> SELECT AVG(COALESCE(quantity, 0)) as avg_quantity
> FROM sale;
> ```
>
> The output from this will be `4.12` instead of `4.71`.

## The MIN and MAX Functions

The `MIN` and `MAX` functions find the smallest and largest values in a column. For example, our query to find the cheapest and most expensive books will be:

```sql
SELECT
    MIN(price) as lowest_price,
    MAX(price) as highest_price
FROM sale;
```

The output from this query will be `9.99` and `34.99` since the lowest price is $9.99 and the highest price is $34.99.

| lowest_price | highest_price |
| ------------ | ------------- |
| 9.99         | 34.99         |

These functions work with dates too:

```sql
SELECT
    MIN(sale_date) as first_sale,
    MAX(sale_date) as last_sale
FROM sale;
```

The output from this query will be `2024-01-15` and `2024-01-18` since the first sale was on `2024-01-15` and the last sale was on `2024-01-18`.

| first_sale | last_sale  |
| ---------- | ---------- |
| 2024-01-15 | 2024-01-18 |

Filtering works with the `MIN` and `MAX` functions too. For example, our query to find cheapest and most expensive books sold in the `Fiction` genre will be:

```sql
SELECT
    MIN(price) as lowest_price,
    MAX(price) as highest_price
FROM sale
WHERE genre = 'Fiction';
```

The output from this query will be `9.99` and `12.99` since the lowest price is $9.99 and the highest price is $12.99.

| lowest_price | highest_price |
| ------------ | ------------- |
| 9.99         | 12.99         |

## Combining Aggregate Functions

You can use multiple aggregate functions in a single query.

> **Important Note**: When using aggregate functions in a SELECT clause, you can only include:
> 1. Aggregate functions (like COUNT, SUM, AVG, etc.)
> 2. Constants
> 
> If you try to include a regular column that isn't aggregated, you'll get an error. For example, this query will fail:
> ```sql
> SELECT 
>     title,           -- This will cause an error!
>     COUNT(*) as count
> FROM sale;
> ```
> To include regular columns along with aggregate functions, you need to use the GROUP BY clause, which we'll cover in the next lesson.

For example, our query to calculate the total number of sales, total number of books sold, average price, minimum price, and maximum price in `February 2024` will be:

```sql
SELECT
    COUNT(*) as total_sales,
    SUM(quantity) as total_books_sold,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM sale
WHERE sale_date BETWEEN '2024-02-01' AND '2024-02-29';
```

The output from this query will be:

| total_sales | total_books_sold | avg_price | min_price | max_price |
| ----------- | ---------------- | --------- | --------- | --------- |
| 5           | 16               | 23.99     | 9.99      | 34.99     |

The query to calculate the same for all the sales will be:

```sql
SELECT
    COUNT(*) as total_sales,
    SUM(quantity) as total_books_sold,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price
FROM sale;
```

The output from this query will be:

| total_sales | total_books_sold | avg_price | min_price | max_price |
| ----------- | ---------------- | --------- | --------- | --------- |
| 8           | 33               | 21.99     | 9.99      | 34.99     |


In the next lesson, we'll learn about the `GROUP BY` clause and how to use it with aggregate functions to analyze data at a more granular level.
