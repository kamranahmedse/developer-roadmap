---
title: What are Subqueries?
description: Learn what subqueries are and how to use them effectively in your SQL queries
order: 100
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
      (5, 4, '2024-01-18', 2);
  ```
---

So far in this course, we've written queries that directly access data from tables. We also looked at JOINs and Set operations that allowed us to combine data from multiple tables. We also looked at views that help create virtual tables and simplify complex queries.

However, there are times when we need to use the result of one query as part of another query. This is where subqueries come in.

## What is a Subquery?

A subquery (also known as a nested query or inner query) is a **query nested inside another query**. The subquery is executed first, and its result is used by the main (outer) query.

Let's understand this with an example. Say we want to find all books that are priced above the average book price. We can break this down into two steps:

1. Calculate the average price of all books
2. Find books priced above this average

We could do this with two separate queries:

```sql
-- Step 1: Calculate average price
SELECT AVG(price) FROM book;
-- Returns: 35.99

-- Step 2: Find books above this price
SELECT title, price
FROM book
WHERE price > 35.99;
```

But with a subquery, we can combine these into a single query:

```sql
SELECT title, price
FROM book
WHERE price > (
    SELECT AVG(price)
    FROM book
);
```

## Types of Subqueries

Subqueries can be classified into one of the following categories:

- Scalar subqueries
- Row subqueries
- Table subqueries

Let's look at each of these in more detail with examples. We will be using the `book` and `sale` tables for our examples.

> `book` table has the following data:

| id  | title           | price | category      |
| --- | --------------- | ----- | ------------- |
| 1   | SQL Basics      | 29.99 | Programming   |
| 2   | Advanced SQL    | 49.99 | Programming   |
| 3   | Data Science    | 39.99 | Data Analysis |
| 4   | Web Development | 34.99 | Programming   |
| 5   | Statistics 101  | 24.99 | Data Analysis |

> `sale` table has the following data:

| id  | book_id | sale_date  | quantity |
| --- | ------- | ---------- | -------- |
| 1   | 1       | 2024-01-15 | 2        |
| 2   | 1       | 2024-01-16 | 1        |
| 3   | 2       | 2024-01-15 | 3        |
| 4   | 3       | 2024-01-17 | 1        |
| 5   | 4       | 2024-01-18 | 2        |

### Scalar Subqueries

These return a single value i.e. one row and one column. The example we saw above is a scalar subquery.

Here is another example where we find books that cost more than the `Statistics 101` book:

```sql
SELECT title, price
FROM book
WHERE price > (
    SELECT price
    FROM book
    WHERE title = 'Statistics 101'
);
```

Apart from the `WHERE` clause, scalar subqueries can also be used in the `SELECT` clause. Here is another example calculating the price difference between a book and the average price of all books.

```sql
SELECT title, price,
    price - (
        SELECT AVG(price)
        FROM book
    ) as price_diff
FROM book;
```

### Row Subqueries

Unlike scalar subqueries, which return a single row and single column, row subqueries may return one or more rows involving one or more columns.

#### Using the `IN` Operator

If you recall, we used the `IN` operator to check if a value exists in a set of results. Row subqueries are often used with the `IN` operator to check if a value exists in a set of results.

In the example below, we find all books that have been sold:

```sql
-- Find all books that have been sold
SELECT title, price
FROM book
WHERE id IN (
    SELECT DISTINCT book_id
    FROM sale
);
```

> ### Use Subqueries Sparingly
>
> When using subqueries, it is sometimes possible to achieve the same result using JOINs. For example, the query above can be rewritten using a JOIN as follows:
>
> ```sql
> SELECT b.title, b.price
> FROM book b
> INNER JOIN sale s ON b.id = s.book_id
> GROUP BY b.title, b.price;
> ```
>
> When possible, you should prefer using JOINs over subqueries where possible because of their better performance. We will learn more about performance considerations in the later lessons.

Similarly, you can use the `NOT IN` operator to find books that have not been sold:

```sql
SELECT title, price
FROM book
WHERE id NOT IN (
    SELECT DISTINCT book_id
    FROM sale
);
```

#### Using the `EXISTS` Operator

The `EXISTS` operator is another powerful way to use row subqueries. It checks whether the subquery returns any rows.

For example, to find books from the Programming category that cost more than $40:

```sql
SELECT title
FROM book
WHERE EXISTS (
    SELECT 1
    FROM book
    WHERE category = 'Programming'
    AND price > 40
);
```

The query above will return books where the subquery condition is met. The opposite of `EXISTS` is `NOT EXISTS` which returns results when the subquery returns no rows.

#### Multiple Column Subqueries

It is possible to return multiple columns from a subquery.

Here is an example where we find books that match the price and category of any Data Analysis books:

```sql
SELECT title, price, category
FROM book
WHERE (price, category) IN (
    SELECT price, category
    FROM book
    WHERE category = 'Data Analysis'
);
```

### Table Subqueries

Table subqueries return a table as the result. They are often used in the `FROM` clause. Here is an example where we find the average price by category:

```sql
SELECT category, avg_price
FROM (
    SELECT category, AVG(price) as avg_price
    FROM book
    GROUP BY category
) category_stats;
```

Another common use case for table subqueries is DML operations. For example, you can use a table subquery to insert data into a table.

In the example below we have created another table `engineering_books` and we want to insert data into it from the `book` table where the category is `Programming`.

```sql
CREATE TABLE engineering_books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price DECIMAL(10,2)
);

-- insert into engineering_books what we select from
-- the book table where the category is 'Programming'
INSERT INTO engineering_books (title, price)
SELECT title, price
FROM book
WHERE category = 'Programming';
```

## Where Can Subqueries Be Used?

Subqueries can appear in different parts of a SQL statement.

### In the WHERE Clause

We have already seen some examples of subqueries in the `WHERE` clause. Here is another example where we find the books that have been sold on a specific date:

```sql
SELECT title
FROM book
WHERE id IN (
    SELECT book_id
    FROM sale
    WHERE sale_date = '2024-01-15'
);
```

### In the FROM Clause

Here is an example where we find the average price of books in each category:

```sql
SELECT category, avg_price
FROM (
    SELECT category, AVG(price) as avg_price
    FROM book
    GROUP BY category
) category_stats;
```

### In the SELECT Clause

Subqueries can be used in the SELECT clause to calculate values for each row. Here's an example where we show each book's price and its difference from the average price:

```sql
SELECT
    title,
    price,
    (SELECT AVG(price) FROM book) as avg_price,
    price - (SELECT AVG(price) FROM book) as price_difference
FROM book;
```

## When to Use Subqueries

Subqueries are particularly useful when you need to:

- Perform calculations and use the result in the main query
- Compare values against aggregated results
- Filter data based on results from another query
- Transform data before using it in the main query

We will look at some more examples of subqueries in the later lessons so you can get a better feel for when to use them.

However, sometimes you can achieve the same result using JOINs. The choice between subqueries and JOINs often depends on:

- **Readability**: Sometimes subqueries make the logic clearer
- **Performance**: JOINs are often more efficient
- **Functionality**: Some operations can only be done with subqueries

In the next lesson, we'll look at correlated subqueries, which are a special type of subquery that references columns from the outer query.
