# Tables in PostgreSQL

A **table** is one of the primary data storage objects in PostgreSQL. In simple terms, a table is a collection of rows or records, organized into columns. Each column has a unique name and contains data of a specific data type.

In this section, we will discuss the following aspects related to tables in PostgreSQL:

- Creating tables
- Adding constraints
- Table indexing
- Altering tables
- Deleting tables

## Creating tables

To create a table, use the `CREATE TABLE` command, followed by the table name, and the columns with their respective data types enclosed in parentheses:

```sql
CREATE TABLE table_name (
    column1 data_type,
    column2 data_type,
    ...
);
```

For example:

```sql
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    joined_date DATE
);
```

## Adding constraints

Constraints are rules enforced on columns to maintain data integrity. Some common constraints include:

- `NOT NULL`: Column must have a value.
- `UNIQUE`: Column must have a unique value.
- `PRIMARY KEY`: Uniquely identifies a record in the table.
- `FOREIGN KEY`: Links two tables together.
- `CHECK`: Ensures that the value in the column satisfies a specific condition.

Constraints can be added either during table creation or using the `ALTER TABLE` command.

## Table indexing

Indexes are created to speed up data retrieval. They work similarly to book indexes, where it's easier to find content using an indexed keyword. In PostgreSQL, an index can be created on one or more columns of a table. To create an index, use the `CREATE INDEX` command:

```sql
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

## Altering tables

The `ALTER TABLE` statement is used to modify existing tables. Some common actions include:

- Adding a new column: `ALTER TABLE table_name ADD COLUMN column_name data_type;`
- Dropping a column: `ALTER TABLE table_name DROP COLUMN column_name;`
- Adding a constraint: `ALTER TABLE table_name ADD CONSTRAINT constraint_name constraint_definition;`
- Dropping a constraint: `ALTER TABLE table_name DROP CONSTRAINT constraint_name;`

## Deleting tables

To permanently delete a table and all its data from PostgreSQL, use the `DROP TABLE` statement:

```sql
DROP TABLE table_name;
```

Be cautious when using this command, as there's no way to recover a table once it's dropped.

By understanding the basics of creating, modifying, and deleting tables in PostgreSQL, you now have a solid foundation to build your database and store data in a structured manner.

- [Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html)