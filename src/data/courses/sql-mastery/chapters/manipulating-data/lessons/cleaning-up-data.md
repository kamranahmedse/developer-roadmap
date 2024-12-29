---
title: Deleting Books
description: Practice removing data from a bookstore inventory
order: 135
type: challenge
setup: |
  ```sql
  CREATE TABLE books (
      id INTEGER PRIMARY KEY,
      title VARCHAR(100),
      author VARCHAR(100),
      price DECIMAL(10,2),
      stock INTEGER,
      category VARCHAR(50)
  );

  INSERT INTO books (id, title, author, price, stock, category) VALUES
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 15.99, 0, 'Fiction'),
      (2, 'SQL Basics', 'Jane Smith', 29.99, 5, 'Technical'),
      (3, '1984', 'George Orwell', 12.99, 0, 'Fiction'),
      (4, 'Poetry Collection', 'Various Authors', 19.99, 2, 'Poetry'),
      (5, 'Database Design', 'John Doe', 34.99, 0, 'Technical');
  ```
---

Given the following `books` table:

| id  | title             | author              | price | stock | category  |
| --- | ----------------- | ------------------- | ----- | ----- | --------- |
| 1   | The Great Gatsby  | F. Scott Fitzgerald | 15.99 | 0     | Fiction   |
| 2   | SQL Basics        | Jane Smith          | 29.99 | 5     | Technical |
| 3   | 1984              | George Orwell       | 12.99 | 0     | Fiction   |
| 4   | Poetry Collection | Various Authors     | 19.99 | 2     | Poetry    |
| 5   | Database Design   | John Doe            | 34.99 | 0     | Technical |

The bookstore manager wants to clean up the inventory database. Write `DELETE` statements to:

1. Remove all books that are out of stock (`stock = 0`)
2. Delete any Technical books that cost more than $30
3. Remove the book with `id = 4`

## Expected Results

After your DELETE operations, the table should look like this:

| id  | title      | author     | price | stock | category  |
| --- | ---------- | ---------- | ----- | ----- | --------- |
| 2   | SQL Basics | Jane Smith | 29.99 | 5     | Technical |

> Remember to use semicolons to separate multiple DELETE statements.
