---
title: Modifying Tables
description: Learn about altering tables in PostgreSQL.
order: 170
type: lesson-challenge
---

After creating a table, you might need to modify its structure - like adding new columns, changing data types, or modifying constraints. In SQL, we use the `ALTER TABLE` statement to make these changes. Let's look at different ways to modify tables.

Let's say that we have a table of books with following columns:

| Column Name | Data Type |
| ----------- | --------- |
| id          | SERIAL    |
| title       | VARCHAR   |
| author      | VARCHAR   |
| year        | INTEGER   |

> I have already configured the `books` table for you, so you can skip the `CREATE TABLE` statement and try out the SQL statements in the sections below to modify the table.

## Adding New Columns

We can add a new column using `ALTER TABLE ADD COLUMN`. The example belows adds a new column `description` of type `VARCHAR(255)` to the `books` table.

```sql
ALTER TABLE books
ADD COLUMN description VARCHAR(255);
```

We can also add multiple columns using a single statement.

```sql
ALTER TABLE books
ADD COLUMN publisher VARCHAR(255),
ADD COLUMN page_count INTEGER;
```

> Go ahead and try out the above SQL statements in the editor and see the impact in the `Schema` tab.

### Adding Columns with Constraints

Everything that follows the `ADD COLUMN` clause when altering a table has the same syntax as in a `CREATE TABLE` statement.

When adding new columns, you can include constraints:

```sql
ALTER TABLE books
ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);
```

With these constraints, if we try to insert a wrong value for the `rating` column, the database will reject the insert.

```sql
-- Error: Because rating must be between 1 and 5
INSERT INTO books (title, author, year, description, price, rating)
VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'A classic American novel', 10.99, 6);
```

The above insert statement will fail because the `rating` column has a constraint that ensures the value is between `1` and `5` while we are trying to insert `6`.

## Modifying Column Types

To change a column's data type, use the `ALTER COLUMN` statement when altering a table. Example below changes the `price` column from `DECIMAL(10,2)` to `DECIMAL(12,2)`.

```sql
ALTER TABLE books
ALTER COLUMN price TYPE DECIMAL(12,2);
```

> Run the above SQL statement in the editor and see the impact in the `Schema` tab.

While we are on the topic of changing column types, it's important to know the impact of these changes on the existing data.

### Widening Conversions - Usually safe

Widening conversions involve changing a column from a smaller data type to a larger one. These changes are generally safe and do not impact existing data. Below are examples of such conversions:

| From Data Type  | To Data Type    | Impact on Existing Data |
| --------------- | --------------- | ----------------------- |
| `INTEGER`       | `BIGINT`        | No impact               |
| `VARCHAR(50)`   | `VARCHAR(100)`  | No impact               |
| `DECIMAL(10,2)` | `DECIMAL(12,2)` | No impact               |

### Narrowing Conversions - May lose data

Narrowing conversions involve changing a column from a larger data type to a smaller one. These changes may result in data loss. Examples of such conversions are shown below:

| From Data Type  | To Data Type    | Impact on Existing Data |
| --------------- | --------------- | ----------------------- |
| `DECIMAL(12,2)` | `DECIMAL(10,2)` | Loss of decimal places  |
| `VARCHAR(100)`  | `VARCHAR(50)`   | Truncation of strings   |

### Type Conversions - May require explicit conversion

Changing between unrelated types may require explicit conversion. Every database has its own way of handling this. For example, MySQL supports implicit conversion between compatible types while PostgreSQL typically requires explicit conversion.

It's always a good idea to clean up the data before changing the type of a column to allow for a smooth transition.

## Removing Columns

To remove a column, use the `DROP COLUMN` clause:

```sql
ALTER TABLE books
DROP COLUMN description;
```

You can add `IF EXISTS` to prevent errors:

```sql
ALTER TABLE books
DROP COLUMN IF EXISTS description;
```

To drop multiple columns:

```sql
ALTER TABLE books
DROP COLUMN publisher,
DROP COLUMN page_count;
```

## Adding Constraints

Just like using `ALTER COLUMN` to modify a column's data type, you can also use it to add constraints to existing columns.

```sql
-- Adding a NOT NULL constraint
ALTER TABLE books
ALTER COLUMN title SET NOT NULL;

-- Adding a CHECK constraint
ALTER TABLE books
ADD CONSTRAINT valid_price
CHECK (price >= 0);

-- Adding a UNIQUE constraint
ALTER TABLE books
ADD CONSTRAINT unique_isbn
UNIQUE (isbn);
```

When adding constraints, the database checks all existing data to make sure that none of it violates the new constraint. If there is any data that violates the constraint, the database will reject the operation and you will be required to clean up the data before adding the constraint.

We will look at different ways to clean up data in the next chapter about data manipulation.

## Removing Constraints

Considering the following table `orders`:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(255) NOT NULL,
  customer_id INTEGER NOT NULL,
  order_date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,

  -- Named constraint
  CONSTRAINT valid_status CHECK (status IN ('pending', 'shipped', 'delivered'))
);
```

We have a named constraint `valid_status` and some `NOT NULL` constraints on the `order_number`, `customer_id`, `order_date` and `status` columns.

We can remove the named constraint using the `DROP CONSTRAINT` clause and the `NOT NULL` constraints using the `ALTER COLUMN` clause.

```sql
-- Remove a named constraint
ALTER TABLE orders
DROP CONSTRAINT valid_status;

-- Remove a NOT NULL constraint
ALTER TABLE orders
ALTER COLUMN status DROP NOT NULL;
```

## Renaming Tables and Columns

You can rename tables and columns:

```sql
-- Rename a table
ALTER TABLE books
RENAME TO publications;

-- Rename a column
ALTER TABLE books
RENAME COLUMN title TO book_title;
```

And that's it for this lesson! Be sure to practice the concepts covered here by modifying the `books` table in the editor. In the next lesson, we'll explore how to remove and truncate table data before moving on to the next chapter about data manipulation.
