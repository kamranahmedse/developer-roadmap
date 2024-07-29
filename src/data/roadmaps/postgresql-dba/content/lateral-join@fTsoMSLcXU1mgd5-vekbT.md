# Lateral Join in PostgreSQL

Lateral join allows you to reference columns from preceding tables in a query, making it possible to perform complex operations that involve correlated subqueries and the application of functions on tables in a cleaner and more effective way. The `LATERAL` keyword in PostgreSQL is used in conjunction with a subquery in the `FROM` clause of a query. It helps you to write more concise and powerful queries, as it allows the subquery to reference columns from preceding tables in the query.

Learn more from the following resources:

- [@official@LATERAL Subqueries](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-LATERAL)
- [@article@How to use lateral join in PostgreSQL](https://popsql.com/learn-sql/postgresql/how-to-use-lateral-joins-in-postgresql)