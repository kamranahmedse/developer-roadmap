# The Relational Model: Null Values

One of the important concepts in the relational model is the use of `NULL` values. `NULL` is a special marker used to indicate the absence of data, meaning that the field has no value assigned, or the value is simply unknown. It is important to note that `NULL` is not the same as an empty string or a zero value, it stands for the absence of any data.

## Understanding NULL in PostgreSQL

In PostgreSQL, `NULL` plays a crucial role when dealing with missing or optional data. Let's explore some key points to understand how `NULL` values work in PostgreSQL:

## Representing Unknown or Missing Data

Consider the scenario where you have a table named `employees`, with columns like `name`, `email`, and `birthdate`. It's possible that some employees don't provide their birthdate or email address. In such cases, you can use `NULL` to indicate that the data is not available or unknown, like this:

```sql
INSERT INTO employees (name, email, birthdate) VALUES ('John Doe', NULL, '1990-01-01');
```

## NULL in Constraints and Unique Values

While creating a table, you can set constraints like `NOT NULL`, which ensures that a specific column must hold a value and cannot be left empty. If you try to insert a row with `NULL` in a `NOT NULL` column, PostgreSQL will raise an error. On the other hand, when using unique constraints, multiple `NULL` values are considered distinct, meaning you can have more than one `NULL` value even in a column with a unique constraint.

## Comparing NULL Values

When comparing `NULL` values, you cannot use the common comparison operators like `=`, `<>`, `<`, `>`, or `BETWEEN`. Instead, you should use the `IS NULL` and `IS NOT NULL` operators to check for the presence or absence of `NULL` values. The '=' operator will always return `NULL` when compared to any value, including another null value.

Example:

```sql
-- Find all employees without an email address
SELECT * FROM employees WHERE email IS NULL;

-- Find all employees with a birthdate assigned
SELECT * FROM employees WHERE birthdate IS NOT NULL;
```

## NULL in Aggregate Functions

When dealing with aggregate functions like `SUM`, `AVG`, `COUNT`, etc., PostgreSQL ignores `NULL` values and only considers the non-null data.

Example:

```sql
-- Calculate the average birth year of employees without including NULL values
SELECT AVG(EXTRACT(YEAR FROM birthdate)) FROM employees;
```

## Coalescing NULL values

Sometimes, you may want to replace `NULL` values with default or placeholder values. PostgreSQL provides the `COALESCE` function, which allows you to do that easily.

Example:

```sql
-- Replace NULL email addresses with 'N/A'
SELECT name, COALESCE(email, 'N/A') as email, birthdate FROM employees;
```

In conclusion, `NULL` values play a crucial role in PostgreSQL and the relational model, as they allow you to represent missing or unknown data in a consistent way. Remember to handle `NULL` values appropriately with constraints, comparisons, and other operations to ensure accurate results and maintain data integrity.