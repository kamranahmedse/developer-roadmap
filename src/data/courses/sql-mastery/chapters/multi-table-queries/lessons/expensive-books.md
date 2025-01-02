---
title: Expensive Books
description: Practice creating a report with multiple tables
order: 190
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

The bookstore manager wants to analyze premium-priced books across all sections of the store. They're particularly interested in books priced above $20 to understand the distribution of higher-priced inventory across different categories. This information will help them make informed decisions about pricing strategies and premium book displays.

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

And the following data in table `summer_read`

| id  | title            | author              | price |
| --- | ---------------- | ------------------- | ----- |
| 1   | The Great Gatsby | F. Scott Fitzgerald | 24.99 |
| 2   | Sapiens          | Yuval Noah Harari   | 24.99 |
| 3   | The Art of War   | Sun Tzu             | 19.99 |

Write a query to identify all books priced above $20 across all sections. The manager wants to see:

- The book's ID
- The title
- The price
- Which section it belongs to (Fiction, Non-Fiction, or Summer Read)

Note: Some books may appear multiple times if they're featured in different sections.

## Expected Output

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
FROM fiction_book 
WHERE price > 20
UNION
SELECT id, title, price, 'Non-Fiction' as section
FROM non_fiction_book 
WHERE price > 20
UNION
SELECT id, title, price, 'Summer Read' as section
FROM summer_read 
WHERE price > 20
ORDER BY section, price DESC;
```

### Explanation

Let's break down how this query works:

First, we get expensive books from the fiction section:

```sql
SELECT id, title, price, 'Fiction' as section
FROM fiction_book 
WHERE price > 20
```

Then we use `UNION` to combine results with expensive non-fiction books:

```sql
UNION
SELECT id, title, price, 'Non-Fiction' as section
FROM non_fiction_book 
WHERE price > 20
```

And finally, we add expensive books from the summer reading list:

```sql
UNION
SELECT id, title, price, 'Summer Read' as section
FROM summer_read 
WHERE price > 20
```

The `UNION` operator combines the results from all three queries while removing any duplicates. We add a literal string value as 'section' to identify which table each book comes from.

This query helps the manager understand the distribution of premium-priced books across different sections, which can inform decisions about pricing strategies and store displays.
