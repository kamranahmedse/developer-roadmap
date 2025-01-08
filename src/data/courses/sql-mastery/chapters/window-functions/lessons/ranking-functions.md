---
title: Ranking Functions
description: Learn how to use ROW_NUMBER, RANK, and DENSE_RANK to order and rank rows
order: 120
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE sale (
    id INTEGER PRIMARY KEY,
    book_title VARCHAR(100),
    category VARCHAR(50),
    sale_date DATE,
    copies_sold INTEGER,
    revenue DECIMAL(10, 2)
  );

  INSERT INTO sale (id, book_title, category, sale_date, copies_sold, revenue) 
  VALUES 
    (1, 'The Great Gatsby', 'Fiction', '2024-01-15', 50, 1249.50),
    (10, 'The Great Gatsby', 'Fiction', '2024-01-17', 50, 1249.50),
    (8, 'Web Development', 'Technical', '2024-01-17', 75, 2624.25),
    (2, 'SQL Basics', 'Technical', '2024-01-15', 100, 3999.00),
    (6, 'Data Science', 'Technical', '2024-01-16', 100, 4999.00),
    (5, 'Pride and Prejudice', 'Fiction', '2024-01-16', 30, 449.70),
    (7, 'The Hobbit', 'Fiction', '2024-01-17', 50, 1499.50),
    (4, 'Python Programming', 'Technical', '2024-01-16', 75, 3374.25),
    (9, 'SQL Basics', 'Technical', '2024-01-17', 100, 3999.00),
    (3, '1984', 'Fiction', '2024-01-15', 50, 999.50);
  ```
---

In our previous lessons, we learned about the `OVER` clause and `PARTITION BY`. Now, let's explore ranking functions, which are special window functions that assign ranks to rows based on specified ordering.

The three main ranking functions are `ROW_NUMBER()`, `RANK()`, and &nbsp;`DENSE_RANK()`. Let's explore each one using our bookstore data.

## ROW_NUMBER()

`ROW_NUMBER()` assigns a unique sequential number to each row within a partition. Let's look at a simple query without any `PARTITION BY` to see how it works:

```sql
SELECT
    book_title,
    category,
    revenue,
    ROW_NUMBER() OVER() as row_number
FROM sale
ORDER BY row_number;
```

This produces the following result:

| book_title          | category  | revenue | row_number |
| ------------------- | --------- | ------- | ---------- |
| The Great Gatsby    | Fiction   | 1249.50 | 1          |
| The Great Gatsby    | Fiction   | 1249.50 | 2          |
| Web Development     | Technical | 2624.25 | 3          |
| SQL Basics          | Technical | 3999.00 | 4          |
| Data Science        | Technical | 4999.00 | 5          |
| Pride and Prejudice | Fiction   | 449.70  | 6          |
| The Hobbit          | Fiction   | 1499.50 | 7          |
| Python Programming  | Technical | 3374.25 | 8          |
| SQL Basics          | Technical | 3999.00 | 9          |
| 1984                | Fiction   | 999.50  | 10         |

Notice how `row_number` starts at 1 and increments by 1 for each row. Let's add a `PARTITION BY` clause to see how it works within a partition.

### Ranking within a Partition

Let's use `PARTITION BY` to assign sequential numbers to each book sold on a given date. We will use the `sale_date` column to partition the data. Our query will look like this:

```sql
SELECT
    book_title,
    category,
    sale_date,
    ROW_NUMBER() OVER(PARTITION BY sale_date) as order_counter
FROM sale;
```

This produces the following result:

| book_title          | category  | sale_date  | order_counter |
| ------------------- | --------- | ---------- | ------------- |
| The Great Gatsby    | Fiction   | 2024-01-15 | 1             |
| SQL Basics          | Technical | 2024-01-15 | 2             |
| 1984                | Fiction   | 2024-01-15 | 3             |
| Python Programming  | Technical | 2024-01-16 | 1             |
| Pride and Prejudice | Fiction   | 2024-01-16 | 2             |
| Data Science        | Technical | 2024-01-16 | 3             |
| Web Development     | Technical | 2024-01-17 | 1             |
| The Hobbit          | Fiction   | 2024-01-17 | 2             |
| SQL Basics          | Technical | 2024-01-17 | 3             |
| The Great Gatsby    | Fiction   | 2024-01-17 | 4             |

Notice how `order_counter` restarts at 1 for each `sale_date`.

### Ranking and Ordering

We can also use `ORDER BY` inside the `ROW_NUMBER()` function to order the rows before assigning numbers. Let's rank the books by their revenue:

```sql
SELECT
    book_title,
    category,
    revenue,
    ROW_NUMBER() OVER(ORDER BY revenue DESC) as revenue_rank
FROM sale;
```

The output from this query will be:

| book_title          | category  | revenue | revenue_rank |
| ------------------- | --------- | ------- | ------------ |
| Data Science        | Technical | 4999.00 | 1            |
| SQL Basics          | Technical | 3999.00 | 2            |
| SQL Basics          | Technical | 3999.00 | 3            |
| Python Programming  | Technical | 3374.25 | 4            |
| Web Development     | Technical | 2624.25 | 5            |
| The Hobbit          | Fiction   | 1499.50 | 6            |
| The Great Gatsby    | Fiction   | 1249.50 | 7            |
| The Great Gatsby    | Fiction   | 1249.50 | 8            |
| 1984                | Fiction   | 999.50  | 9            |
| Pride and Prejudice | Fiction   | 449.70  | 10           |

Notice how it sorted the rows by revenue and assigned ranks.

#### Ranking, Partitioning, and Ordering

We can also combine `PARTITION BY` and `ORDER BY` to rank within partitions and order the rows before assigning numbers. Let's rank the books by their revenue for each date:

```sql
SELECT
    book_title,
    sale_date,
    revenue,
    ROW_NUMBER() OVER(
        PARTITION BY sale_date
        ORDER BY revenue DESC
    ) as revenue_rank
FROM sale;
```

The output from this query will be:

| book_title          | sale_date  | revenue | revenue_rank |
| ------------------- | ---------- | ------- | ------------ |
| SQL Basics          | 2024-01-15 | 3999.00 | 1            |
| The Great Gatsby    | 2024-01-15 | 1249.50 | 2            |
| 1984                | 2024-01-15 | 999.50  | 3            |
| Data Science        | 2024-01-16 | 4999.00 | 1            |
| Python Programming  | 2024-01-16 | 3374.25 | 2            |
| Pride and Prejudice | 2024-01-16 | 449.70  | 3            |
| SQL Basics          | 2024-01-17 | 3999.00 | 1            |
| Web Development     | 2024-01-17 | 2624.25 | 2            |
| The Hobbit          | 2024-01-17 | 1499.50 | 3            |
| The Great Gatsby    | 2024-01-17 | 1249.50 | 4            |

Notice how the `revenue_rank` restarts at 1 for each `sale_date` and also higher the revenue in the same day, higher the rank. We can also apply sorting on the final result.

```sql
SELECT
    book_title,
    sale_date,
    revenue,
    ROW_NUMBER() OVER(
        PARTITION BY sale_date
        ORDER BY revenue DESC
    ) as revenue_rank
FROM
    sale
ORDER BY
    sale_date ASC,
    revenue_rank DESC;
```

The output will now be sorted by `sale_date` and `revenue_rank`.

|          book_title | sale_date  | revenue | revenue_rank |
| ------------------: | :--------- | :------ | :----------- |
|                1984 | 2024-01-15 | 999.50  | 3            |
|    The Great Gatsby | 2024-01-15 | 1249.50 | 2            |
|          SQL Basics | 2024-01-15 | 3999.00 | 1            |
| Pride and Prejudice | 2024-01-16 | 449.70  | 3            |
|  Python Programming | 2024-01-16 | 3374.25 | 2            |
|        Data Science | 2024-01-16 | 4999.00 | 1            |
|    The Great Gatsby | 2024-01-17 | 1249.50 | 4            |
|          The Hobbit | 2024-01-17 | 1499.50 | 3            |
|     Web Development | 2024-01-17 | 2624.25 | 2            |
|          SQL Basics | 2024-01-17 | 3999.00 | 1            |

## RANK()

`RANK()` is similar to `ROW_NUMBER()`, but it handles ties (i.e. two or more rows with the same value) differently. When values are equal, they get the same rank, and the next rank skips numbers to account for the tie.

Let's rank books by copies sold:

```sql
SELECT
    book_title,
    category,
    copies_sold,
    RANK() OVER(ORDER BY copies_sold DESC) as sales_rank
FROM sale
ORDER BY sales_rank;
```

This produces the following result:

| book_title          | category  | copies_sold | sales_rank |
| :------------------ | :-------- | ----------: | ---------: |
| SQL Basics          | Technical |         100 |          1 |
| SQL Basics          | Technical |         100 |          1 |
| Data Science        | Technical |         100 |          1 |
| Web Development     | Technical |          75 |          4 |
| Python Programming  | Technical |          75 |          4 |
| The Great Gatsby    | Fiction   |          50 |          6 |
| The Great Gatsby    | Fiction   |          50 |          6 |
| The Hobbit          | Fiction   |          50 |          6 |
| 1984                | Fiction   |          50 |          6 |
| Pride and Prejudice | Fiction   |          30 |         10 |

Notice how:

- Books with `100` copies all get rank `1`
- The next rank is `4` (skipping `2` and `3`)
- Books with `50` copies all get rank `6`
- The last book gets rank `10`

## DENSE_RANK()

`DENSE_RANK()` is like `RANK()` but doesn't skip numbers for ties. It's like `RANK()` but without the gaps.

Let's see the same data with `DENSE_RANK()`:

```sql
SELECT
    book_title,
    category,
    copies_sold,
    DENSE_RANK() OVER(ORDER BY copies_sold DESC) as dense_rank
FROM sale
ORDER BY dense_rank;
```

Now we get:

| book_title          | category  | copies_sold | sales_rank |
| :------------------ | :-------- | ----------: | ---------: |
| SQL Basics          | Technical |         100 |          1 |
| SQL Basics          | Technical |         100 |          1 |
| Data Science        | Technical |         100 |          1 |
| Web Development     | Technical |          75 |          2 |
| Python Programming  | Technical |          75 |          2 |
| The Great Gatsby    | Fiction   |          50 |          3 |
| The Great Gatsby    | Fiction   |          50 |          3 |
| The Hobbit          | Fiction   |          50 |          3 |
| 1984                | Fiction   |          50 |          3 |
| Pride and Prejudice | Fiction   |          30 |          4 |

Notice how:

- Books with `100` copies still get rank `1`
- Books with `75` copies get rank `2` (no skipping)
- Books with `50` copies get rank `3`
- The last book gets rank `4`

## Combining Ranking Functions

We can combine ranking functions with `PARTITION BY` to rank within groups:

```sql
SELECT
    category,
    book_title,
    revenue,
    ROW_NUMBER() OVER(PARTITION BY category ORDER BY revenue DESC) as category_rank,
    RANK() OVER(ORDER BY revenue DESC) as overall_rank
FROM sale
ORDER BY category, category_rank;
```

This shows both category-specific and overall rankings:

| category  | book_title          | revenue | category_rank | overall_rank |
| --------- | ------------------- | ------- | ------------- | ------------ |
| Fiction   | The Great Gatsby    | 1249.50 | 1             | 5            |
| Fiction   | The Great Gatsby    | 1249.50 | 2             | 5            |
| Fiction   | The Hobbit          | 1499.50 | 3             | 4            |
| Fiction   | Pride and Prejudice | 449.70  | 4             | 10           |
| Technical | Data Science        | 4999.00 | 1             | 1            |
| Technical | SQL Basics          | 3999.00 | 2             | 2            |
| Technical | SQL Basics          | 3999.00 | 3             | 2            |
| Technical | Python Programming  | 3374.25 | 4             | 3            |

Notice how:

- `category_rank` restarts at 1 for each category
- `overall_rank` considers all books regardless of category

In the next lesson, we'll explore window frames and how they affect our calculations.
