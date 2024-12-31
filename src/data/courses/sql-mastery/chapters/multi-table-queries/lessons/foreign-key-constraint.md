---
title: Foreign Key Constraint
description: Learn how foreign keys are used to enforce relationships between tables
order: 130
type: lesson-challenge
---

In our previous lessons, we learned about relationships between tables and how they are achieved using primary and foreign keys.

Now, let's explore how to enforce these relationships using foreign key constraints.

## What is a Foreign Key Constraint?

A foreign key constraint is a rule that ensures referential integrity between two tables. It prevents actions that would destroy relationships between tables or create invalid references.

### What is referential integrity?

Referential integrity is the idea that data

Let's use our bookstore example to understand foreign key constraints:

```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2)
);

CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER,
    quantity INTEGER,
    sale_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id)
);
```

In this example:

- The `book_id` column in the `sales` table is a foreign key
- It references the `id` column in the `books` table
- The foreign key constraint ensures that every `book_id` in `sales` must exist in the `books` table

### Alternative Syntax

Just like other constraints, you can also define foreign keys using different syntaxes:

```sql
-- Using CONSTRAINT keyword to name the foreign key
CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER,
    quantity INTEGER,
    sale_date DATE,
    CONSTRAINT fk_book
        FOREIGN KEY (book_id)
        REFERENCES books(id)
);

-- Inline syntax
CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    quantity INTEGER,
    sale_date DATE
);
```

## How Foreign Keys Maintain Data Integrity

Foreign keys prevent several types of invalid operations:

### 1. Inserting Invalid References

```sql
-- This will fail if book_id=999 doesn't exist in books table
INSERT INTO sales (book_id, quantity, sale_date)
VALUES (999, 1, '2024-03-20');
```

### 2. Deleting Referenced Records

By default, you cannot delete a record from the parent table if it's referenced in the child table:

```sql
-- This will fail if any sales reference this book
DELETE FROM books WHERE id = 1;
```

### 3. Updating Referenced Keys

Similarly, you cannot update a primary key if it's referenced by other tables:

```sql
-- This will fail if any sales reference this book
UPDATE books SET id = 999 WHERE id = 1;
```

## ON DELETE and ON UPDATE Clauses

You can specify what happens when a referenced record is deleted or updated using `ON DELETE` and `ON UPDATE` clauses:

```sql
CREATE TABLE sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER,
    quantity INTEGER,
    sale_date DATE,
    FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

Available options include:

| Option      | Description                                         |
| ----------- | --------------------------------------------------- |
| CASCADE     | Automatically delete/update related records         |
| SET NULL    | Set the foreign key to NULL                         |
| SET DEFAULT | Set the foreign key to its default value            |
| RESTRICT    | Prevent the deletion/update (this is the default)   |
| NO ACTION   | Similar to RESTRICT, but checked at different times |

### Example with Multiple Options

```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    title VARCHAR(255),
    FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE SET NULL    -- If author is deleted, set author_id to NULL
        ON UPDATE CASCADE     -- If author_id changes, update it here too
);
```

## Composite Foreign Keys

Just like primary keys, foreign keys can also consist of multiple columns:

```sql
CREATE TABLE book_editions (
    book_id INTEGER,
    edition_number INTEGER,
    publisher_id INTEGER,
    publication_year INTEGER,
    PRIMARY KEY (book_id, edition_number),
    FOREIGN KEY (book_id, edition_number)
        REFERENCES books(id, edition)
);
```

## Best Practices

1. **Always Name Your Constraints**: This makes error messages more meaningful and maintenance easier:

   ```sql
   CONSTRAINT fk_book_author
       FOREIGN KEY (author_id)
       REFERENCES authors(id)
   ```

2. **Consider Indexing**: Foreign key columns are often used in JOIN operations, so consider adding indexes:

   ```sql
   CREATE INDEX idx_book_author ON books(author_id);
   ```

3. **Choose ON DELETE/UPDATE Actions Carefully**:

   - Use `CASCADE` when child records cannot exist without parent
   - Use `SET NULL` when child records can exist independently
   - Use `RESTRICT` when you want to prevent accidental deletions

4. **Maintain Data Consistency**: Always insert parent records before child records and remove child records before parent records.

In the next lesson, we'll learn how to query data across multiple tables using these relationships.
