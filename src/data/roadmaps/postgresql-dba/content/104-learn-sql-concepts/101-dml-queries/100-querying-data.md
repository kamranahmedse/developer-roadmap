# Querying Data

This section discusses various `DML` (Data Manipulation Language) queries for working with data in PostgreSQL. These queries allow you to work with data stored in tables, such as selecting, inserting, updating, and deleting data. We will focus on the essential SQL commands and their applications for PostgreSQL.

## SELECT

The `SELECT` statement is used to retrieve data from one or more tables. You can select specific columns or retrieve all columns, filter records, sort records, or even join multiple tables together. Below is the basic syntax of a SELECT statement:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

## Examples:

- Selecting all columns from a table:

```sql
SELECT * FROM employees;
```

- Selecting specific columns from a table:

```sql
SELECT first_name, last_name FROM employees;
```

- Select records based on a condition:

```sql
SELECT * FROM employees WHERE salary > 40000;
```

- Order records in ascending or descending order:

```sql
SELECT first_name, last_name, salary FROM employees ORDER BY salary ASC;
```

## INSERT

The `INSERT` statement is used to add new records to a table. You can specify the values for each column in the new record, or you can use a subquery to insert records from another table. Here is the basic syntax for an INSERT statement:

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

## Examples:

- Inserting a single record:

```sql
INSERT INTO employees (first_name, last_name, salary)
VALUES ('John', 'Doe', 50000);
```

- Insert multiple records at once:

```sql
INSERT INTO employees (first_name, last_name, salary)
VALUES ('John', 'Doe', 50000),
       ('Jane', 'Doe', 55000);
```

## UPDATE

The `UPDATE` statement is used to modify existing records in a table. You can set new values for individual columns or for all columns. Here is the basic syntax for an UPDATE statement:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

## Examples:

- Updating a single record:

```sql
UPDATE employees
SET salary = 60000
WHERE employee_id = 1;
```

- Updating multiple records:

```sql
UPDATE employees
SET salary = salary * 1.1
WHERE salary < 50000;
```

## DELETE

The `DELETE` statement is used to remove records from a table. You can delete one record or multiple records based on a condition. Here is the basic syntax for a DELETE statement:

```sql
DELETE FROM table_name
WHERE condition;
```

## Examples:

- Deleting a single record:

```sql
DELETE FROM employees
WHERE employee_id = 1;
```

- Deleting multiple records:

```sql
DELETE FROM employees
WHERE salary < 40000;
```

In this section, we covered various DML queries for querying data in PostgreSQL. Practice these queries to have a better understanding of how to work with data stored in tables. Don't forget that learning by doing is essential to mastering SQL and database management.