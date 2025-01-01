---
title: Foreign Key Constraint
description: Learn how foreign keys are used to enforce relationships between tables
order: 140
type: lesson-challenge
setup: |
  ```sql
  CREATE TABLE author (
      id INT PRIMARY KEY,
      name VARCHAR(255)
  );

  CREATE TABLE author_biography (
      id INT PRIMARY KEY,
      author_id INT,
      biography TEXT
  );
  ```
---

So far in this course, we have learned about primary keys, relationships and their types, and queries involving multiple tables. I have intentionally avoided foreign key constraints until now because I wanted to help you understand relational data and relationships better before diving into foreign key constraints.

In this lesson, we will learn about foreign key constraints and see how they can help us enforce relationships between tables.

## What is a Foreign Key?

If we take the same example of a bookstore from previous lesson, imagine we have two tables `author` and `author_biography`.

![](https://assets.roadmap.sh/guest/author-biography-8evoz.png)

Notice how the `author_id` column in the `author_biography` table helps us link biography to an author. `author_id` in this case is a **foreign key**.

> Foreign keys are columns of a table that reference the primary key of another table.

## Foreign Key Constraint

Let me explain this with an example. Imagine, we defined the tables `author` and `author_biography` as follows:

```sql
CREATE TABLE author (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE author_biography (
  id INTEGER PRIMARY KEY,
  author_id INTEGER,
  biography TEXT
);
```

Notice, there are no constraints defined on the `author_biography` table. This means that there is nothing stopping us from inserting a biography without an author i.e.

```sql
INSERT INTO author_biography (id, author_id, biography)
VALUES (1, 12, 'Biography of a non-existent author');
```

Also, we can easily delete an author without deleting the biography.

```sql
-- Delete the author without deleting the biography
DELETE FROM author WHERE id = 1;
```

This means that without constraints, we can easily create invalid references in our database when using foreign keys. Foreign key constraints can help us prevent this.

A **foreign key constraint** is a special type of constraint that ensures referential integrity between two tables i.e. it prevents actions that destroy or create invalid references between tables.

> ### What is referential integrity?
>
> Referential integrity is the property of a database that ensures the the correctness of data across tables. It helps us make sure that information is not removed from one table if it is required elsewhere in a linked database.

## Implementing Foreign Key Constraints

Let's add foreign key constraints to our `author` and `author_biography` tables.

```sql
CREATE TABLE author (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE author_biography (
  id INTEGER PRIMARY KEY,
  author_id INTEGER REFERENCES author(id),
  biography TEXT,
);
```

Notice how we added `REFERENCES author(id)` in front of the `author_id` column in the `author_biography` table. This is a foreign key constraint and will ensure that:

- We can't delete an author if there is a biography referencing it
- We can't insert a biography without an author

Let's try to insert a biography without an author:

```sql
-- ERROR: insert or update on table "author_biography" violates foreign key constraint "author_biography_author_id_fkey"
INSERT INTO author_biography (id, author_id, biography)
VALUES (1, 12, 'Biography of a non-existent author');
```

Now if we insert the biography after inserting the author:

```sql
INSERT INTO author (id, name)
VALUES (1, 'John Doe');

-- OK!
INSERT INTO author_biography (id, author_id, biography)
VALUES (1, 1, 'Biography of John Doe');
```

Similarly, if we try to delete an author, it will fail if there is a biography referencing it:

```sql
-- ERROR: delete or update on table "author" violates foreign key constraint "author_biography_author_id_fkey" on table "author_biography"
DELETE FROM author WHERE id = 1;
```

But if we delete the biography first, it will work just fine:

```sql
-- OK!
DELETE FROM author_biography WHERE id = 1;
DELETE FROM author WHERE id = 1;
```

### Alternative Syntax

Just like other constraints, you can also define foreign keys using different syntaxes:

```sql
-- Using CONSTRAINT keyword to name the foreign key
CREATE TABLE author_biography (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    biography TEXT,

    -- Define the foreign key constraint
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
        REFERENCES author(id)
);

-- Creating unnamed foreign key
CREATE TABLE author_biography (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    biography TEXT,

    -- Define the foreign key constraint
    FOREIGN KEY (author_id) REFERENCES author(id)
);
```

## Foreign Key Constraints in Action

Let's revisit the examples above and see all the operations that foreign keys prevent in order to maintain data integrity.

### Inserting Invalid References

We can't insert a biography linking to a non-existent author:

```sql
-- ERROR: insert or update on table "author_biography" violates foreign key constraint "author_biography_author_id_fkey"
INSERT INTO author_biography (id, author_id, biography)
VALUES (12, 999, 'Biography of a non-existent author');
```

### Deleting Referenced Records

By default, you cannot delete a record from the parent table if it's referenced in the child table:

```sql
-- This will fail if any author_biography references this author
DELETE FROM author WHERE id = 1;
```

### Updating Referenced Keys

Similarly, you cannot update the primary key of a parent table if it's referenced by other tables:

```sql
-- This will fail if any author_biography references this author
UPDATE author SET id = 999 WHERE id = 1;
```

## ON DELETE and ON UPDATE Clauses

In the examples above, we saw how foreign key constraints prevent operations deletion and updating of parent records. But we can configure our foreign key constraints to handle these operations automatically i.e.

- When a parent record is deleted, the child records are automatically deleted e.g. delete all the `author_biography` referencing an `author` when the `author` is deleted.
- When the primary key of a parent record is updated, the foreign key in the child record is also updated e.g. update the `author_id` in the `author_biography` table when the `author_id` in the `author` table is updated.

We can configure these operations by attaching `ON DELETE` and `ON UPDATE` clauses to our foreign key constraints with one of the following options:

| Option        | Description                                        |
| ------------- | -------------------------------------------------- |
| `NO ACTION`   | Prevents the deletion/update (this is the default) |
| `RESTRICT`    | Similar to `NO ACTION` with subtle differences     |
| `CASCADE`     | Automatically delete/update related records        |
| `SET NULL`    | Set the foreign key to NULL                        |
| `SET DEFAULT` | Set the foreign key to its default value.          |

Please note that `SET DEFAULT` is only available with `ON DELETE` clause and not `ON UPDATE` clause.

Let's see some examples to see this in action.

### CASCADE

`CASCADE` is the most common option used to ensure referential integrity. It automatically deletes or updates related records when the parent record is deleted or updated.

Let's recreate our `author` and `author_biography` tables with `CASCADE` option and some sample data:

```sql
-- parent table
CREATE TABLE author (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- child table
CREATE TABLE author_biography (
    id INTEGER PRIMARY KEY,
    author_id INTEGER,
    biography TEXT,
    FOREIGN KEY (author_id)
        REFERENCES author(id)
        ON DELETE CASCADE    -- If author is deleted, delete the biography
        ON UPDATE CASCADE     -- If id changes in author table, update it here too
);

-- Setup the table with some data
INSERT INTO author (id, name)
VALUES (1, 'John Doe'),
       (2, 'Jane Doe');

INSERT INTO author_biography (id, author_id, biography)
VALUES (1, 1, 'Biography of John Doe'),
       (2, 2, 'Biography of Jane Doe');
```

This will result in the following data in `author` and `author_biography` tables respectively:

| id  | name     |
| --- | -------- |
| 1   | John Doe |
| 2   | Jane Doe |

| id  | author_id | biography             |
| --- | --------- | --------------------- |
| 1   | 1         | Biography of John Doe |
| 2   | 2         | Biography of Jane Doe |

#### Deleting the Author

Now, let's delete the author and see how it affects the `author_biography` table:

```sql
-- This will automatically delete the biography of John Doe
DELETE FROM author WHERE id = 1;
```

Now if we check the `author_biography` table, we will see that the biography of John Doe has been deleted automatically:

| id  | author_id | biography             |
| --- | --------- | --------------------- |
| 2   | 2         | Biography of Jane Doe |

#### Updating the Author

Similarly, if we update the `id` of the author, it will automatically update the `author_id` in the `author_biography` table. For example, let's update the id of the remaining author from 2 to 999:

```sql
UPDATE author SET id = 999 WHERE id = 2;
```

Now if we check the `author_biography` table, we will see that the `author_id` has been updated to 999:

| id  | author_id | biography             |
| --- | --------- | --------------------- |
| 2   | 999       | Biography of Jane Doe |

### SET DEFAULT

`SET DEFAULT` sets the foreign key to its default value when the parent record is deleted.

> `SET DEFAULT` is not available with `ON UPDATE` clause.

Let's see a simple example to understand this better.

```sql
CREATE TABLE parent (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE child (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER DEFAULT 999,

    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON DELETE SET DEFAULT -- If parent is deleted, set to 999
        ON UPDATE CASCADE -- If parent id is updated, update it here too
);

-- insert some data
INSERT INTO parent (id, name)
VALUES (1, 'John Doe'),
       (2, 'Jane Doe'),
       (999, 'Unknown'); -- we will use this as a default value

INSERT INTO child (id, parent_id)
VALUES (1, 1),
       (2, 2);
```

If you look closely, we have inserted a parent record with id `999` and value `Unknown`. We will use `999` as a default value for the `parent_id` column if the parent record is deleted or updated.

Now if we delete the parent record with id `1`, the `child` record with `parent_id` `1` will be updated to `999`:

```sql
DELETE FROM parent WHERE id = 1;
```

Now if we check the `child` table, we will see that the `parent_id` has been updated to `999`:

| id  | parent_id |
| --- | --------- |
| 2   | 2         |
| 1   | 999       |

An important thing to note here is that the `parent` record with id `999` must exist before we can delete the `parent` record with id `1`.

### SET NULL

`SET NULL` sets the foreign key to `NULL` when the parent record is deleted or updated.

Taking the same example as above:

```sql
CREATE TABLE parent (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE child (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER,
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON DELETE SET NULL -- If parent is deleted, set to NULL
        ON UPDATE SET NULL -- If parent id is updated, set to NULL
);

-- insert some data
INSERT INTO parent (id, name)
VALUES (1, 'John Doe'),
       (2, 'Jane Doe');

INSERT INTO child (id, parent_id)
VALUES (1, 1),
       (2, 2);
```

Let's delete the parent record with id `1`:

```sql
DELETE FROM parent WHERE id = 1;
```

Now if we check the `child` table, we will see that the `parent_id` has been set to `NULL`:

| id  | parent_id |
| --- | --------- |
| 2   | 2         |
| 1   | `NULL`    |

Similarly, if we update the `id` of the parent record with id `2` to `999`, the `child` record with `parent_id` `2` will be updated to `NULL`:

```sql
UPDATE parent SET id = 999 WHERE id = 2;
```

Now if we check the `child` table, we will see that the `parent_id` has been set to `NULL`:

| id  | parent_id |
| --- | --------- |
| 2   | `NULL`    |
| 1   | `NULL`    |

This is useful when you want to allow the child records to exist independently of the parent record.

### RESTRICT vs NO ACTION

`NO ACTION` and `RESTRICT` both prevent the deletion or update of the parent record if it has related records in the child table. The difference between the two is the times at which they are checked.

For single queries, i.e. the ones we have been learning so far there is no difference between `NO ACTION` and `RESTRICT`. However, when using transactions:

- `RESTRICT` is checked immediately when the query is performed. Transaction is rolled back immediately if the constraint is violated with an action.
- `NO ACTION` is checked at the end of the transaction i.e. if data gets fixed during the transaction, there won't be an error.

We haven't covered transactions in this course yet. Let's quickly go over what they are to help you understand this difference better.

> ### What is a transaction?
>
> A transaction is a sequence of operations performed as a single logical unit of work. This is particularly useful when you want to ensure that a series of operations are successful before committing them to the database.
>
> For example, if you are transferring money from one account to another, you want to ensure that the transfer is successful before updating both accounts. If any of the operations fail, the entire transaction is rolled back.
>
> We will learn more about transactions in the future lessons.

### Choosing the Right Option

The choice of option depends on your use case. The table below should give you an idea of when to use what:

| Option        | When to Use                                    |
| ------------- | ---------------------------------------------- |
| `CASCADE`     | When child records cannot exist without parent |
| `SET NULL`    | When child records can exist independently     |
| `RESTRICT`    | When you want to prevent accidental deletions  |
| `NO ACTION`   | When you want to prevent accidental deletions  |
| `SET DEFAULT` | You have a default value for the foreign key   |

---

## Composite Foreign Keys

Just like we can have composite primary keys (primary keys made up of multiple columns), we can also have composite foreign keys. A composite foreign key is a foreign key that references a composite primary key in another table.

Let's understand this with an example. Imagine we have a `book` table where each book is uniquely identified by both its `id` and `edition` number:

```sql
CREATE TABLE book (
    id INTEGER,
    edition INTEGER,
    title VARCHAR(255),

    -- Composite primary key
    PRIMARY KEY (id, edition)
);

CREATE TABLE book_review (
    review_id INTEGER PRIMARY KEY,
    book_id INTEGER,
    book_edition INTEGER,
    review_text TEXT,

    -- Composite foreign key referencing both columns
    FOREIGN KEY (book_id, book_edition)
        REFERENCES book(id, edition)
);
```

In this example:

- The `book` table has a composite primary key made up of `id` and `edition`
- The `book_review` table has a composite foreign key (`book_id`, `book_edition`) that references both columns of the primary key in `book`

When using composite foreign keys:

- All columns in the foreign key must reference all columns in the referenced primary key
- The columns must be specified in the same order as they appear in the primary key
- The data types of the corresponding columns must match

For example, this would be valid:

```sql
-- Insert a book
INSERT INTO book (id, edition, title)
VALUES (1, 1, 'SQL Basics');

-- Insert a review (valid because book exists)
INSERT INTO book_review (review_id, book_id, book_edition, review_text)
VALUES (1, 1, 1, 'Great book!');
```

But this would fail:

```sql
-- This will fail because there's no book with id=2, edition=1
INSERT INTO book_review (review_id, book_id, book_edition, review_text)
VALUES (2, 2, 1, 'Invalid review!');
```

The same rules for `ON DELETE` and `ON UPDATE` that we learned earlier also apply to composite foreign keys.
