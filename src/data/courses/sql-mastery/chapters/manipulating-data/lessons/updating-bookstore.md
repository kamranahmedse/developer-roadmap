---
title: Updating Bookstore
description: Practice updating multiple rows with different conditions
order: 120
type: challenge
setup: |
  ```sql
  CREATE TABLE books (
      id INTEGER PRIMARY KEY,
      title VARCHAR(100),
      category VARCHAR(50),
      price DECIMAL(10,2),
      stock INTEGER
  );

  INSERT INTO books (id, title, category, price, stock) VALUES
      (1, 'The Great Gatsby', 'Fiction', 24.99, 15),
      (2, 'SQL Basics', 'Technical', 39.99, 8),
      (3, '1984', 'Fiction', 19.99, 12),
      (4, 'Poetry Collection', 'Poetry', 14.99, 50),
      (5, 'Database Design', 'Technical', 44.99, 20);
  ```
---

Given the following `books` table:

| id  | title             | category  | price | stock |
| --- | ----------------- | --------- | ----- | ----- |
| 1   | The Great Gatsby  | Fiction   | 24.99 | 15    |
| 2   | SQL Basics        | Technical | 39.99 | 8     |
| 3   | 1984              | Fiction   | 19.99 | 12    |
| 4   | Poetry Collection | Poetry    | 14.99 | 50    |
| 5   | Database Design   | Technical | 44.99 | 20    |

Write the following update statements to make updates to the table:

1. Write a query to apply a 25% discount to all `Technical` books (multiply the price by 0.75)
2. Write another query to add "(Sale Edition)" to the titles of books that cost more than $25 after the previous update.
3. Write a final query to increase the stock of books with less than 10 in stock by 5.

## Expected Results

After your updates, the table should look like this:

| id  | title                         | category  | price | stock |
| --- | ----------------------------- | --------- | ----- | ----- |
| 1   | The Great Gatsby              | Fiction   | 24.99 | 15    |
| 3   | 1984                          | Fiction   | 19.99 | 12    |
| 4   | Poetry Collection             | Poetry    | 14.99 | 50    |
| 5   | Database Design(Sale Edition) | Technical | 33.74 | 20    |
| 2   | SQL Basics(Sale Edition)      | Technical | 29.99 | 13    |

> You can run multiple UPDATE statements in a single query. Just separate them with a semicolon.
