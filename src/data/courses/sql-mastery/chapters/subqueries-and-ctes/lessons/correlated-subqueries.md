---
title: Correlated Subqueries
description: Learn how to use correlated subqueries to reference data from outer queries
order: 110
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      price DECIMAL(10,2),
      category VARCHAR(100)
  );

  CREATE TABLE sale (
      id INT PRIMARY KEY,
      book_id INT,
      sale_date DATE,
      quantity INT
  );

  INSERT INTO book (id, title, price, category) VALUES
      (1, 'SQL Basics', 29.99, 'Programming'),
      (2, 'Advanced SQL', 49.99, 'Programming'),
      (3, 'Data Science', 39.99, 'Data Analysis'),
      (4, 'Web Development', 34.99, 'Programming'),
      (5, 'Statistics 101', 24.99, 'Data Analysis');

  INSERT INTO sale (id, book_id, sale_date, quantity) VALUES
      (1, 1, '2024-01-15', 2),
      (2, 1, '2024-01-16', 1),
      (3, 2, '2024-01-15', 3),
      (4, 3, '2024-01-17', 1),
      (5, 4, '2024-01-18', 2),
      (6, 1, '2024-01-19', 1),
      (7, 2, '2024-01-20', 2),
      (8, 3, '2024-01-21', 1);
  ```
---

In our previous lesson, we learned about basic subqueries. In this lesson, we'll learn about correlated subqueries.

## What is a Correlated Subquery?

A correlated subquery is a subquery that references one or more columns from the outer query.

Unlike regular subqueries that can be executed independently, correlated subqueries are dependent on the outer query and are **executed for each row processed by the outer query**.

Let's understand this with a simple example. Say we want to see each book's price compared to the average price in its category. Query below will return the average price for each category for each book.

```sql
SELECT
    title,
    price,
    category,
    (
        SELECT ROUND(AVG(price), 2)
        FROM book b2
        -- Notice how we are referencing
        -- b1.category from the outer query
        WHERE b2.category = b1.category
    ) as category_avg_price
FROM book b1;
```

The output will look like:

| title           | price | category      | category_avg_price |
| --------------- | ----- | ------------- | ------------------ |
| SQL Basics      | 29.99 | Programming   | 38.32              |
| Advanced SQL    | 49.99 | Programming   | 38.32              |
| Data Science    | 39.99 | Data Analysis | 32.49              |
| Web Development | 34.99 | Programming   | 38.32              |
| Statistics 101  | 24.99 | Data Analysis | 32.49              |

In this query:

- The subquery to find the average price for each category references `b1.category` from the outer query
- For each book, the subquery calculates the average price for that book's category
- The subquery runs once for each row in the outer query
- We can see how each book's price compares to its category average

## Examples

Given the following `book` and `sale` tables

| id  | title           | price | category      |
| --- | --------------- | ----- | ------------- |
| 1   | SQL Basics      | 29.99 | Programming   |
| 2   | Advanced SQL    | 49.99 | Programming   |
| 3   | Data Science    | 39.99 | Data Analysis |
| 4   | Web Development | 34.99 | Programming   |
| 5   | Statistics 101  | 24.99 | Data Analysis |

| id  | book_id | sale_date  | quantity |
| --- | ------- | ---------- | -------- |
| 1   | 1       | 2024-01-15 | 2        |
| 2   | 1       | 2024-01-16 | 1        |
| 3   | 2       | 2024-01-15 | 3        |
| 4   | 3       | 2024-01-17 | 1        |
| 5   | 4       | 2024-01-18 | 2        |

Let's look at some examples of correlated subqueries.

### Finding Records with Related Data

Find books that have at least one sale:

```sql
SELECT title
FROM book b
WHERE EXISTS (
    SELECT 1
    FROM sale s
    WHERE s.book_id = b.id
);
```

### Comparing Against Group Averages

Find books priced above their category average:

```sql
SELECT title, price, category
FROM book b1
WHERE price > (
    SELECT AVG(price)
    FROM book b2
    WHERE b2.category = b1.category
);
```

### Finding Books with Recent Sale

Get the most recent sale date for each book:

```sql
SELECT
    b.title,
    b.category,
    (
        SELECT MAX(s.sale_date)
        FROM sale s
        WHERE s.book_id = b.id
    ) as last_sale_date
FROM book b;
```

## Performance Considerations

Correlated subqueries can be performance-intensive because:

- They execute once for each row in the outer query.
- Each execution of the subquery might process many rows.

Sometimes, you can rewrite correlated subqueries using JOINs for better performance. For example the examples above were mostly used to demonstrate the concept of correlated subqueries. In practice, you should use JOINs to achieve the same result:

```sql
-- Finding books with their category average price
SELECT
    b1.title,
    b1.price,
    b1.category,
    ROUND(AVG(b2.price), 2) AS category_avg_price
FROM
    book b1
INNER JOIN
    book b2
ON
    b1.category = b2.category
GROUP BY
    b1.title, b1.price, b1.category
ORDER BY category_avg_price;

-- Find the books with at least one sale
SELECT b.title
FROM book b
INNER JOIN sale s ON b.id = s.book_id;

-- Find books priced above their category average
SELECT
    b1.title,
    b1.price,
    b1.category
FROM
    book b1 INNER JOIN book b2 ON b1.category = b2.category
GROUP BY
    b1.title, b1.price, b1.category
HAVING
    b1.price > AVG(b2.price);

-- Get the most recent sale for each book
SELECT
    b.title,
    b.category,
    MAX(s.sale_date) AS last_sale_date
FROM book b
LEFT JOIN sale s ON s.book_id = b.id
GROUP BY b.title, b.category;
```

In the next lesson, we'll explore Common Table Expressions (CTEs) as an alternative way to structure complex queries.
