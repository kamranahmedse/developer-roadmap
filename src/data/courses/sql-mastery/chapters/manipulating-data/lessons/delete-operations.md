---
title: DELETE Operations
description: Learn how to delete data from a table.
order: 130
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

A `DELETE` statement is used to remove rows from a table. Let's look at different ways to delete data from our `books` table:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |
| 4   | Animal Farm           | George Orwell       | 9.99  |

### Deleting a Single Row

To delete a specific book, we can use:

```sql
DELETE FROM books
WHERE id = 1;
```

This will remove 'The Great Gatsby' from the table:

| id  | title                 | author        | price |
| --- | --------------------- | ------------- | ----- |
| 2   | 1984                  | George Orwell | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee    | 8.99  |
| 4   | Animal Farm           | George Orwell | 9.99  |

### Deleting Multiple Rows

You can delete all books by a specific author:

```sql
DELETE FROM books
WHERE author = 'George Orwell';
```

### Deleting with Complex Conditions

You can use various conditions to target specific rows:

```sql
-- Delete books that cost more than $10
DELETE FROM books
WHERE price > 10;

-- Delete books with specific titles
DELETE FROM books
WHERE title IN ('1984', 'Animal Farm');

-- Delete books based on multiple conditions
DELETE FROM books
WHERE author = 'George Orwell'
AND price < 10;
```

### Deleting All Rows

To delete all rows from a table, you can use:

```sql
DELETE FROM books;
```

> ⚠️ Warning: Be very careful with this command! It will remove all data from the table. Some database systems require you to explicitly enable this operation to prevent accidents.

### DELETE vs TRUNCATE

In the next chapter, we will learn about `TRUNCATE` to remove all the rows from a table. You can use `DELETE` to achieve the same result i.e. both of the following will achieve the same result:

```sql
DELETE FROM books;
TRUNCATE TABLE books;
```

However, without going into much detail, `TRUNCATE` is faster than `DELETE` when removing all rows from a table. On the other hand, `DELETE` is more flexible and allows you to roll back the operation if needed (when using transactions, which we will learn about in future chapters).

> 💡 Use `TRUNCATE` when you want to quickly remove all data and reset the table to its initial state. Use `DELETE` when you need transaction control or when removing specific rows.

---

## Challenge

Using the `books` table with the following data:

| id  | title                 | author              | price |
| --- | --------------------- | ------------------- | ----- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald | 10.99 |
| 2   | 1984                  | George Orwell       | 12.99 |
| 3   | To Kill a Mockingbird | Harper Lee          | 8.99  |
| 4   | Animal Farm           | George Orwell       | 9.99  |

Write the following `DELETE` statements:

1. Delete all books that cost more than `10`
2. Delete all books by `George Orwell`
3. Delete the book with `id = 3`

> Remember to use semicolons to separate multiple `DELETE` statements.
