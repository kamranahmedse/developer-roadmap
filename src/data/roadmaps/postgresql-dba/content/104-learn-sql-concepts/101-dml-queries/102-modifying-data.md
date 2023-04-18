# Modifying Data

## Modifying Data in PostgreSQL

In PostgreSQL, modifying data is done through the use of Data Manipulation Language (DML) queries. It is an essential part of managing and maintaining any database system. In this topic, we will cover three types of DML queries that are important for modifying data in PostgreSQL: `INSERT`, `UPDATE`, and `DELETE`.

### 1. INSERT

The `INSERT` statement is used to add new rows into a table. The basic syntax for the statement is as follows:

```sql
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
```

For example, let's say we have a table named `employees` with columns `id`, `name`, and `salary`. To add a new employee into this table, we can execute the following query:

```sql
INSERT INTO employees (id, name, salary) VALUES (1, 'John Doe', 50000);
```

### 2. UPDATE

The `UPDATE` statement is used to modify the data of one or more rows in a table. The basic syntax for the command is as follows:

```sql
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
```

Make sure to include the correct `WHERE` clause to specify which rows you'd like to update. For example, to increase the salary of an employee with the `id` equal to `1`, we can execute the following query:

```sql
UPDATE employees SET salary = salary + 5000 WHERE id = 1;
```

### 3. DELETE

The `DELETE` statement is used to remove one or more rows from a table. Be careful when using this statement, as any deleted data cannot be easily recovered. The basic syntax for the command is as follows:

```sql
DELETE FROM table_name WHERE condition;
```

For example, to remove an employee with the `id` equal to `1`, we can execute the following query:

```sql
DELETE FROM employees WHERE id = 1;
```

---

In conclusion, modifying data in a PostgreSQL database is an important responsibility for any database administrator. Mastery of DML queries such as `INSERT`, `UPDATE`, and `DELETE` is essential for managing and maintaining the data in your database. Remember to be cautious when using these queries, especially `DELETE`, to avoid unintentional data loss or corruption.