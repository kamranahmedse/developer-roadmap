---
title: Dropping and Truncating
description: Learn about dropping tables and truncating data in PostgreSQL.
order: 180
type: lesson-challenge
---

There are times when we need to perform destructive operations on our tables such as removing a table (aka dropping a table) or removing all the data from a table (aka truncating a table).

In this final lesson of the chapter, we will look at different ways to perform these operations.

## Dropping Tables

Dropping a table removes the table and all its data from the database. The syntax for dropping a table is as follows:

```sql
DROP TABLE table_name;
```

Given below is a sample query to drop the `books` table:

```sql
DROP TABLE books;
```

### Error Handling with DROP TABLE

If you try to drop a table that doesn't exist, you'll get an error. To prevent this, you can use the `IF EXISTS` clause:

```sql
DROP TABLE IF EXISTS books;
```

## Truncating Tables

The `TRUNCATE` statement removes all rows from a table but keeps the table structure intact. For example:

```sql
TRUNCATE TABLE orders;
```

This will remove all the rows from the `orders` table but the table structure will remain intact.

### RESTART IDENTITY

If you have a table with an auto-incrementing column e.g. in the `books` table below, we have an `id` column that is set to auto-increment (i.e. `SERIAL`).

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255)
);

-- Inserting 3 rows into the books table
INSERT INTO books (title, author)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald'),
       ('1984', 'George Orwell'),
       ('To Kill a Mockingbird', 'Harper Lee');

-- Selecting all the rows from the books table
SELECT * FROM books;
```

The `books` table will look like this after the above queries:

| id  | title                 | author              |
| --- | --------------------- | ------------------- |
| 1   | The Great Gatsby      | F. Scott Fitzgerald |
| 2   | 1984                  | George Orwell       |
| 3   | To Kill a Mockingbird | Harper Lee          |

Because the `id` column is set to auto-increment, the next time we insert a new book, the `id` column will start from 4 and so on.

If we now truncate the `books` table, and start inserting new books, the `id` column will still start from 4 and so on.

```sql
-- Truncating the books table
TRUNCATE TABLE books;

-- Inserting 3 new rows into the books table
INSERT INTO books (title, author)
VALUES ('The Catcher in the Rye', 'J.D. Salinger'),
       ('Pride and Prejudice', 'Jane Austen'),
       ('The Hobbit', 'J.R.R. Tolkien');

-- Selecting all the rows from the books table
SELECT * FROM books;
```

The output will be:

| id  | title                  | author         |
| --- | ---------------------- | -------------- |
| 4   | The Catcher in the Rye | J.D. Salinger  |
| 5   | Pride and Prejudice    | Jane Austen    |
| 6   | The Hobbit             | J.R.R. Tolkien |

Notice that even though we truncated the `books` table, the `id` column still started from 4 and so on. This is because by default, `TRUNCATE` doesn't reset the auto-increment counter.

To reset the auto-increment counter, you can use the `RESTART IDENTITY` clause. This will reset the auto-increment counter to 1.

```sql
-- Reset auto-increment counter
TRUNCATE TABLE books RESTART IDENTITY;

INSERT INTO books (title, author)
VALUES ('The Catcher in the Rye', 'J.D. Salinger'),
       ('Pride and Prejudice', 'Jane Austen'),
       ('The Hobbit', 'J.R.R. Tolkien');

SELECT * FROM books;
```

The output will be:

| id  | title                  | author         |
| --- | ---------------------- | -------------- |
| 1   | The Catcher in the Rye | J.D. Salinger  |
| 2   | Pride and Prejudice    | Jane Austen    |
| 3   | The Hobbit             | J.R.R. Tolkien |

The opposite of `RESTART IDENTITY` is `CONTINUE IDENTITY`. This will keep the current auto-increment counter value.

```sql
TRUNCATE TABLE books CONTINUE IDENTITY;

INSERT INTO books (title, author)
VALUES ('The Catcher in the Rye', 'J.D. Salinger'),
       ('Pride and Prejudice', 'Jane Austen'),
       ('The Hobbit', 'J.R.R. Tolkien');

SELECT * FROM books;
```

The output will now be:

| id  | title                  | author         |
| --- | ---------------------- | -------------- |
| 4   | The Catcher in the Rye | J.D. Salinger  |
| 5   | Pride and Prejudice    | Jane Austen    |
| 6   | The Hobbit             | J.R.R. Tolkien |

Notice how the `id` column started from 4 and so on.

---

Remember, both `DROP` and `TRUNCATE` are destructive operations that cannot be undone. Always double-check before executing these commands in a production environment!