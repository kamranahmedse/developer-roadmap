# Rows in PostgreSQL

Rows, also known as records or tuples, are one of the fundamental components of a relational database like PostgreSQL. 

## What is a Row?

A row in PostgreSQL represents a single, uniquely identifiable record with a specific set of fields in a table. Each row in a table is made up of one or more columns, where each column can store a specific type of data (e.g., integer, character, date, etc.). The structure of a table determines the schema of its rows, and each row in a table must adhere to this schema.

## Row Operations

You can perform various operations on rows in PostgreSQL:

- **Insert** - Add a new row to a table:

   ```sql
   INSERT INTO table_name (column1, column2, column3, ...)
   VALUES (value1, value2, value3, ...);
   ```
   
- **Select** - Retrieve specific rows from a table:

   ```sql
   SELECT * FROM table_name
   WHERE condition;
   ```
   
- **Update** - Modify an existing row:

   ```sql
   UPDATE table_name
   SET column1 = value1, column2 = value2, ...
   WHERE condition;
   ```
   
- **Delete** - Remove a row from a table:

   ```sql
   DELETE FROM table_name
   WHERE condition;
   ```

## Examples

Consider the following table named `employees`:

| id | name   | age | department |
|----|--------|-----|------------|
| 1  | John   | 30  | HR         |
| 2  | Alice  | 25  | IT         |
| 3  | Bob    | 28  | Finance    |

**Insert a new row:**

```sql
INSERT INTO employees (id, name, age, department)
VALUES (4, 'Eve', 32, 'IT');
```

**Retrieve rows where department is 'IT':**

```sql
SELECT * FROM employees
WHERE department = 'IT';
```

**Update the age of an employee:**

```sql
UPDATE employees
SET age = 31
WHERE name = 'John';
```

**Delete a row for an employee:**

```sql
DELETE FROM employees
WHERE id = 3;
```

This concludes our brief overview of rows in PostgreSQL. Understanding rows and the operations you can perform on them is essential for working successfully with PostgreSQL databases.