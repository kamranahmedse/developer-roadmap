---
title: Combining Query Results
description: Learn how to use UNION, INTERSECT, and EXCEPT to combine results from multiple queries
order: 150
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE fiction_books (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  CREATE TABLE non_fiction_books (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  INSERT INTO fiction_books (id, title, author, price)
  VALUES 
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 24.99),
      (2, '1984', 'George Orwell', 19.99),
      (3, 'Pride and Prejudice', 'Jane Austen', 15.99),
      (4, 'The Hobbit', 'J.R.R. Tolkien', 29.99),
      (5, 'The Doors of Perception', 'Aldous Huxley', 12.99);

  INSERT INTO non_fiction_books (id, title, author, price)
  VALUES 
      (1, 'A Brief History of Time', 'Stephen Hawking', 29.99),
      (2, 'The Art of War', 'Sun Tzu', 19.99),
      (3, 'Sapiens', 'Yuval Noah Harari', 24.99),
      (4, 'Pride and Prejudice: A Study Guide', 'John Smith', 12.99),
      (5, 'The Doors of Perception', 'Aldous Huxley', 12.99);

  CREATE TABLE summer_reads (
      id INT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10, 2)
  );

  INSERT INTO summer_reads (id, title, author, price)
  VALUES 
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 24.99),
      (2, 'Sapiens', 'Yuval Noah Harari', 24.99),
      (3, 'The Art of War', 'Sun Tzu', 19.99);
  ```
---

Sometimes you need to combine results from multiple queries into a single result set. SQL provides several set operations for this purpose: `UNION`, `UNION ALL`, `INTERSECT`, and `EXCEPT`.

## UNION and UNION ALL

`UNION` combines results from two or more queries and removes duplicates. `UNION ALL` does the same but keeps duplicates.

I have setup the following two tables `fiction_books` and `non_fiction_books` with the following data:

| id  | title                   | author              | price |
| --- | ----------------------- | ------------------- | ----- |
| 1   | The Great Gatsby        | F. Scott Fitzgerald | 24.99 |
| 2   | 1984                    | George Orwell       | 19.99 |
| 3   | Pride and Prejudice     | Jane Austen         | 15.99 |
| 4   | The Hobbit              | J.R.R. Tolkien      | 29.99 |
| 5   | The Doors of Perception | Aldous Huxley       | 12.99 |

| id  | title                              | author            | price |
| --- | ---------------------------------- | ----------------- | ----- |
| 1   | A Brief History of Time            | Stephen Hawking   | 29.99 |
| 2   | The Art of War                     | Sun Tzu           | 19.99 |
| 3   | Sapiens                            | Yuval Noah Harari | 24.99 |
| 4   | Pride and Prejudice: A Study Guide | John Smith        | 12.99 |
| 5   | The Doors of Perception            | Aldous Huxley     | 12.99 |

### UNION Example

Let's find all books across fiction and non-fiction categories:

```sql
SELECT title, author, price
FROM fiction_books
UNION
SELECT title, author, price
FROM non_fiction_books
ORDER BY title;
```

The query above will combine the results from both the queries and remove any duplicates. Output will be:

| title                              | author              | price |
| ---------------------------------- | ------------------- | ----- |
| 1984                               | George Orwell       | 19.99 |
| A Brief History of Time            | Stephen Hawking     | 29.99 |
| Pride and Prejudice                | Jane Austen         | 15.99 |
| Pride and Prejudice: A Study Guide | John Smith          | 12.99 |
| Sapiens                            | Yuval Noah Harari   | 24.99 |
| The Art of War                     | Sun Tzu             | 19.99 |
| The Doors of Perception            | Aldous Huxley       | 12.99 |
| The Great Gatsby                   | F. Scott Fitzgerald | 24.99 |
| The Hobbit                         | J.R.R. Tolkien      | 29.99 |

Notice how the `The Doors of Perception` book is only listed once even though it appears in both the `fiction_books` and `non_fiction_books` tables.

### UNION ALL Example

If you want to keep duplicates, use UNION ALL:

```sql
SELECT title, author, price FROM fiction_books
UNION ALL
SELECT title, author, price FROM non_fiction_books
ORDER BY title;
```

The result will be:

| title                              | author              | price |
| ---------------------------------- | ------------------- | ----- |
| 1984                               | George Orwell       | 19.99 |
| A Brief History of Time            | Stephen Hawking     | 29.99 |
| Pride and Prejudice                | Jane Austen         | 15.99 |
| Pride and Prejudice: A Study Guide | John Smith          | 12.99 |
| Sapiens                            | Yuval Noah Harari   | 24.99 |
| The Art of War                     | Sun Tzu             | 19.99 |
| The Doors of Perception            | Aldous Huxley       | 12.99 |
| The Doors of Perception            | Aldous Huxley       | 12.99 |
| The Great Gatsby                   | F. Scott Fitzgerald | 24.99 |
| The Hobbit                         | J.R.R. Tolkien      | 29.99 |

Notice how the `The Doors of Perception` book is listed twice.

## INTERSECT

`INTERSECT` returns only the rows that appear in both result sets. Let's find books that are in both the `fiction_books` and `non_fiction_books` tables:

```sql
SELECT title, author FROM fiction_books
INTERSECT
SELECT title, author FROM non_fiction_books;
```

This will return:

| title                   | author        |
| ----------------------- | ------------- |
| The Doors of Perception | Aldous Huxley |

## EXCEPT

`EXCEPT` returns rows from the first query that don't appear in the second query. Let's find the books in the `fiction_books` table that aren't in the `non_fiction_books` table:

```sql
SELECT title, author FROM fiction_books
EXCEPT
SELECT title, author FROM non_fiction_books
ORDER BY title;
```

This will return:

| title               | author              |
| ------------------- | ------------------- |
| 1984                | George Orwell       |
| Pride and Prejudice | Jane Austen         |
| The Great Gatsby    | F. Scott Fitzgerald |
| The Hobbit          | J.R.R. Tolkien      |

---

## Requirements

The key requirement for all of these set operation queries listed above is that the columns in both queries must have the same number, order, and data types.

For example, below is an invalid query:

```sql
-- ERROR: each UNION query must have the same number of columns
SELECT title, author FROM fiction_books
UNION
SELECT title, author, price FROM non_fiction_books;
```

Because the `fiction_books` table has 2 columns and the `non_fiction_books` table has 3 columns, the query will return an error.

Similary if we try to combine the following two queries:

```sql
-- ERROR: UNION types numeric and character varying cannot be matched
SELECT title, price FROM fiction_books
UNION
SELECT title, author FROM non_fiction_books;
```

This will also return an error because the `price` column from the first query doesn't have the same data type as the `author` column from the second query.

## Challenge Time! 🎯

Using the provided tables, write queries to:

1. Find all books that cost exactly $19.99 across all categories
2. List authors who have written both fiction and non-fiction books
3. Find summer reads that aren't in our fiction collection

<details>
<summary>Solution</summary>

```sql
-- 1. Books that cost $19.99
SELECT title, author, 'Fiction' as category
FROM fiction_books
WHERE price = 19.99
UNION
SELECT title, author, 'Non-Fiction' as category
FROM non_fiction_books
WHERE price = 19.99;

-- 2. Authors in both categories
SELECT author FROM fiction_books
INTERSECT
SELECT author FROM non_fiction_books;

-- 3. Summer reads not in fiction
SELECT title, author FROM summer_reads
EXCEPT
SELECT title, author FROM fiction_books;
```

</details>

## Key Takeaways

- Use UNION to combine results and remove duplicates
- Use UNION ALL when you want to keep duplicates (it's faster than UNION)
- Use INTERSECT to find common rows between results
- Use EXCEPT to find rows in one result that aren't in another
- Column count, order, and data types must match across queries
- These operations are particularly useful when working with similar but separate data sets

Remember: Choose the appropriate set operation based on your needs:

- UNION/UNION ALL for combining results
- INTERSECT for finding common elements
- EXCEPT for finding differences
