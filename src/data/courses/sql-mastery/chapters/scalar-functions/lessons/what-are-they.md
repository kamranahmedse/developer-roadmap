---
title: What are they?
description: Learn what scalar functions are and how they can transform individual values
order: 100
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE book (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    price DECIMAL(10, 2)
  );

  INSERT INTO book (id, title, price) 
  VALUES (1, 'The Great Gatsby', 10.99),
         (2, 'To Kill a Mockingbird', 12.99),
         (3, '1984', 14.99),
         (4, 'Pride and Prejudice', 16.99),
         (5, 'The Catcher in the Rye', 18.99),
         (6, 'The Hobbit', 20.99),
         (7, 'The Lord of the Rings', 22.99),
         (8, 'The Silmarillion', 24.99),
         (9, 'The Children of Hurin', 26.99),
         (10, 'The Fall of Gondolin', 28.99);
  ```
---

In the previous chapter, we learned about aggregate functions that operate across multiple rows to produce a single result (like `SUM`, `COUNT`, `AVG`). Now, let's explore another powerful type of SQL functions - scalar functions.

## What are Scalar Functions?

Unlike aggregate functions that work across multiple rows, scalar functions operate on a single value at a time and return exactly one value per row. They're like individual data transformers that work row by row rather than summarizing data.

To understand the difference, let's look at an example:

```sql
-- Aggregate function (works across rows)
SELECT AVG(price)
FROM book; -- Returns one value for all rows

-- Scalar function (works row by row)
SELECT title, UPPER(title)
FROM book; -- Returns transformed value for each row
```

Scalar functions can be used in various parts of your SQL queries:

- `SELECT` statements
- `WHERE` clauses
- `ORDER BY` clauses
- `HAVING` clauses
- Computed columns

In this lesson we will look at several useful scalar functions. We will be covering some of the common ones in the following categories:

| Category          | Description                          |
| ----------------- | ------------------------------------ |
| String Functions  | Used to manipulate textual data      |
| Numeric Functions | Help with mathematical operations    |
| Date Functions    | Handle date and time operations      |
| Type Conversion   | Convert between different data types |
| Logical           | Handle conditional logic             |

> Note: Since we are using PostgreSQL for the editor, we will be covering the ones that are supported by PostgreSQL. Other databases mostly support the same functions but always check the documentation for your specific database.

By combining your knowledge of aggregate functions with scalar functions, you'll be able to perform both powerful data summarization and row-level transformations in your queries.
