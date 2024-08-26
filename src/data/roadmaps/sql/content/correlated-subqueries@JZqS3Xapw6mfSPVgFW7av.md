# Correlated Subqueries

In SQL, a correlated subquery is a subquery that uses values from the outer query in its `WHERE` clause. The correlated subquery is evaluated once for each row processed by the outer query. It exists because it depends on the outer query and it cannot execute independently of the outer query because the subquery is correlated with the outer query as it uses its column in its `WHERE` clause.

Learn more from the following resources:

- [@official@Correlated Subqueries](https://dev.mysql.com/doc/refman/8.4/en/correlated-subqueries.html)