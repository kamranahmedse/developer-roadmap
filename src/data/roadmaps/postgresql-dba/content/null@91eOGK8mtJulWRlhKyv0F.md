# The Relational Model: Null Values

In the relational model used by PostgreSQL, null values represent missing or unknown information within a database. Unlike zero, empty strings, or other default values, null signifies the absence of a value and is treated uniquely in operations and queries. For example, any arithmetic operation involving a null results in a null, and comparisons with null using standard operators return unknown rather than true or false. To handle null values, PostgreSQL provides specific functions and constructs such as `IS NULL`, `IS NOT NULL`, and the `COALESCE` function, which returns the first non-null value in its arguments. Understanding and correctly handling null values is crucial for accurate data retrieval and integrity in relational databases.

Visit the following resources to learn more:

- [@official@PostgreSQL - NULL](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-NULL)
- [@article@PostgreSQL - NULL Values](https://www.relationaldbdesign.com/database-analysis/module2/relational-database-null-values.php)