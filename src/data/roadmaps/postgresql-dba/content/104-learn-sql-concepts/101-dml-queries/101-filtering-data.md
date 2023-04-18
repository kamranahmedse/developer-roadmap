# Filtering Data

## Filtering Data in PostgreSQL

Filtering data in PostgreSQL allows you to selectively retrieve records from your tables based on specified conditions. This is a fundamental aspect of database management as it helps in returning only relevant records for a specific query. In this section, we will discuss how to use various filtering techniques in PostgreSQL.

### WHERE Clause

The `WHERE` clause is the most basic way to filter data in PostgreSQL. It is used to specify the conditions that must be met for a record to be included in the result set. The syntax for the `WHERE` clause is:

```sql
SELECT column1, column2, ...
FROM table
WHERE condition;
```

The `condition` can be any expression that evaluates to a boolean value (`true` or `false`). If the condition is `true` for a record, it will be included in the result set. 

Here's an example:

```sql
SELECT first_name, last_name, age
FROM users
WHERE age >= 18;
```

This query will return all records from the `users` table where the `age` is greater than or equal to 18.

### AND, OR and NOT Operators

You can use the logical operators `AND`, `OR`, and `NOT` to combine multiple conditions in your `WHERE` clause. 

- The `AND` operator returns `true` if both conditions are true. Example:

  ```sql
  SELECT first_name, last_name, age
  FROM users
  WHERE age >= 18 AND city = 'New York';
  ```

- The `OR` operator returns `true` if at least one of the conditions is true. Example:

  ```sql
  SELECT first_name, last_name, age
  FROM users
  WHERE age <= 18 OR city = 'New York';
  ```

- The `NOT` operator negates a condition. Example:

  ```sql
  SELECT first_name, last_name, age
  FROM users
  WHERE NOT city = 'New York';
  ```

### USING Comparison Operators

PostgreSQL supports several comparison operators that you can use in your `WHERE` clause to filter data. These include:

- `= (equal)`
- `<> or != (not equal)`
- `< (less than)`
- `> (greater than)`
- `<= (less than or equal to)`
- `>= (greater than or equal to)`

You can also use `LIKE` and `ILIKE` operators to filter records based on pattern matching with wildcard characters:

- `% (percent)` represents zero, one or multiple characters.
- `_ (underscore)` represents a single character.

Example:

```sql
SELECT first_name, last_name, email
FROM users
WHERE email LIKE '%@example.com';
```

This query will return all records where the email address ends with '@example.com'.

### IN, BETWEEN, and NULL

You can also use `IN`, `BETWEEN`, and `NULL` operators to filter data:

- `IN` operator checks if a value is within a set of values. Example:

  ```sql
  SELECT first_name, last_name, city
  FROM users
  WHERE city IN ('New York', 'Los Angeles', 'Chicago');
  ```

- `BETWEEN` operator checks if a value is within a specific range. Example:

  ```sql
  SELECT first_name, last_name, age
  FROM users
  WHERE age BETWEEN 18 AND 25;
  ```

- `IS NULL` or `IS NOT NULL` operators checks if a value is null or not. Example:

  ```sql
  SELECT first_name, last_name, phone
  FROM users
  WHERE phone IS NULL;
  ```

By using these filtering techniques, you can customize your DML queries to return only the data that meets your specific criteria. This is essential for managing large datasets and optimizing the performance of your PostgreSQL database.