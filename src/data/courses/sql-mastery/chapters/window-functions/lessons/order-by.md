---
title: Use of ORDER BY
description: Learn how ORDER BY changes window function behavior
order: 111
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    book_title VARCHAR(100),
    category VARCHAR(50),
    sale_date DATE,
    price DECIMAL(10, 2),
    customer_rating INTEGER
  );

  INSERT INTO sale (id, book_title, category, sale_date, price, customer_rating) 
  VALUES 
    (1, 'The Great Gatsby', 'Fiction', '2024-01-15', 24.99, 4),
    (2, 'SQL Basics', 'Technical', '2024-01-15', 39.99, 5),
    (3, '1984', 'Fiction', '2024-01-16', 19.99, 5),
    (4, 'Python Programming', 'Technical', '2024-01-16', 44.99, 4),
    (5, 'Pride and Prejudice', 'Fiction', '2024-01-16', 14.99, 3),
    (6, 'Data Science', 'Technical', '2024-01-17', 49.99, 5),
    (7, 'The Hobbit', 'Fiction', '2024-01-17', 29.99, 4),
    (8, 'Web Development', 'Technical', '2024-01-17', 34.99, 3);
  ```
---

In our previous lesson, we learned about `OVER` and `PARTITION BY`. Now let's learn about `ORDER BY` and how it works specifically within window functions.

## ORDER BY in Window Functions

When you add `ORDER BY` to a window function's `OVER` clause, you fundamentally change how that function processes data. Without `ORDER BY`, a window function processes **all rows in the partition simultaneously**. With `ORDER BY`, the function processes rows one at a time in the specified order, building up its result as it goes.

Let's look at an example to understand this better. Let's say we have the following `sale` table:

| id  | book_title          | category  | sale_date  | price | customer_rating |
| --- | ------------------- | --------- | ---------- | ----- | --------------- |
| 1   | The Great Gatsby    | Fiction   | 2024-01-15 | 24.99 | 4               |
| 2   | SQL Basics          | Technical | 2024-01-15 | 39.99 | 5               |
| 3   | 1984                | Fiction   | 2024-01-16 | 19.99 | 5               |
| 4   | Python Programming  | Technical | 2024-01-16 | 44.99 | 4               |
| 5   | Pride and Prejudice | Fiction   | 2024-01-16 | 14.99 | 3               |
| 6   | Data Science        | Technical | 2024-01-17 | 49.99 | 5               |
| 7   | The Hobbit          | Fiction   | 2024-01-17 | 29.99 | 4               |
| 8   | Web Development     | Technical | 2024-01-17 | 34.99 | 3               |

Let's run the following two queries; one without `ORDER BY` and one with `ORDER BY` and see the difference.

```sql
-- Without ORDER BY - processes all rows at once
SELECT
    book_title,
    price,
    SUM(price) OVER() as total_price
FROM sale;

-- With ORDER BY - processes rows sequentially
SELECT
    book_title,
    price,
    SUM(price) OVER(ORDER BY price) as running_total
FROM sale;
```

The first query (without `ORDER BY`) returns:

| book_title          | price | total_price |
| ------------------- | ----- | ----------- |
| The Great Gatsby    | 24.99 | 259.92      |
| SQL Basics          | 39.99 | 259.92      |
| 1984                | 19.99 | 259.92      |
| Python Programming  | 44.99 | 259.92      |
| Pride and Prejudice | 14.99 | 259.92      |
| Data Science        | 49.99 | 259.92      |
| The Hobbit          | 29.99 | 259.92      |
| Web Development     | 34.99 | 259.92      |

In this result, as you can see, every row shows the same `total_price` because the `SUM` function without `ORDER BY` considers all rows at once.

The second query (with `ORDER BY`) returns:

| book_title          | price | running_total |
| :------------------ | ----: | ------------: |
| Pride and Prejudice | 14.99 |         14.99 |
| 1984                | 19.99 |         34.98 |
| The Great Gatsby    | 24.99 |         59.97 |
| The Hobbit          | 29.99 |         89.96 |
| Web Development     | 34.99 |        124.95 |
| SQL Basics          | 39.99 |        164.94 |
| Python Programming  | 44.99 |        209.93 |
| Data Science        | 49.99 |        259.92 |

Notice how the `running_total` is different in each row. This is because the inclusion of `ORDER BY` changed the way the `SUM` function works. It now processes rows sequentially, adding up the `price` of each row as it goes. Let me explain how this works:

1. Since we didn't specify `PARTITION BY`, all rows are in a single partition (the entire table)
2. Within this partition, the rows are sorted by price (lowest to highest) due to our `ORDER BY price` clause. This also ensures that the the window function i.e. `SUM` in this case, will process the rows sequentially i.e. from the first row to the current row.
3. For each row, the `SUM` function only considers the current row and all previous rows in the ordered sequence
4. This creates a cumulative sum (running total) that builds up as we move through the ordered rows

Let's see how the running total builds up for the first few rows. The sorted partition to be processed by the window function `OVER(ORDER BY price)` is:

| book_title          | price |
| :------------------ | ----: |
| Pride and Prejudice | 14.99 |
| 1984                | 19.99 |
| The Great Gatsby    | 24.99 |
| The Hobbit          | 29.99 |
| Web Development     | 34.99 |
| SQL Basics          | 39.99 |
| Python Programming  | 44.99 |
| Data Science        | 49.99 |

When the window function processes the first row, it only considers the first row:

| book_title          | price | running_total | calculation |
| :------------------ | ----: | ------------: | :---------- |
| Pride and Prejudice | 14.99 |         14.99 | 14.99       |

When the window function processes the second row, it considers the first two rows:

| book_title          | price | running_total | calculation   |
| :------------------ | ----: | ------------: | :------------ |
| Pride and Prejudice | 14.99 |         14.99 | 14.99         |
| 1984                | 19.99 |         34.98 | 14.99 + 19.99 |

When the window function processes the third row, it considers the first three rows:

| book_title          | price | running_total | calculation           |
| :------------------ | ----: | ------------: | :-------------------- |
| Pride and Prejudice | 14.99 |         14.99 | 14.99                 |
| 1984                | 19.99 |         34.98 | 14.99 + 19.99         |
| The Great Gatsby    | 24.99 |         59.97 | 14.99 + 19.99 + 24.99 |

This process continues for each subsequent row, always adding the current price to the previous running total until all rows have been processed.

This behavior of `ORDER BY` in window functions is particularly useful when you may want to process rows in a specific order, such as calculating running totals or processing rows in a specific order.

## FIRST_VALUE() and LAST_VALUE()

`FIRST_VALUE()` and `LAST_VALUE()` are userful when you may want to get the first or last value in a partition. `ORDER BY` is quite useful when using these functions.

Let's understand how these functions work by taking an example.

### Example: Cheapest book we Sold

Let's say we want to get the cheapest book we sold. In order to do this, we can create a partition of all the books (i.e. no `PARTITION BY` clause) and then use the `ORDER BY` clause to sort the rows by price. Here's how we can do it:

```sql
SELECT
    book_title,
    price,
    FIRST_VALUE(book_title) OVER(ORDER BY price) as cheapest_book
FROM sale;
```

The output will be:

| book_title          | price | cheapest_book       |
| ------------------- | ----- | ------------------- |
| Pride and Prejudice | 14.99 | Pride and Prejudice |
| 1984                | 19.99 | Pride and Prejudice |
| The Great Gatsby    | 24.99 | Pride and Prejudice |
| The Hobbit          | 29.99 | Pride and Prejudice |
| Web Development     | 34.99 | Pride and Prejudice |
| SQL Basics          | 39.99 | Pride and Prejudice |
| Python Programming  | 44.99 | Pride and Prejudice |
| Data Science        | 49.99 | Pride and Prejudice |

### Example: Most Expensive Book we Sold

To get the most expensive book we sold (i.e. `Data Science`), your first instinct may be to use the opposite of the `FIRST_VALUE()` function i.e. `LAST_VALUE()` function i.e.

```sql
SELECT
    book_title,
    price,
    LAST_VALUE(book_title) OVER(ORDER BY price) as most_expensive_book
FROM sale;
```

The output from this query however will be:

| book_title          | price | most_expensive_book |
| ------------------- | ----- | ------------------- |
| Data Science        | 49.99 | Data Science        |
| Python Programming  | 44.99 | Python Programming  |
| SQL Basics          | 39.99 | SQL Basics          |
| Web Development     | 34.99 | Web Development     |
| The Hobbit          | 29.99 | The Hobbit          |
| The Great Gatsby    | 24.99 | The Great Gatsby    |
| 1984                | 19.99 | 1984                |
| Pride and Prejudice | 14.99 | Pride and Prejudice |

Notice how the `most_expensive_book` is wrong and always same as the current row. This is because, as mentioned earlier, when using `ORDER BY` in a window function, it processes rows sequentially i.e. from the first row to the current row. So the `LAST_VALUE()` function will always return the current row's value.

Alternatively, to get the most expensive book we can use the `ORDER BY price DESC` combined with `FIRST_VALUE()` function. Here's how we can do it:

```sql
SELECT
    book_title,
    price,
    FIRST_VALUE(book_title) OVER(ORDER BY price DESC) as most_expensive_book
FROM sale;
```

The output from this query will be:

| book_title          | price | most_expensive_book |
| ------------------- | ----- | ------------------- |
| Data Science        | 49.99 | Data Science        |
| Python Programming  | 44.99 | Data Science        |
| SQL Basics          | 39.99 | Data Science        |
| Web Development     | 34.99 | Data Science        |
| The Hobbit          | 29.99 | Data Science        |
| The Great Gatsby    | 24.99 | Data Science        |
| 1984                | 19.99 | Data Science        |
| Pride and Prejudice | 14.99 | Data Science        |

Notice how the `most_expensive_book` is now correctly set to `Data Science`.

> Note: You might notice that these results appear sorted by price even though we didn't include a query-level `ORDER BY` clause. This is because many SQL implementations automatically sort the results to match the window function's `ORDER BY` clause for better readability. However, this behavior isn't guaranteed by the SQL standard - if you need the results in a specific order, you should always include an explicit `ORDER BY` clause at the query level.

### Example: Cheapest + Most Expensive Book

We can get both the cheapest and most expensive books above using a single query. Here's how we can do it:

```sql
SELECT
    book_title,
    price,
    FIRST_VALUE(book_title) OVER(ORDER BY price ASC) as cheapest_book,
    FIRST_VALUE(book_title) OVER(ORDER BY price DESC) as most_expensive_book
FROM sale;
```

The output from this query will be:

| book_title          | price | cheapest_book       | most_expensive_book |
| ------------------- | ----- | ------------------- | ------------------- |
| Pride and Prejudice | 14.99 | Pride and Prejudice | Data Science        |
| 1984                | 19.99 | Pride and Prejudice | Data Science        |
| The Great Gatsby    | 24.99 | Pride and Prejudice | Data Science        |
| The Hobbit          | 29.99 | Pride and Prejudice | Data Science        |
| Web Development     | 34.99 | Pride and Prejudice | Data Science        |
| SQL Basics          | 39.99 | Pride and Prejudice | Data Science        |
| Python Programming  | 44.99 | Pride and Prejudice | Data Science        |
| Data Science        | 49.99 | Pride and Prejudice | Data Science        |

## ORDER BY with PARTITION BY

When combining `ORDER BY` with `PARTITION BY`, we create independent running calculations within each partition. The window function resets its calculations whenever it encounters a new partition. Let's analyze how this works:

```sql
SELECT
    category,
    book_title,
    price,
    SUM(price) OVER(
        PARTITION BY category
        ORDER BY price
    ) as category_running_total
FROM sale;
```

The output from this query will be the books with their category and the running total for each category.

| category  | book_title          | price | category_running_total |
| --------- | :------------------ | ----: | ---------------------: |
| Fiction   | Pride and Prejudice | 14.99 |                  14.99 |
| Fiction   | 1984                | 19.99 |                  34.98 |
| Fiction   | The Great Gatsby    | 24.99 |                  59.97 |
| Fiction   | The Hobbit          | 29.99 |                  89.96 |
| Technical | Web Development     | 34.99 |                  34.99 |
| Technical | SQL Basics          | 39.99 |                  74.98 |
| Technical | Python Programming  | 44.99 |                 119.97 |
| Technical | Data Science        | 49.99 |                 169.96 |

Let's see how the running total builds up within each partition:

`Fiction` books (first partition) with items ordered by price:

| category | book_title          | price | category_running_total | calculation   |
| -------- | :------------------ | ----: | ---------------------: | :------------ |
| Fiction  | Pride and Prejudice | 14.99 |                  14.99 | 14.99         |
| Fiction  | 1984                | 19.99 |                  34.98 | 14.99 + 19.99 |
| Fiction  | The Great Gatsby    | 24.99 |                  59.97 | 34.98 + 24.99 |
| Fiction  | The Hobbit          | 29.99 |                  89.96 | 59.97 + 29.99 |

`Technical` books (second partition - notice how the total resets and items ordered by price):

| category  | book_title         | price | category_running_total | calculation    |
| --------- | :----------------- | ----: | ---------------------: | :------------- |
| Technical | Web Development    | 34.99 |                  34.99 | 34.99          |
| Technical | SQL Basics         | 39.99 |                  74.98 | 34.99 + 39.99  |
| Technical | Python Programming | 44.99 |                 119.97 | 74.98 + 44.99  |
| Technical | Data Science       | 49.99 |                 169.96 | 119.97 + 49.99 |

Key points to notice here are:

- Each category starts its own running total from scratch
- Within each category, rows are ordered by price
- The running total only considers rows within the same category

In the next lesson, we'll learn about Ranking functions i.e. `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.
