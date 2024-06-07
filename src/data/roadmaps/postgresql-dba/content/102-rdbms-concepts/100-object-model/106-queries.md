# Queries in PostgreSQL

Queries are the primary way to interact with a PostgreSQL database and retrieve or manipulate data stored within its tables. In this section, we will cover the fundamentals of querying in PostgreSQL - from basic `SELECT` statements to more advanced techniques like joins, subqueries, and aggregate functions.

### Simple SELECT Statements

The most basic type of query is a simple `SELECT` statement. This allows you to retrieve data from one or more tables, and optionally filter or sort the results.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE conditions
ORDER BY column ASC/DESC;
```
For example, to select all records from the `users` table:

```sql
SELECT * FROM users;
```

To select only the `name` and `email` columns for users with an `age` greater than 25:

```sql
SELECT name, email FROM users WHERE age > 25;
```

### Aggregate Functions

PostgreSQL provides several aggregate functions that allow you to perform calculations on a set of records, such as counting the number of records, calculating the sum of a column, or finding the average value.

Some common aggregate functions include:

- `COUNT()`: Count the number of rows
- `SUM()`: Calculate the sum of a column's values
- `AVG()`: Calculate the average value of a column
- `MIN()`: Find the smallest value of a column
- `MAX()`: Find the largest value of a column

Example: Find the total number of users and the average age:

```sql
SELECT COUNT(*) AS user_count, AVG(age) AS average_age FROM users;
```

### Joins

When you want to retrieve related data from multiple tables, you can use a `JOIN` in the query. There are various types of joins available, such as `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN` and `CROSS JOIN`.

Syntax for a simple `INNER JOIN`:

```sql
SELECT column1, column2, ...
FROM table1
JOIN table2
ON table1.column = table2.column;
```

Example: Fetch user details along with their order details, assuming there are `users` and `orders` tables, and `orders` has a `user_id` foreign key:

```sql
SELECT users.name, users.email, orders.order_date, orders.total_amount
FROM users
JOIN orders
ON users.id = orders.user_id;
```

### Subqueries

Subqueries, also known as "nested queries" or "inner queries", allow you to use the result of a query as input for another query. Subqueries can be used with various SQL clauses, such as `SELECT`, `FROM`, `WHERE`, and `HAVING`.

Syntax for a subquery:

```sql
SELECT column1, column2, ...
FROM (SELECT ... FROM ...) AS subquery
WHERE conditions;
```

Example: Find the average age of users who have placed orders from the `users` and `orders` tables:

```sql
SELECT AVG(age) AS average_age
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);
```

There's much more to explore with various types of queries, but this foundational knowledge will serve as a solid basis for further learning and experimentation.

- [@official@Querying a Table](https://www.postgresql.org/docs/current/tutorial-select.html)
