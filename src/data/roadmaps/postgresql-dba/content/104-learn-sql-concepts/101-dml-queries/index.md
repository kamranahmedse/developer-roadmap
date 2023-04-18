# DML Queries

## DML Queries

Data Manipulation Language (DML) queries refer to the set of SQL statements that allow you to interact with your database data. DML queries enable you to perform basic operations such as inserting, updating, and retrieving information from your database. These queries are essential for any PostgreSQL DBA, as they are the foundation of interacting with the data stored in your system.

In this section, we will go over the fundamental DML queries and provide examples on how to use each one.

### SELECT

The `SELECT` statement is used to query and retrieve data from your database. It allows you to fetch data from one or more tables and filter, sort, or group the results according to your requirements.

Here's a simple example of a `SELECT` query:

```sql
SELECT first_name, last_name FROM employees;
```

This query retrieves the `first_name` and `last_name` columns from the `employees` table.

### INSERT

The `INSERT` statement is used to add new rows to a table. You can specify which columns the data should be inserted into, and provide the corresponding values.

For example, to add a new employee record to a table, you would use the following query:

```sql
INSERT INTO employees (first_name, last_name, hire_date) VALUES ('John', 'Doe', '2022-01-01');
```

This query inserts a new row in the `employees` table with the values provided for the `first_name`, `last_name`, and `hire_date` columns.

### UPDATE

The `UPDATE` statement is used to modify existing data in your database. With this statement, you can change the values of specified columns for all rows that meet a certain condition.

Here's an example of an `UPDATE` query:

```sql
UPDATE employees SET salary = salary * 1.1 WHERE last_name = 'Doe';
```

This query updates the `salary` column by increasing the current value by 10% for all employees with the last name 'Doe'.

### DELETE

The `DELETE` statement allows you to remove rows from a table based on specified conditions.

For example, if you wanted to delete all records of employees hired before 2022, you would use the following query:

```sql
DELETE FROM employees WHERE hire_date < '2022-01-01';
```

This query deletes all rows from the `employees` table where the `hire_date` is earlier than January 1, 2022.

In conclusion, DML queries are the cornerstone of any PostgreSQL DBA's toolkit. Familiarizing yourself with them is essential for managing and interacting with your database effectively.