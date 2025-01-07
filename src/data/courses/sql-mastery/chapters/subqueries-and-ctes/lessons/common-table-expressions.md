---
title: Common Table Expressions
description: Learn how to use CTEs to write more readable and maintainable queries
order: 120
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
      customer_id INT,
      sale_date DATE,
      quantity INT
  );

  CREATE TABLE customer (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      joined_date DATE
  );

  INSERT INTO book (id, title, price, category) VALUES
      (1, 'SQL Basics', 29.99, 'Programming'),
      (2, 'Advanced SQL', 49.99, 'Programming'),
      (3, 'Data Science', 39.99, 'Data Analysis'),
      (4, 'Web Development', 34.99, 'Programming'),
      (5, 'Statistics 101', 24.99, 'Data Analysis');

  INSERT INTO sale (id, book_id, sale_date, quantity, customer_id) VALUES
      (1, 1, '2024-01-15', 2, 1),
      (2, 1, '2024-01-16', 1, 2),
      (3, 2, '2024-01-15', 3, 1),
      (4, 3, '2024-01-17', 1, 3),
      (5, 4, '2024-01-18', 2, 4),
      (6, 1, '2024-01-19', 1, 3),
      (7, 2, '2024-01-20', 2, 4),
      (8, 3, '2024-01-21', 1, 3);

  INSERT INTO customer (id, name, joined_date) VALUES
      (1, 'John Smith', '2023-12-01'),
      (2, 'Jane Doe', '2023-12-15'),
      (3, 'Bob Wilson', '2024-01-01'),
      (4, 'Alice Brown', '2024-01-10');
  ```
---

In our previous lessons, we've been writing queries that can sometimes get complex and hard to read. Common Table Expressions (CTEs) provide a way to break down complex queries into more manageable pieces, making them easier to understand and maintain.

## What is a CTE?

A Common Table Expression (CTE) is a temporary named result set that you can reference within a your queries. Think of it as creating a temporary view that exists only for the duration of your query.

The basic syntax for a CTE is:

```sql
WITH cte_name AS (
  -- any SELECT query here
)
-- Main query that uses the CTE
SELECT * FROM cte_name;
```

Let's look at some simple examples to get the idea.

### Example 1: Find all engineering books

Query below is a simple CTE to find all the engineering books:

```sql
WITH engineering_books AS (
    SELECT id, title, price
    FROM book
    WHERE category = 'Engineering'
)
SELECT * FROM engineering_books;
```

### Example 2: Programming books and their sales

Say we want to find all programming books and their total sales:

```sql
WITH programming_books AS (
    SELECT id, title, price
    FROM book
    WHERE category = 'Programming'
)
SELECT
    pb.title,
    COALESCE(SUM(s.quantity), 0) as total_sales
FROM programming_books pb
LEFT JOIN sale s ON s.book_id = pb.id
GROUP BY pb.id, pb.title;
```

In this example, we first create a CTE named `programming_books` that contains only programming books. Then, we use this CTE in our main query to calculate total sales.

For a simple example like this, we could have just used a simple JOIN query but for more complex queries, CTEs can help make the query more readable and maintainable.

## Benefits of CTEs

Here are some of the benefits you get when using CTEs:

- **Improved Readability**: By breaking down complex queries into named parts, the code becomes easier to understand.
- **Code Reusability**: You can reference the same CTE multiple times in your main query.
- **Better Maintenance**: When you need to modify the logic, you only need to change it in one place.

Let's look at a more complex example that demonstrates these benefits. This query calculates monthly sales statistics for books.

```sql
-- CTE 1: Calculate total sales per book per month
WITH monthly_sales AS (
    SELECT
        book_id,
        DATE_TRUNC('month', sale_date) as month,
        SUM(quantity) as total_quantity
    FROM sale
    GROUP BY book_id, DATE_TRUNC('month', sale_date)
),
-- CTE 2: Calculate statistics per category and month
book_stats AS (
    SELECT
        b.category,
        ms.month,
        SUM(ms.total_quantity) as books_sold,
        AVG(b.price * ms.total_quantity) as avg_revenue
    FROM monthly_sales ms
    INNER JOIN book b ON b.id = ms.book_id
    GROUP BY b.category, ms.month
)
-- Main query: Select and format the results
SELECT
    category,
    month,
    books_sold,
    ROUND(avg_revenue, 2) as average_revenue
FROM book_stats
ORDER BY month, category;
```

Did you notice how our query has distinct sections?

- CTE 1: Calculate total sales per book per month
- CTE 2: Calculate statistics per category and month
- Main query: Simple query to select and format the results

Now that we have 3 different simpler queries instead of one complex query, it's easier to understand and maintain.

## Multiple CTEs

As we saw in the query above, you can define multiple CTEs separated by commas. CTEs can be used in the other CTEs as well.

For example, let's say we want to find the top 3 selling books and the number of new customers (joined date > 2024-01-01) who bought them.

```sql
-- CTE 1: Find the top 3 selling books
WITH top_selling_books AS (
    SELECT
        book_id,
        SUM(quantity) AS total_sold
    FROM sale
    GROUP BY book_id
    ORDER BY SUM(quantity) DESC
    LIMIT 3
),
-- CTE 2: Find all customers who joined after 2024-01-01
recent_customers AS (
    SELECT *
    FROM customer
    WHERE joined_date >= '2024-01-01'
)
-- Main query: Find the books and the number of new customers who bought them
SELECT
    b.title,
    tsb.total_sold,
    COUNT(DISTINCT c.id) AS new_customer_count
FROM top_selling_books tsb
INNER JOIN book b ON b.id = tsb.book_id
INNER JOIN sale s ON s.book_id = tsb.book_id
INNER JOIN recent_customers c ON c.id = s.customer_id
GROUP BY b.title, tsb.total_sold;
```

## Best Practices

When using CTEs, make sure to follow these best practices:

- **Use Meaningful Names**: Give your CTEs clear, descriptive names that indicate their purpose.
- **Keep Them Focused**: Each CTE should handle one logical part of your query.
- **Consider Performance**: While CTEs improve readability, they don't necessarily improve performance. The database engine will still need to execute all the operations.

In our next lesson, we will learn how to write recursive CTEs to handle hierarchical data structures.
