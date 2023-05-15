# Modifying Data in PostgreSQL

In this section, we will cover the basics of modifying data using Data Manipulation Language (DML) queries. Modifying data in PostgreSQL is an essential skill when working with databases. The primary DML queries used to modify data are `INSERT`, `UPDATE`, and `DELETE`.

## INSERT

The `INSERT` statement is used to add new rows to a table. The basic syntax for an `INSERT` statement is as follows:

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

Here's an example of inserting a new row into a `users` table:

```sql
INSERT INTO users (id, name, age)
VALUES (1, 'John Doe', 30);
```

## INSERT Multiple Rows

You can also insert multiple rows at once using the following syntax:

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...),
       (value4, value5, value6, ...),
       ...;
```

For example, inserting multiple rows into the `users` table:

```sql
INSERT INTO users (id, name, age)
VALUES (1, 'John Doe', 30),
       (2, 'Jane Doe', 28),
       (3, 'Alice', 24);
```

## UPDATE

The `UPDATE` statement is used to modify the data within a table. The basic syntax for an `UPDATE` statement is as follows:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

For example, updating a user's age in the `users` table:

```sql
UPDATE users
SET age = 31
WHERE id = 1;
```

**Note**: It's essential to use the `WHERE` clause to specify which rows need to be updated; otherwise, all rows in the table will be updated with the given values.

## DELETE

The `DELETE` statement is used to remove rows from a table. The basic syntax for a `DELETE` statement is as follows:

```sql
DELETE FROM table_name
WHERE condition;
```

For example, deleting a user from the `users` table:

```sql
DELETE FROM users
WHERE id = 1;
```

**Note**: As with the `UPDATE` statement, always use the `WHERE` clause to specify which rows should be deleted; otherwise, all rows in the table will be removed.

In summary, modifying data in PostgreSQL can be done using `INSERT`, `UPDATE`, and `DELETE` queries. Familiarize yourself with these queries and their syntax to effectively manage the data in your databases.