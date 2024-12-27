---
title: Primary Key Constraint
description: Learn about primary keys and how to use them effectively.
order: 160
type: lesson-challenge
---

In our previous lessons, we learned about various constraints that help maintain data integrity. In this lesson, we'll look at two of the most important constraints in SQL: Primary Keys and Foreign Keys.

## Primary Keys

A primary key is a column (or a combination of columns) that uniquely identifies each row in a table. Think of it as a unique ID that helps us reference specific rows in our table.

Here's an example of a table with a primary key:

```sql
-- Creating a table with a primary key
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  price DECIMAL(10, 2)
);
```

Alternatively, there are two other syntaxes for creating primary keys:

```sql
-- Define primary key in the constratins section
CREATE TABLE books (
  id INTEGER,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  price DECIMAL(10, 2),

  PRIMARY KEY (id)
);

-- You can also name the constraint so that database
-- shows it in the error messages
CREATE TABLE books (
  id INTEGER,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  price DECIMAL(10, 2),

  CONSTRAINT books_identifier PRIMARY KEY (id)
  --         -------^--------
  --      Name of the constraint
);
```

In this example, the `id` column is our primary key. Each book in the table must have a unique `id` value. For example, if we try to insert a book without and `id`, it will fail:

```sql
-- Error: Null value in column 'id' violates not-null constraint
-- Primary key columns cannot be null
INSERT INTO books (title, isbn, price)
VALUES ('Book 1', '1234567890123', 19.99);
```

Similarly, if we try to insert a book with an existing `id`, it will fail:

```sql
-- Error: duplicate key value violates unique constraint "books_pkey"
INSERT INTO books (id, title, isbn, price)
VALUES (1, 'Book 1', 'xxxxxxxxxxxxx', 9.99),
       (1, 'Book 2', 'yyyyyyyyyyyyy', 20.99);
```

### Why are Primary Keys Important?

In our previous lessons, we haven't been creating primary keys as I was postponing this lesson until now. But it is highly recommended to define primary keys for each table, because:

- They help **uniquely identify** each row in a table.
- We can prevent **duplicate rows** from being inserted.
- They can be used to create **relationships** between tables.
- Primary keys are **indexed by default**, resulting in **improved query performance**.

We will learn about indexes in the future lessons.

### Auto-generating Primary Keys

Most databases provide a way to automatically generate primary key values. It is not a part of the SQL standard, but many databases have their own syntax for it e.g.

| Database   | Syntax           |
| ---------- | ---------------- |
| PostgreSQL | `SERIAL`         |
| MySQL      | `AUTO_INCREMENT` |
| SQLite     | `AUTOINCREMENT`  |
| SQL Server | `IDENTITY`       |
| Oracle     | `SEQUENCE`       |

The example below shows how to create a table with a primary key that is auto-generated in PostgreSQL:

```sql
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE
);

-- Now we can insert without specifying id
INSERT INTO authors (name, email)
VALUES ('J.K. Rowling', 'jk@example.com'),
       ('Stephen King', 'stephen@example.com'),
       ('Agatha Christie', 'agatha@example.com');
```

Now if we fetch all the rows from the `authors` table:

```sql
SELECT * FROM authors;
```

We will see the auto-generated `id` values for each row:

| id  | name            | email               |
| --- | --------------- | ------------------- |
| 1   | J.K. Rowling    | jk@example.com      |
| 2   | Stephen King    | stephen@example.com |
| 3   | Agatha Christie | agatha@example.com  |

The database will automatically assign and increment the `id` value for each new row.

### Composite Primary Keys

Sometimes, you might need multiple columns to uniquely identify a row. This is called a composite primary key:

```sql
CREATE TABLE book_editions (
  book_id INTEGER,
  edition_number INTEGER,
  publication_year INTEGER,

  -- Creating a composite primary key
  PRIMARY KEY (book_id, edition_number)
);
```

In this case, a specific edition of a book is uniquely identified by both its `book_id` and `edition_number`. We can't insert a row with the same `book_id` and `edition_number` twice.

For example, if we try to insert a row with the same `book_id` and `edition_number`:

```sql
-- Error: duplicate key value violates unique constraint "book_editions_pkey"
INSERT INTO book_editions (book_id, edition_number, publication_year)
VALUES (1, 1, 2020),
       (1, 1, 2021);
```

If we try to insert a row with a different `book_id`:

```sql
-- This will work because the combination of book_id and edition_number is unique
INSERT INTO book_editions (book_id, edition_number, publication_year)
VALUES (1, 1, 2020),
       (2, 1, 2021);
```

While we are on the topic of primary keys and uniqueness, let's also look at the `UNIQUE` constraint which can be used to enforce uniqueness on any column or a combination of columns.

## UNIQUE Constraint

While primary keys enforce uniqueness, sometimes you need other columns to be unique as well. The `UNIQUE` constraint ensures no duplicate values can exist in a column:

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) UNIQUE, -- This column must be unique
  price DECIMAL(10, 2),
);
```

Again, just like any other constraint, here is the alternative syntax:

```sql
-- Define in constraints section
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  price DECIMAL(10, 2),

  CONSTRAINT books_isbn_unique UNIQUE (isbn)
);

-- Or without naming the constraint
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  price DECIMAL(10, 2),

  UNIQUE (isbn)
);
```

In this example, `isbn` must be unique across all rows. For example, if we try to insert a row with the same `isbn`:

```sql
-- Error: duplicate key value violates unique constraint "books_isbn_unique"
INSERT INTO books (id, title, isbn, price)
VALUES (1, 'Book 1', '1234567890123', 19.99),
       (2, 'Book 2', '1234567890123', 20.99);
```

> The difference between `UNIQUE` and `PRIMARY KEY` is that a table can have multiple `UNIQUE` columns but only one primary key, `UNIQUE` columns can also contain `NULL` values (unless specified otherwise), while primary keys cannot contain `NULL` values.

### NULL Considered UNIQUE

By default, `UNIQUE` constraint allows `NULL` values. You can change that behavior by adding `NULLS NOT DISTINCT` to the constraint i.e.

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) UNIQUE NULLS NOT DISTINCT,
  --                      ---------^--------
  price DECIMAL(10, 2),
);
```

In this case, `NULL` values are not considered unique and you will get an error if you try to have multiple rows with `NULL` values in the `isbn` column e.g.

```sql
-- Error: We are trying to insert two rows with NULL values in the isbn column
INSERT INTO books (id, title, isbn, price)
VALUES (1, 'Book 1', "XYZ", 19.99),
       (2, 'Book 2', NULL, 20.99),
       (3, 'Book 3', NULL, 21.99);
```
