# Recursive CTE (Common Table Expressions)

Recursive CTEs are a powerful feature in SQL that allow you to build complex hierarchical queries, retrieve data stored in hierarchical structures or even perform graph traversal. In simple terms, a recursive CTE is a CTE that refers to itself in its own definition, creating a loop that iterates through the data until a termination condition is met.

Note that recursive CTEs can be complex, and it's important to ensure a proper termination condition to avoid infinite recursion. Also, be careful with the use of `UNION ALL` or `UNION`, as it may impact the results and the performance of your query.

Learn more from the following resources:

- [@article@PostgreSQL Recursive Query](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-recursive-query/)
- [@article@PostgreSQL recursive query explained](https://elvisciotti.medium.com/postgresql-recursive-query-the-simplest-example-explained-f9b85e0a371b)