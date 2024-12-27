---
title: Foreign Key Constraint
description: Learn about foreign keys and how to use them effectively.
order: 170
type: lesson-challenge
---

## Foreign Keys

A foreign key is a column (or columns) that references the primary key of another table. It creates a relationship between tables and helps maintain referential integrity.

Let's look at an example:

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER,

  -- Creating a foreign key
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

In this example:

- The `author_id` in the `books` table is a foreign key
- It references the `id` column in the `authors` table
- This creates a relationship between books and their authors

### Why are Foreign Keys Important?

Foreign keys help maintain data integrity by:

1. Ensuring referenced data exists
2. Preventing orphaned records
3. Maintaining relationships between tables

Here's a practical example:

```sql
-- Create the authors table first
CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(100) UNIQUE
);

-- Create the books table with a foreign key
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER,
  price DECIMAL(10, 2),

  FOREIGN KEY (author_id) REFERENCES authors(id)
    ON DELETE SET NULL    -- Optional: what to do when referenced author is deleted
    ON UPDATE CASCADE     -- Optional: what to do when referenced author id is updated
);

-- Now we can't add a book with an non-existent author_id
INSERT INTO books (title, author_id, price)
VALUES ('Invalid Book', 999, 29.99);  -- This will fail if author 999 doesn't exist
```

### Foreign Key Actions

When you create a foreign key, you can specify what should happen when the referenced record is deleted or updated:

| Action      | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `CASCADE`   | Delete/update the child records when parent record is deleted/updated |
| `SET NULL`  | Set the foreign key to NULL when parent record is deleted/updated     |
| `RESTRICT`  | Prevent deletion/update of parent record if child records exist       |
| `NO ACTION` | Similar to RESTRICT (default behavior in most databases)              |

For example:

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  total DECIMAL(10, 2),

  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE    -- Delete orders when user is deleted
    ON UPDATE CASCADE    -- Update user_id in orders when user's id changes
);
```
