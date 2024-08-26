# Constraints in PostgreSQL

Constraints are an essential part of the relational model, as they define rules that the data within the database must follow. They ensure that the data is consistent, accurate, and reliable.

**Primary Key** - A primary key constraint is a column or a set of columns that uniquely identifies each row in a table. There can only be one primary key per table, and its value must be unique and non-null for each row.

**Foreign Key** - A foreign key constraint ensures that a column or columns in a table refer to an existing row in another table. It helps maintain referential integrity between tables.

**Unique** - A unique constraint ensures that the values in a column or set of columns are unique across all rows in a table. In other words, it prevents duplicate entries in the specified column(s).

**Check** - A check constraint verifies that the values entered into a column meet a specific condition. It helps to maintain data integrity by restricting the values that can be inserted into a column.

**Not Null** - A NOT NULL constraint enforces that a column cannot contain a NULL value. This ensures that a value must be provided for the specified column when inserting or updating data in the table.

**Exclusion** - An exclusion constraint is a more advanced form of constraint that allows you to specify conditions that should not exist when comparing multiple rows in a table. It helps maintain data integrity by preventing conflicts in data.

Learn more from the following resources:

- [@official@Contraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [@article@PostgreSQL - Contraints](https://www.tutorialspoint.com/postgresql/postgresql_constraints.htm)