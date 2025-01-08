---
title: OVER and PARTITION BY
description: Learn how to use OVER and PARTITION BY clauses to group and analyze data
order: 110
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    book_title VARCHAR(100),
    category VARCHAR(50),
    sale_date DATE,
    price DECIMAL(10, 2)
  );

  INSERT INTO sale (id, book_title, category, sale_date, price) 
  VALUES 
    (1, 'The Great Gatsby', 'Fiction', '2024-01-15', 24.99),
    (2, 'SQL Basics', 'Technical', '2024-01-15', 39.99),
    (3, '1984', 'Fiction', '2024-01-16', 19.99),
    (4, 'Python Programming', 'Technical', '2024-01-16', 44.99),
    (5, 'Pride and Prejudice', 'Fiction', '2024-01-16', 14.99),
    (6, 'Data Science', 'Technical', '2024-01-17', 49.99),
    (7, 'The Hobbit', 'Fiction', '2024-01-17', 29.99),
    (8, 'Web Development', 'Technical', '2024-01-17', 34.99);
  ```
---

In our previous lesson, we learned what window functions are and saw a basic example. Let's learn about how they work. In this lesson we will dive deeper into the `OVER` clause and `PARTITION BY`, which are fundamental to window functions.

## The OVER Clause

The `OVER` clause is what turns a regular aggregate function into a window function. Without `OVER`, functions like `SUM` and `AVG` would collapse rows into a single result. With `OVER`, they operate on a "window" of rows while preserving the original rows.

Let's look at an example using our bookstore sales data:

```sql
SELECT
    book_title,
    category,
    price,
    AVG(price) OVER() as overall_avg_price
FROM sale;
```

Since we didn't specify any partitioning, the window function will operate on all rows of the table for the `AVG` function.

This query returns:

| book_title          | category  | price | overall_avg_price |
| ------------------- | --------- | ----- | ----------------- |
| The Great Gatsby    | Fiction   | 24.99 | 32.49             |
| SQL Basics          | Technical | 39.99 | 32.49             |
| 1984                | Fiction   | 19.99 | 32.49             |
| Python Programming  | Technical | 44.99 | 32.49             |
| Pride and Prejudice | Fiction   | 14.99 | 32.49             |
| Data Science        | Technical | 49.99 | 32.49             |
| The Hobbit          | Fiction   | 29.99 | 32.49             |
| Web Development     | Technical | 34.99 | 32.49             |

If you look closely, you will notice that:

- **All the rows are preserved** just like a non-aggregate query which is not the case with aggregate functions.
- The `overall_avg_price` column has the **same average price** &nbsp;`32.49` for all rows.

Empty parentheses in `OVER()` instructed our query to not partition (or group) the rows when calculating the average price for each row. The equivalent query without the window function would be:

```sql
SELECT
    book_title,
    category,
    price,
    (SELECT AVG(price) FROM sale) as overall_avg_price
FROM sale;
```

## PARTITION BY

Sometimes instead of operating on all rows, we want to operate on a subset of rows when calculating a value. This is where `PARTITION BY` comes in. It divides rows into partitions (i.e. groups) that are processed separately.

Let's modify our query to calculate **average prices by category**:

```sql
SELECT
    book_title,
    category,
    price,
    AVG(price) OVER(PARTITION BY category) as category_avg_price
                    ---------^-----------
FROM sale
ORDER BY category, price;
```

Notice that we added `PARTITION BY category` to the `AVG` function. This tells the `AVG` function to group the rows by `category` and then calculate the average price for each group.

Output from this query will be following:

| book_title          | category  | price | category_avg_price |
| ------------------- | --------- | ----- | ------------------ |
| Pride and Prejudice | Fiction   | 14.99 | 22.49              |
| 1984                | Fiction   | 19.99 | 22.49              |
| The Great Gatsby    | Fiction   | 24.99 | 22.49              |
| The Hobbit          | Fiction   | 29.99 | 22.49              |
| Web Development     | Technical | 34.99 | 42.49              |
| SQL Basics          | Technical | 39.99 | 42.49              |
| Python Programming  | Technical | 44.99 | 42.49              |
| Data Science        | Technical | 49.99 | 42.49              |

If you look closely, you will notice that:

- `Fiction` books have an average price of `22.49`
- `Technical` books have an average price of `42.49`
- Each row still shows its individual price

What `OVER(PARTITION BY category)` did is that it grouped the rows by `category` and then calculated the average price for each group.

### Example

Let's take another example. Let's say we want to get `total_books_sold` against each row (i.e. count of all the sales without any grouping). The query would be:

```sql
SELECT
    book_title,
    category,
    COUNT(*) OVER() as total_books_sold
FROM sale
ORDER BY category;
```

Output from this query will be:

| book_title          | category  | total_books_sold |
| ------------------- | --------- | ---------------- |
| The Great Gatsby    | Fiction   | 8                |
| 1984                | Fiction   | 8                |
| Pride and Prejudice | Fiction   | 8                |
| The Hobbit          | Fiction   | 8                |
| Web Development     | Technical | 8                |
| SQL Basics          | Technical | 8                |
| Python Programming  | Technical | 8                |
| Data Science        | Technical | 8                |

Notice we have `total_books_sold` as `8` for all rows. This is because we didn't specify any partitioning. Now, if we add `PARTITION BY category` to the `COUNT` function, it will count the number of rows in each category.

```sql
SELECT
    book_title,
    category,
    COUNT(*) OVER(PARTITION BY category) as total_books_sold
FROM sale
ORDER BY category;
```

Output from this query will be:

| book_title          | category  | total_books_sold |
| ------------------- | --------- | ---------------- |
| The Great Gatsby    | Fiction   | 4                |
| 1984                | Fiction   | 4                |
| Pride and Prejudice | Fiction   | 4                |
| The Hobbit          | Fiction   | 4                |
| Web Development     | Technical | 4                |
| SQL Basics          | Technical | 4                |
| Python Programming  | Technical | 4                |
| Data Science        | Technical | 4                |

Notice that `total_books_sold` is `4` for rows with `Fiction` category because there are 4 rows with `Fiction` category and same for `Technical` category.

## Multiple Partitions

We can partition by multiple columns. Let's say we want to get the average sale price by category for each day.

```sql
SELECT
    sale_date,
    category,
    price,
    AVG(price) OVER(PARTITION BY category, sale_date) as daily_category_avg
FROM sale
ORDER BY sale_date, category;
```

This shows average prices by category for each day:

| sale_date  | category  | price | daily_category_avg |
| ---------- | --------- | ----- | ------------------ |
| 2024-01-15 | Fiction   | 24.99 | 24.99              |
| 2024-01-15 | Technical | 39.99 | 39.99              |
| 2024-01-16 | Fiction   | 14.99 | 17.49              |
| 2024-01-16 | Fiction   | 19.99 | 17.49              |
| 2024-01-16 | Technical | 44.99 | 44.99              |
| 2024-01-17 | Fiction   | 29.99 | 29.99              |
| 2024-01-17 | Technical | 49.99 | 42.49              |
| 2024-01-17 | Technical | 34.99 | 42.49              |

## Multiple Window Functions

We can use multiple window functions in the same query. Let's say we want to calculate the following for each category:

- `avg_price` - Average sale price for each category
- `min_price` - Minimum sale price for each category
- `max_price` - Maximum sale price for each category
- `book_count` - Total number of books sold for each category

We can do this by using multiple window functions:.

```sql
SELECT
    category,
    price,
    AVG(price) OVER(PARTITION BY category) as avg_price,
    MIN(price) OVER(PARTITION BY category) as min_price,
    MAX(price) OVER(PARTITION BY category) as max_price,
    COUNT(*) OVER(PARTITION BY category) as book_count
FROM sale
ORDER BY category, price;
```

This gives us a comprehensive view of each category:

| category  | price | avg_price | min_price | max_price | book_count |
| --------- | ----- | --------- | --------- | --------- | ---------- |
| Fiction   | 14.99 | 22.49     | 14.99     | 29.99     | 4          |
| Fiction   | 19.99 | 22.49     | 14.99     | 29.99     | 4          |
| Fiction   | 24.99 | 22.49     | 14.99     | 29.99     | 4          |
| Fiction   | 29.99 | 22.49     | 14.99     | 29.99     | 4          |
| Technical | 34.99 | 42.49     | 34.99     | 49.99     | 4          |
| Technical | 39.99 | 42.49     | 34.99     | 49.99     | 4          |
| Technical | 44.99 | 42.49     | 34.99     | 49.99     | 4          |
| Technical | 49.99 | 42.49     | 34.99     | 49.99     | 4          |

We can also use different partitions for different window functions. For example, to calculate the total number of books sold for each day (i.e. not by category but by day), we can do this:

```sql
SELECT
    category,
    price,
    AVG(price) OVER(PARTITION BY category) as avg_price,
    MIN(price) OVER(PARTITION BY category) as min_price,
    MAX(price) OVER(PARTITION BY category) as max_price,
    COUNT(*) OVER(PARTITION BY sale_date) as total_books_sold
FROM sale
ORDER BY category, price;
```

This gives us the total number of books sold for each day:

| category  | price | avg_price | min_price | max_price | total_books_sold |
| --------- | ----- | --------- | --------- | --------- | ---------------- |
| Fiction   | 14.99 | 22.49     | 14.99     | 29.99     | 3                |
| Fiction   | 19.99 | 22.49     | 14.99     | 29.99     | 3                |
| Fiction   | 24.99 | 22.49     | 14.99     | 29.99     | 2                |
| Fiction   | 29.99 | 22.49     | 14.99     | 29.99     | 3                |
| Technical | 34.99 | 42.49     | 34.99     | 49.99     | 3                |
| Technical | 39.99 | 42.49     | 34.99     | 49.99     | 2                |
| Technical | 44.99 | 42.49     | 34.99     | 49.99     | 3                |
| Technical | 49.99 | 42.49     | 34.99     | 49.99     | 3                |

Notice how all the other columns are grouped by `category` but `total_books_sold` is grouped by `sale_date`.

## Named Windows

If you're using the same window multiple times, you can define it once using a `WINDOW` clause. For example, we can rewrite the query above as follows:

```sql
SELECT
    category,
    price,
    AVG(price) OVER w_category as avg_price,
    MIN(price) OVER w_category as min_price,
    MAX(price) OVER w_category as max_price,
    COUNT(*) OVER w_sale_date as total_books_sold
FROM
    sale
WINDOW
    w_category AS (PARTITION BY category),
    w_sale_date AS (PARTITION BY sale_date)
ORDER BY
    category, price;
```

This produces the same result as before but with cleaner, more maintainable code. One added benefit of using this approach is the better performance. Database engines can optimize the query better when the same window is used multiple times.

In the next lesson, we'll explore how to add `ORDER BY` to our window functions and look at different types of window functions.
