---
title: CHECK Constraints
description: Learn about check constraints in SQL and how to use them effectively.
order: 150
type: lesson-challenge
---

A `CHECK` constraint is a rule that specifies what values are allowed in a column when a row is inserted or updated. Here's the basic syntax for adding a `CHECK` constraint:

```sql
CREATE TABLE table_name (
  column_name data_type CHECK (condition)
);
```

Here, `condition` is the expression similar to the ones we've used in `WHERE` clauses. Database engine will evaluate this expression for each row that is inserted or updated. If the condition evaluates to `FALSE`, the database engine will reject the operation.

Let's look at some examples to understand this better.

### Example 1: Single Condition

Let's create a table that stores book information with a `CHECK` constraint to ensure prices are positive:

```sql
CREATE TABLE books (
  id INTEGER,
  title TEXT,
  price DECIMAL CHECK (price > 0)
);
```

Now if we try to insert an invalid price:

```sql
-- This will fail because price is negative
INSERT INTO books (title, price)
VALUES ('The Great Gatsby', -15.99);

-- This will work because price is positive
INSERT INTO books (title, price)
VALUES ('The Great Gatsby', 15.99);
```

Go ahead and try it out in your database.

> ### Coding Environment Note
>
> Remember, the database resets to its initial state after your snippet is executed. So make sure to provide the entire snippet (CREATE, INSERT, SELECT) on every run.

### Example 2: Multiple Conditions

You can combine multiple conditions using AND and OR operators:

```sql
CREATE TABLE inventory (
  id INTEGER,
  book_id INTEGER,
  quantity INTEGER CHECK (quantity >= 0 AND quantity <= 1000),
  shelf_number TEXT CHECK (shelf_number LIKE 'S%')
);

-- This will work because both quantity and
-- shelf_number have valid data
INSERT INTO inventory (id, book_id, quantity, shelf_number)
VALUES (1, 2, 23, 'S34');
```

If we try adding a row with a negative quantity, the database will reject the operation and return an error.

```sql
-- Error: CHECK constraint failed: quantity >= 0 AND quantity <= 1000
INSERT INTO inventory (id, book_id, quantity, shelf_number)
VALUES (13, 2, -23, 'S34');
```

If we try adding a row with a shelf number that doesn't start with `S`, the database will reject the operation and return an error.

```sql
-- Error: CHECK constraint failed: shelf_number LIKE 'S%'
INSERT INTO inventory (id, book_id, quantity, shelf_number)
VALUES (13, 2, 23, 'A34');
```

### Example 3: Named Constraints

You can also give your CHECK constraints names, which makes them show up in the error messages as well as easier to reference later:

```sql
CREATE TABLE book_reviews (
  id INTEGER,
  book_id INTEGER,
  rating INTEGER,
  review_status TEXT,

  -- Named CHECK constraints
  -- [CONSTRAINT name] CHECK (condition)
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT valid_status CHECK (
    review_status IN ('pending', 'approved', 'rejected')
  )
);
```

Now if we try to insert an invalid rating, the database will reject the operation and return an error.

```sql
-- Error: CHECK constraint failed: valid_rating
INSERT INTO book_reviews (id, book_id, rating, review_status)
VALUES (1, 2, 6, 'pending');
```

If we try to insert an invalid review status, the database will reject the operation and return an error.

```sql
-- Error: CHECK constraint failed: valid_status
INSERT INTO book_reviews (id, book_id, rating, review_status)
VALUES (1, 2, 3, 'invalid_status');
```

### Example 4: Table-Level CHECK Constraints

Sometimes you need to check conditions that involve multiple columns. In such cases, you can define a table-level CHECK constraint:

```sql
CREATE TABLE book_sales (
  id INTEGER,
  book_id INTEGER,
  sale_price DECIMAL,
  retail_price DECIMAL,

  -- Table-level CHECK constraint
  CHECK (sale_price <= retail_price)
);
```

Now if we try to insert a row with a sale price that is greater than the retail price, the database will reject the operation with an error.

```sql
-- Error: CHECK constraint failed: sale_price <= retail_price
INSERT INTO book_sales (id, book_id, sale_price, retail_price)
VALUES (1, 2, 15.99, 10.99);
```

If we try to insert a row with a sale price that is less than or equal to the retail price, the database will accept the operation.

```sql
-- OK
INSERT INTO book_sales (id, book_id, sale_price, retail_price)
VALUES (1, 2, 5.99, 10.99);
```

---

## NOT NULL Constraints

While we are discussing constraints, let's also look at another useful constraint: `NOT NULL`. The `NOT NULL` constraint ensures that a column cannot contain `NULL` values.

For example, in the table below, we have a `name` and `price` column. We want to ensure that both columns cannot contain `NULL` values.

```sql
CREATE TABLE products (
  id INTEGER,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL
);
```

Now if we try to insert a row with a `NULL` value in either the `name` or `price` column, the database will reject the operation with an error.

```sql
-- Error: NOT NULL constraint failed: name
INSERT INTO products (id, name, price)
VALUES (1, NULL, 10.99);

-- Error: NOT NULL constraint failed: price
INSERT INTO products (id, name, price)
VALUES (1, 'Product 1', NULL);
```

---

## CHECK and NULL Values

By default, CHECK constraints allow `NULL` values unless you explicitly prevent them using `NOT NULL`.

For example in the table below you might expect the `published_year` column to be a positive number.

```sql
CREATE TABLE books (
  id INTEGER,
  published_year INTEGER CHECK (published_year > 0)
);
```

However, if we try to insert a row with a `NULL` value in the `published_year` column, the database will accept the operation.

```sql
-- OK
INSERT INTO books (id, published_year)
VALUES (1, NULL);
```

That's because the `CHECK` constraint allows `NULL` values by default. If you want to prevent `NULL` values, you need to use the `NOT NULL` constraint as well.

```sql
CREATE TABLE books (
  id INTEGER,
  published_year INTEGER NOT NULL CHECK (published_year > 0)
  --                     ---^---- -------------^------------
  --                     NOT NULL       CHECK constraint
);
```

If we try to insert a row with a `NULL` value in the `published_year` column, the database will reject the operation with an error.

```sql
-- Error: NOT NULL constraint failed: published_year
INSERT INTO books (id, published_year)
VALUES (1, NULL);
```

---

## DEFAULT Constraint

The `DEFAULT` constraint is used to specify a default value for a column.

For example, in the table below, we have a `published_year` column. We want to specify a default value of `2024` for the `published_year` column. We can do this using the `DEFAULT` constraint.

```sql
CREATE TABLE books (
  id INTEGER,
  published_year INTEGER DEFAULT 2024
  --                     -----^------
  --                     DEFAULT value
);
```

If we try to insert a row without a value for the `published_year` column, the database will use the default value of `2024`.

```sql
-- OK
INSERT INTO books (id)
VALUES (1);
```

### DEFAULT and NULL Values

When using `NOT NULL` and `DEFAULT` together, the `DEFAULT` value is used only if you omit a value for the column. However, if you explicitly provide a `NULL` value for the column, the database will reject the operation with an error due to the `NOT NULL` constraint.

Let's look at an example to understand this better.

```sql
CREATE TABLE books (
  id INTEGER,
  published_year INTEGER NOT NULL DEFAULT 2024
);
```

If we don't specify a value for the `published_year` column, the database will use the default value of `2024` and there will be no error.

```sql
-- OK
INSERT INTO books (id)
VALUES (1);
```

However, if we explicitly provide a `NULL` value for the `published_year` column, the database will reject the operation with an error due to the `NOT NULL` constraint.

```sql
-- Error: NOT NULL constraint failed: published_year
INSERT INTO books (id, published_year)
VALUES (1, NULL);
```

---

`CHECK` constraints are a powerful way to ensure data integrity in your database. They act as a first line of defense against invalid data and help maintain consistency in your application.

In the next lesson, we'll look at other types of constraints that help maintain data integrity.


