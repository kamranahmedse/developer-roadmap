# Querying Data

# Querying Data

In this section, we will discuss how to query data in PostgreSQL using Data Manipulation Language (DML) queries. These queries allow you to manipulate the data within the database, such as retrieving, inserting, updating, and deleting records. Understanding these queries is essential for every PostgreSQL Database Administrator.

## SELECT Statement

The `SELECT` statement is the most basic and widely-used DML query for retrieving data from one or more tables. The basic syntax of the `SELECT` statement is as follows:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

- `column1, column2, ...`: A comma-separated list of columns to retrieve from the table.
- `table_name`: The name of the table you want to query.
- `condition` (optional): A filter to apply on the records to limit the result set.

### Examples

1. Retrieve all columns from the "employees" table:

```sql
SELECT * FROM employees;
```

2. Retrieve "id", "name", and "salary" columns from the "employees" table:

```sql
SELECT id, name, salary FROM employees;
```

3. Retrieve "id" and "name" columns from the "employees" table with a condition: only employees with a salary greater than 50000:

```sql
SELECT id, name FROM employees
WHERE salary > 50000;
```

## JOIN Operation

When you need to fetch data from more than one table having a relationship between them, you can use the `JOIN` operation. The basic syntax of the `JOIN` operation is as follows:

```sql
SELECT column1, column2, ...
FROM table1
JOIN table2
ON table1.column = table2.column
WHERE condition;
```

- `table1` and `table2`: The two tables you want to join based on a common column.
- `table1.column = table2.column`: A condition that specifies the link between the tables.

### Examples

1. Retrieve employee names and their department names, given the "employees" table has a "department_id" column and the "departments" table has "id" and "name" columns:

```sql
SELECT employees.name AS employee_name, departments.name AS department_name
FROM employees
JOIN departments
ON employees.department_id = departments.id;
```

## INSERT Statement

The `INSERT` statement is used to add new records to a table. The basic syntax of the `INSERT` statement is as follows:

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

- `column1, column2, ...`: A comma-separated list of columns that you want to insert values into.
- `value1, value2, ...`: A comma-separated list of values that correspond to the specified columns.

### Example

1. Insert a new employee into the "employees" table:

```sql
INSERT INTO employees (name, age, salary, department_id)
VALUES ('John Doe', 30, 55000, 1);
```

## UPDATE Statement

The `UPDATE` statement is used to modify existing records in a table. The basic syntax of the `UPDATE` statement is as follows:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

- `column1 = value1, column2 = value2, ...`: A comma-separated list of column-value pairs that indicate the changes to be made.
- `condition` (optional): A filter to apply on the records to limit the updates.

### Example

1. Update the salary of an employee with an "id" of 3:

```sql
UPDATE employees
SET salary = 60000
WHERE id = 3;
```

## DELETE Statement

The `DELETE` statement is used to remove records from a table. The basic syntax of the `DELETE` statement is as follows:

```sql
DELETE FROM table_name
WHERE condition;
```

- `condition` (optional): A filter to apply on the records to limit the deletions. If not provided, all records in the table will be deleted.

### Example

1. Delete an employee with an "id" of 5 from the "employees" table:

```sql
DELETE FROM employees
WHERE id = 5;
```

In summary, DML queries are essential for managing and manipulating data in PostgreSQL databases. Mastering these queries and understanding the underlying principles is a crucial skill for any PostgreSQL Database Administrator.