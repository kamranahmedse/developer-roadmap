---
title: Expensive Books
description: Practice creating a report with multiple tables
order: 110
type: challenge
setup: |
  ```sql
  CREATE TABLE fiction_book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  CREATE TABLE non_fiction_book (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  INSERT INTO fiction_book (id, title, author, price)
  VALUES 
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 24.99),
      (2, '1984', 'George Orwell', 19.99),
      (3, 'Pride and Prejudice', 'Jane Austen', 15.99),
      (4, 'The Hobbit', 'J.R.R. Tolkien', 29.99),
      (5, 'The Doors of Perception', 'Aldous Huxley', 12.99);

  INSERT INTO non_fiction_book (id, title, author, price)
  VALUES 
      (1, 'A Brief History of Time', 'Stephen Hawking', 29.99),
      (2, 'The Art of War', 'Sun Tzu', 19.99),
      (3, 'Sapiens', 'Yuval Noah Harari', 24.99),
      (4, 'Pride and Prejudice: A Study Guide', 'John Smith', 12.99),
      (5, 'The Doors of Perception', 'Aldous Huxley', 12.99);

  CREATE TABLE summer_read (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  INSERT INTO summer_read (id, title, author, price)
  VALUES 
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 24.99),
      (2, 'Sapiens', 'Yuval Noah Harari', 24.99),
      (3, 'The Art of War', 'Sun Tzu', 19.99);
  ```
---

Given the following three tables with the given data:

> `fiction_book` table has the following data:

| id  | title                   | author              | price |
| --- | ----------------------- | ------------------- | ----- |
| 1   | The Great Gatsby        | F. Scott Fitzgerald | 24.99 |
| 2   | 1984                    | George Orwell       | 19.99 |
| 3   | Pride and Prejudice     | Jane Austen         | 15.99 |
| 4   | The Hobbit              | J.R.R. Tolkien      | 29.99 |
| 5   | The Doors of Perception | Aldous Huxley       | 12.99 |

> `non_fiction_book` table looks like this:

| id  | title                              | author            | price |
| --- | ---------------------------------- | ----------------- | ----- |
| 1   | A Brief History of Time            | Stephen Hawking   | 29.99 |
| 2   | The Art of War                     | Sun Tzu           | 19.99 |
| 3   | Sapiens                            | Yuval Noah Harari | 24.99 |
| 4   | Pride and Prejudice: A Study Guide | John Smith        | 12.99 |
| 5   | The Doors of Perception            | Aldous Huxley     | 12.99 |

> `summer_read` table has the following data:

| id  | title            | author              | price |
| --- | ---------------- | ------------------- | ----- |
| 1   | The Great Gatsby | F. Scott Fitzgerald | 24.99 |
| 2   | Sapiens          | Yuval Noah Harari   | 24.99 |
| 3   | The Art of War   | Sun Tzu             | 19.99 |

Write a query to find the books in all three tables that cost more than $20 along with their section i.e. `Fiction`, `Non-Fiction`, and `Summer Read`.

> It's okay if the books are repeated in the result set. Important thing is to show the section and the book details.

## Expected Results

Your output should look like this:

| id  | title                   | price | section     |
| --- | ----------------------- | ----- | ----------- |
| 4   | The Hobbit              | 29.99 | Fiction     |
| 1   | The Great Gatsby        | 24.99 | Fiction     |
| 1   | A Brief History of Time | 29.99 | Non-Fiction |
| 1   | The Great Gatsby        | 24.99 | Summer Read |
| 2   | Sapiens                 | 24.99 | Summer Read |
| 3   | Sapiens                 | 24.99 | Non-Fiction |

## Solution

```sql
SELECT id, title, price, 'Fiction' as section
FROM fiction_book WHERE price > 20
UNION
SELECT id, title, price, 'Non-Fiction' as section
FROM non_fiction_book WHERE price > 20
UNION
SELECT id, title, price, 'Summer Read' as section
FROM summer_read WHERE price > 20
```
