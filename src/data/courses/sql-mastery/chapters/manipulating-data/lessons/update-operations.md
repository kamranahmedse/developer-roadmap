---
title: UPDATE Operations
description: Learn how to update data in a table.
order: 110
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE books (
      id INTEGER PRIMARY KEY,
      title VARCHAR(100),
      author VARCHAR(100),
      price DECIMAL(10,2)
  );

  INSERT INTO books (id, title, author, price) VALUES
      (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
      (2, '1984', 'George Orwell', 12.99),
      (3, 'To Kill a Mockingbird', 'Harper Lee', 8.99),
      (4, 'Animal Farm', 'George Orwell', 9.99);
  ```
---

An `UPDATE` statement is used to change the values of one or more columns in existing rows. For example, let's say we have the same `books` table from the previous lesson with the following data:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |
| 4   | Animal Farm           | George Orwell       | 9.99  |

### Updating a Single Row

To update a specific book's price, we can use:

```sql
UPDATE books
SET price = 11.99
WHERE id = 1;
```

This will update only the price of `The Great Gatsby`:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 11.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |
| 4   | Animal Farm           | George Orwell       | 9.99  |

### Updating Multiple Columns

You can update multiple columns in a single statement:

```sql
UPDATE books
SET title = 'Nineteen Eighty-Four',
    price = 13.99
WHERE id = 2;
```

### Updating Multiple Rows

You can update all books by a specific author:

```sql
UPDATE books
SET price = price + 2.00
WHERE author = 'George Orwell';
```

### Using Expressions in Updates

You can use expressions and calculations in your updates:

```sql
-- Give a $1 discount to all books over $10
UPDATE books
SET price = price - 1
WHERE price > 10;

-- Add "(Classic Edition)" to all titles
UPDATE books
SET title = CONCAT(title, ' (Classic Edition)');
```

> `CONCAT` is a function that concatenates two strings.

### Updating All Rows

You can update all rows by omitting the WHERE clause:

```sql
UPDATE books
SET price = price + 1;
```

> ⚠️ Warning: Be careful when updating all rows! Some database systems require you to explicitly enable this operation to prevent accidents. It's good practice to first run a SELECT query to verify which rows will be affected.

---

## Challenge

I have created a `books` table with the following data:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |

Write the following `UPDATE` statements:

1. Increase the price of all books by `1`
2. Add `(Paperback)` to book titles that cost less than `12`
3. Update and set the author name to `Fitzgerald` for all the books by `F. Scott Fitzgerald`

> You can run multiple `UPDATE` statements in a single query. Just separate them with a semicolon.
