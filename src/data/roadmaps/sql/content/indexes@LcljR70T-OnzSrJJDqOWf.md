# Indexes

Indexes in SQL are database objects that improve the speed of data retrieval operations on database tables. They work similarly to book indexes, providing a quick lookup mechanism for finding rows with specific column values. Indexes create a separate data structure that allows the database engine to locate data without scanning the entire table. While they speed up `SELECT` queries, indexes can slow down `INSERT`, `UPDATE`, and `DELETE` operations because the index structure must be updated. Proper index design is crucial for optimizing database performance, especially for large tables or frequently queried columns.

Learn more from the following resources:

- [@article@Create SQL Index Statement](https://www.w3schools.com/sql/sql_create_index.asp)
- [@video@SQL Indexing Best Practices](https://www.youtube.com/watch?v=BIlFTFrEFOI)