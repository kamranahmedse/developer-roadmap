# Joining Tables

Joining tables is a fundamental operation in the world of databases. It allows you to combine information from multiple tables based on common columns. PostgreSQL provides various types of joins, such as Inner Join, Left Join, Right Join, and Full Outer Join. In this section, we will touch upon these types of joins and how you can use them in your DML queries.

## Inner Join

An Inner Join returns only the rows with matching values in both tables. The basic syntax for an Inner Join is:

```
SELECT columns
FROM table1
JOIN table2 ON table1.column = table2.column;
```

Example:

```sql
SELECT employees.id, employees.name, departments.name as department_name
FROM employees
JOIN departments ON employees.department_id = departments.id;
```

## Left Join (Left Outer Join)

A Left Join returns all the rows from the left table and the matching rows from the right table. If no match is found, NULL values are returned for columns from the right table. The syntax for a Left Join is:

```
SELECT columns
FROM table1
LEFT JOIN table2 ON table1.column = table2.column;
```

Example:

```sql
SELECT employees.id, employees.name, departments.name as department_name
FROM employees
LEFT JOIN departments ON employees.department_id = departments.id;
```

## Right Join (Right Outer Join)

A Right Join returns all the rows from the right table and the matching rows from the left table. If no match is found, NULL values are returned for columns from the left table. The syntax for a Right Join is:

```
SELECT columns
FROM table1
RIGHT JOIN table2 ON table1.column = table2.column;
```

Example:

```sql
SELECT employees.id, employees.name, departments.name as department_name
FROM employees
RIGHT JOIN departments ON employees.department_id = departments.id;
```

## Full Outer Join

A Full Outer Join returns all the rows from both tables when there is a match in either left or right table. If no match is found in one table, NULL values are returned for its columns. The syntax for a Full Outer Join is:

```
SELECT columns
FROM table1
FULL OUTER JOIN table2 ON table1.column = table2.column;
```

Example:

```sql
SELECT employees.id, employees.name, departments.name as department_name
FROM employees
FULL OUTER JOIN departments ON employees.department_id = departments.id;
```

By understanding these various types of joins and their syntax, you can write complex DML queries in PostgreSQL to combine and retrieve information from multiple tables. Remember to always use the appropriate type of join based on your specific requirements.