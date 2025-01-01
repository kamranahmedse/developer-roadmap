---
title: Set Operator Queries
description: Learn how to use UNION, INTERSECT, and EXCEPT to combine results from multiple queries
order: 150
type: lesson-challenge
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

Let' take a look at some examples to understand how these set operations work. I have setup the following two tables `fiction_book` and `non_fiction_book` with the following data:

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

Let's start with the `UNION` operations.

`UNION` combines results from two or more queries and removes duplicates. `UNION ALL` does the same but keeps duplicates.

### UNION Example

Let's find all books across `fiction_book` and `non_fiction_book` tables using a `UNION` operation:

```sql
SELECT title, author, price
FROM fiction_book
UNION
SELECT title, author, price
FROM non_fiction_book
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

Notice how the `The Doors of Perception` book is only listed once even though it appears in both the `fiction_book` and `non_fiction_book` tables.

### UNION ALL Example

If you want to keep duplicates, use UNION ALL:

```sql
SELECT title, author, price FROM fiction_book
UNION ALL
SELECT title, author, price FROM non_fiction_book
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

`INTERSECT` returns only the rows that appear in both result sets. Let's find books that are in both the `fiction_book` and `non_fiction_book` tables:

```sql
SELECT title, author FROM fiction_book
INTERSECT
SELECT title, author FROM non_fiction_book;
```

This will return:

| title                   | author        |
| ----------------------- | ------------- |
| The Doors of Perception | Aldous Huxley |

## EXCEPT

`EXCEPT` returns rows from the first query that don't appear in the second query. Let's find the books in the `fiction_book` table that aren't in the `non_fiction_book` table:

```sql
SELECT title, author FROM fiction_book
EXCEPT
SELECT title, author FROM non_fiction_book
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
SELECT title, author FROM fiction_book
UNION
SELECT title, author, price FROM non_fiction_book;
```

The above query will return an error because the `fiction_book` table has 2 columns and the `non_fiction_book` table has 3 columns.

Similary if we try to combine the following two queries:

```sql
-- ERROR: UNION types numeric and character varying cannot be matched
SELECT title, price FROM fiction_book
UNION
SELECT title, author FROM non_fiction_book;
```

This will also return an error because the `price` column from the first query doesn't have the same data type as the `author` column from the second query.

Also, another important thing to note for the set operations is that the column names in the result set will be the column names from the first query. For example, if we run the following query:

```sql
SELECT title, author as 'writer_name' FROM fiction_book
UNION
SELECT title, author FROM non_fiction_book;
```

The output will be:

| title                              | writer_name         |
| ---------------------------------- | ------------------- |
| A Brief History of Time            | Stephen Hawking     |
| The Hobbit                         | J.R.R. Tolkien      |
| The Great Gatsby                   | F. Scott Fitzgerald |
| Sapiens                            | Yuval Noah Harari   |
| The Art of War                     | Sun Tzu             |
| Pride and Prejudice: A Study Guide | John Smith          |
| 1984                               | George Orwell       |
| The Doors of Perception            | Aldous Huxley       |
| Pride and Prejudice                | Jane Austen         |

Notice how it took the `writer_name` column alias from the first query for the name of the column in the result set.

---

Remember to practice the queries above in the editor. Feel free to create your own tables and data to practice with. In the next lesson we will look at Views.
