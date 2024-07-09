# Subqueries

A subquery is a query nested inside another query, often referred to as the outer query. Subqueries are invaluable tools for retrieving information from multiple tables, performing complex calculations, or applying filter criteria based on the results of other queries. They can be found in various parts of SQL statements, such as `SELECT`, `FROM`, `WHERE`, and `HAVING` clauses.

## Types of Subqueries

### Scalar Subqueries
A scalar subquery is a subquery that returns a single value (i.e., one row and one column). Scalar subqueries can be used in places where a single value is expected, like in a comparison or an arithmetic expression.

```sql
SELECT employees.name, employees.salary
FROM employees
WHERE employees.salary > (SELECT AVG(salary) FROM employees);
```

### Row Subqueries
Row subqueries return a single row with multiple columns. These subqueries can be used in comparisons where a row of values is expected.

```sql
SELECT *
FROM orders
WHERE (order_id, total) = (SELECT order_id, total FROM orders WHERE order_id = 1001);
```

### Column Subqueries
Column subqueries return multiple rows and a single column. These can be used in predicates like `IN`, `ALL`, and `ANY`.

```sql
SELECT product_name, price
FROM products
WHERE price IN (SELECT MAX(price) FROM products GROUP BY category_id);
```

### Table Subqueries
Table subqueries, also known as derived tables or inline views, return multiple rows and columns. They are used in the `FROM` clause and can be treated like any other table.

```sql
SELECT top_customers.name
FROM (SELECT customer_id, SUM(total) as total_spent
      FROM orders
      GROUP BY customer_id
      HAVING SUM(total) > 1000) AS top_customers;
```

## Subquery Execution and Performance Considerations

Subqueries can have a significant impact on the performance of your queries. In general, try to write your subqueries in such a way that they minimize the number of returned rows. This can often lead to faster execution times.

Also, PostgreSQL might optimize subqueries, such as transforming `IN` predicates with subqueries into `JOIN` operations or applying various other optimizations to make execution more efficient.

In conclusion, subqueries are a powerful tool that can help you retrieve and manipulate data that spans multiple tables or requires complex calculations. By understanding the different types of subqueries and their performance implications, you can write more efficient and effective SQL code.