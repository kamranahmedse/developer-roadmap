# Procedures and Functions in PostgreSQL

In PostgreSQL, functions and procedures encapsulate reusable logic within the database to enhance performance and maintain organization. Functions return a value or a table, take input parameters, and are used in SQL queries, defined with `CREATE FUNCTION`. Procedures, introduced in PostgreSQL 11, do not return values but can perform actions and include transaction control commands like `COMMIT` and `ROLLBACK`, defined with `CREATE PROCEDURE` and called using the `CALL` statement. Key differences include functions' mandatory return value and integration in SQL queries, while procedures focus on performing operations and managing transactions.

Learn more from the following resources:

- [@official@CREATE PROCEDURE](https://www.postgresql.org/docs/current/sql-createprocedure.html)
- [@official@CREATE FUNCTION](https://www.postgresql.org/docs/current/sql-createfunction.html)
- [@article@PostgreSQL CREATE PROCEDURE](https://www.postgresqltutorial.com/postgresql-plpgsql/postgresql-create-procedure/)