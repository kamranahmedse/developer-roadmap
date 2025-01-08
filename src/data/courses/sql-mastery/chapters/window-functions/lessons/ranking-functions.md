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

In our previous lessons, we learned about the `OVER` clause, `PARTITION BY`, and `ORDER BY`. Now, let's explore ranking functions, which are special window functions that assign ranks to rows based on specified ordering.

SQL provides three main ranking functions:

| Function     | Description                         |
| ------------ | ----------------------------------- |
| ROW_NUMBER() | Assigns unique sequential numbers   |
| RANK()       | Assigns ranks with gaps for ties    |
| DENSE_RANK() | Assigns ranks without gaps for ties |

Let's explore each one in detail using our bookstore data.

## ROW_NUMBER()

`ROW_NUMBER()` assigns a unique sequential number to each row within a partition. This is useful for pagination, finding the first/last occurrence of something, or getting unique sequential numbers.

Let's look at a simple example ranking books by revenue:

```sql
SELECT
    book_title,
    revenue,
    ROW_NUMBER() OVER(ORDER BY revenue DESC) as revenue_rank
FROM sale
ORDER BY revenue_rank;
```

We will get the following results:

| book_title          | revenue | revenue_rank |
| ------------------- | ------- | ------------ |
| Data Science        | 4999.00 | 1            |
| SQL Basics          | 3999.00 | 2            |
| SQL Basics          | 3999.00 | 3            |
| Python Programming  | 3374.25 | 4            |
| Web Development     | 2624.25 | 5            |
| The Hobbit          | 1499.50 | 6            |
| The Great Gatsby    | 1249.50 | 7            |
| The Great Gatsby    | 1249.50 | 8            |
| 1984                | 999.50  | 9            |
| Pride and Prejudice | 449.70  | 10           |

Looking at the results, we can see:

- Books are ordered by revenue (highest to lowest)
- Each row gets a unique number
- Even though some books have the same revenue (like SQL Basics), they get different numbers (2 and 3)

### ROW_NUMBER() with PARTITION BY

We can combine `ROW_NUMBER()` with `PARTITION BY` to number rows within categories:

```sql
SELECT
    category,
    book_title,
    revenue,
    ROW_NUMBER() OVER(
        PARTITION BY category
        ORDER BY revenue DESC
    ) as category_rank
FROM sale
ORDER BY category, category_rank;
```

This gives us the following results:

| category  | book_title          | revenue | category_rank |
| --------- | ------------------- | ------- | ------------- |
| Fiction   | The Hobbit          | 1499.50 | 1             |
| Fiction   | The Great Gatsby    | 1249.50 | 2             |
| Fiction   | The Great Gatsby    | 1249.50 | 3             |
| Fiction   | 1984                | 999.50  | 4             |
| Fiction   | Pride and Prejudice | 449.70  | 5             |
| Technical | Data Science        | 4999.00 | 1             |
| Technical | SQL Basics          | 3999.00 | 2             |
| Technical | SQL Basics          | 3999.00 | 3             |
| Technical | Python Programming  | 3374.25 | 4             |
| Technical | Web Development     | 2624.25 | 5             |

Looking at the results, we can see:

- Numbering restarts at 1 for each category
- Within each category, books are ordered by revenue
- Each book gets a unique number within its category

## RANK()

`RANK()` is similar to `ROW_NUMBER()`, but handles ties differently. When values are equal, they get the same rank, and the next rank skips numbers to account for the tie.

Let's rank books by copies sold:

```sql
SELECT
    book_title,
    copies_sold,
    RANK() OVER(ORDER BY copies_sold DESC) as sales_rank
FROM sale
ORDER BY sales_rank;
```

This produces the following results:

| book_title          | copies_sold | sales_rank |
| ------------------- | ----------- | ---------- |
| SQL Basics          | 100         | 1          |
| SQL Basics          | 100         | 1          |
| Data Science        | 100         | 1          |
| Web Development     | 75          | 4          |
| Python Programming  | 75          | 4          |
| The Great Gatsby    | 50          | 6          |
| The Great Gatsby    | 50          | 6          |
| The Hobbit          | 50          | 6          |
| 1984                | 50          | 6          |
| Pride and Prejudice | 30          | 10         |

If you look at the `sales_rank` column, you can see:

- Books with 100 copies all get rank 1
- The next rank is 4 (skipping 2 and 3) because of the two books `SQL Basics` and `Data Science` both having 100 copies
- Books with 75 copies both get rank 4
- The next rank is 6 (skipping 5)
- Books with 50 copies all get rank 6
- The last book gets rank 10

## DENSE_RANK()

`DENSE_RANK()` is like `RANK()`, but it doesn't skip numbers for ties. It's "dense" because there are no gaps in the ranking numbers.

Let's see the same data with `DENSE_RANK()`:

```sql
SELECT
    book_title,
    copies_sold,
    DENSE_RANK() OVER(ORDER BY copies_sold DESC) as dense_rank
FROM sale
ORDER BY dense_rank;
```

This gives us the following results:

| book_title          | copies_sold | dense_rank |
| ------------------- | ----------- | ---------- |
| SQL Basics          | 100         | 1          |
| SQL Basics          | 100         | 1          |
| Data Science        | 100         | 1          |
| Web Development     | 75          | 2          |
| Python Programming  | 75          | 2          |
| The Great Gatsby    | 50          | 3          |
| The Great Gatsby    | 50          | 3          |
| The Hobbit          | 50          | 3          |
| 1984                | 50          | 3          |
| Pride and Prejudice | 30          | 4          |

Looking at the results, we can see:

- Books with 100 copies still get rank 1
- Books with 75 copies get rank 2 (no skipping)
- Books with 50 copies get rank 3
- The last book gets rank 4

## Comparing All Three Functions

Let's see all three ranking functions side by side:

```sql
SELECT
    book_title,
    copies_sold,
    ROW_NUMBER() OVER(ORDER BY copies_sold DESC) as row_num,
    RANK() OVER(ORDER BY copies_sold DESC) as rank,
    DENSE_RANK() OVER(ORDER BY copies_sold DESC) as dense_rank
FROM
    sale
ORDER BY
    copies_sold DESC,
    book_title;
```

This shows us the following results:

| book_title          | copies_sold | row_num | rank | dense_rank |
| ------------------- | ----------- | ------- | ---- | ---------- |
| Data Science        | 100         | 1       | 1    | 1          |
| SQL Basics          | 100         | 2       | 1    | 1          |
| SQL Basics          | 100         | 3       | 1    | 1          |
| Python Programming  | 75          | 4       | 4    | 2          |
| Web Development     | 75          | 5       | 4    | 2          |
| 1984                | 50          | 6       | 6    | 3          |
| The Great Gatsby    | 50          | 7       | 6    | 3          |
| The Great Gatsby    | 50          | 8       | 6    | 3          |
| The Hobbit          | 50          | 9       | 6    | 3          |
| Pride and Prejudice | 30          | 10      | 10   | 4          |

The key differences between the three functions are:

- `ROW_NUMBER()` always gives unique numbers (1,2,3,4...)
- `RANK()` gives same number for ties but skips (1,1,1,4,4,6...)
- `DENSE_RANK()` gives same number for ties but doesn't skip (1,1,1,2,2,3...)

## Practical Use Cases

Here are some common scenarios where each ranking function is most useful:

- `ROW_NUMBER()` is useful for pagination (getting rows 1-10, 11-20, etc.), finding the first/last occurrence of something, or when you need unique sequential numbers

- `RANK()` is perfect for competition or sports rankings where multiple participants can tie. For example, in a race, if two runners finish in 20.5 seconds, they both get 1st place. The next runner finishing in 20.7 seconds gets 3rd place (not 2nd). This matches how real-world competitions handle ties

- `DENSE_RANK()` is perfect for grading systems or classification tiers. For example, in a class grading system, if three students score 95%, they all get rank 1. If two students score 92%, they get rank 2 (not rank 4). This matches how real-world grading systems handle ties.

In the next lesson, we'll explore window frames and how they affect our calculations.
