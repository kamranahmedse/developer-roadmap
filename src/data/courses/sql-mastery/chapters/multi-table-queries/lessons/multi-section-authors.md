---
title: Multi-Section Authors
description: Practice creating a report with multiple tables
order: 180
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
  ```
---

The bookstore is organizing a special "Genre-Crossing Authors" showcase to highlight versatile writers who have published both fiction and non-fiction works. The marketing team believes these authors might attract readers interested in exploring different genres. Your task is to help identify authors who have books in both sections of the store.

Given the following data in table `fiction_book`

| id  | title                   | author              | price |
| --- | ----------------------- | ------------------- | ----- |
| 1   | The Great Gatsby        | F. Scott Fitzgerald | 24.99 |
| 2   | 1984                    | George Orwell       | 19.99 |
| 3   | Pride and Prejudice     | Jane Austen         | 15.99 |
| 4   | The Hobbit              | J.R.R. Tolkien      | 29.99 |
| 5   | The Doors of Perception | Aldous Huxley       | 12.99 |

And the following data in table `non_fiction_book`

| id  | title                              | author            | price |
| --- | ---------------------------------- | ----------------- | ----- |
| 1   | A Brief History of Time            | Stephen Hawking   | 29.99 |
| 2   | The Art of War                     | Sun Tzu           | 19.99 |
| 3   | Sapiens                            | Yuval Noah Harari | 24.99 |
| 4   | Pride and Prejudice: A Study Guide | John Smith        | 12.99 |
| 5   | The Doors of Perception            | Aldous Huxley     | 12.99 |

Write a query to identify authors who have published works in both fiction and non-fiction categories. The marketing team wants to see:

- The author's name

## Expected Output

| author        |
| ------------- |
| Aldous Huxley |

## Solution

```sql
SELECT author
FROM fiction_book
INTERSECT
SELECT author
FROM non_fiction_book;
```

### Explanation

Let's break down how this query works:

First, we get all authors from the fiction books table:

```sql
SELECT author
FROM fiction_book
```

Then we use `INTERSECT` to find authors that also appear in the non-fiction books table:

```sql
INTERSECT
SELECT author
FROM non_fiction_book
```

The `INTERSECT` operator returns only the values that appear in both queries. This effectively finds authors who have written both fiction and non-fiction books.

This query helps the marketing team identify versatile authors who have crossed genres, allowing them to create targeted promotions and displays that showcase the diverse works of these authors.
