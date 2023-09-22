# DML Queries in PostgreSQL

In this section, we will be discussing Data Manipulation Language (DML) queries in PostgreSQL. DML queries are used to manage and modify data in tables. As an integral part of SQL, they allow us to perform various operations such as inserting, updating, and retrieving data. The main DML queries are as follows:

## INSERT

The `INSERT` statement is used to add new rows to a table. The basic syntax for the `INSERT` command is:

```
INSERT INTO table_name (column1, column2,...)
VALUES (value1, value2,...);
```

For example, to insert a new row into a table named `employees` with columns `employee_id`, `first_name`, and `last_name`, we would use:

```
INSERT INTO employees (employee_id, first_name, last_name)
VALUES (1, 'John', 'Doe');
```

## UPDATE

The `UPDATE` statement is used to modify existing data in a table. The basic syntax for the `UPDATE` command is:

```
UPDATE table_name
SET column1 = value1, column2 = value2,...
WHERE condition;
```

For example, to update the `first_name` of an employee with an `employee_id` of 1, we would use:

```
UPDATE employees
SET first_name = 'Jane'
WHERE employee_id = 1;
```

Be cautious with `UPDATE` statements, as not specifying a `WHERE` condition might result in updating all rows in the table.

## DELETE

The `DELETE` statement removes one or more rows from a table. The basic syntax for the `DELETE` command is:

```
DELETE FROM table_name
WHERE condition;
```

For example, to remove an employee row with an `employee_id` of 1, we would use:

```
DELETE FROM employees
WHERE employee_id = 1;
```

Similar to the `UPDATE` statement, not specifying a `WHERE` condition in `DELETE` might result in removing all rows from the table.

## SELECT

The `SELECT` statement is used to retrieve data from one or more tables. The basic syntax for the `SELECT` command is:

```
SELECT column1, column2,...
FROM table_name
WHERE condition;
```

For example, to retrieve the first name and last name of all employees, we would use:

```
SELECT first_name, last_name
FROM employees;
```

To retrieve the first name and last name of employees with an `employee_id` greater than 10, we would use:

```
SELECT first_name, last_name
FROM employees
WHERE employee_id > 10;
```

You can also use various clauses such as `GROUP BY`, `HAVING`, `ORDER BY`, and `LIMIT` to further refine your `SELECT` queries.

In summary, DML queries help you interact with the data stored in your PostgreSQL database. As you master these basic operations, you'll be able to effectively manage and modify your data according to your application's needs.