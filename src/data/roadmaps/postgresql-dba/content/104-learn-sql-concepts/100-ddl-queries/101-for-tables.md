# For Tables

# DDL Queries for Tables

In this section, we'll explore Data Definition Language (DDL) queries specifically for tables in PostgreSQL. These are the queries that allow you to create, alter, and remove tables from the database.

## Creating Tables

To create a new table, you'll use the CREATE TABLE command. This command requires a table name and a list of column definitions:

```sql
CREATE TABLE table_name (
  column1 data_type [constraints],
  column2 data_type [constraints],
  ...
);
```

For example, to create a table named `employees` with three columns (id, name, and department), you'd use the following query:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL
);
```

In this example, the `id` column is of type SERIAL, which is an auto-incrementing integer, and it also serves as the primary key for the table. The `name` and `department` columns are of type VARCHAR with specific length constraints.

## Altering Tables

You can use the ALTER TABLE command to modify an existing table, such as adding, renaming, or removing columns or constraints. Here are some common queries:

### Adding a Column

To add a new column to an existing table, use the following syntax:

```sql
ALTER TABLE table_name
ADD COLUMN column_name data_type [constraints];
```

For example, to add a `salary` column to the `employees` table, you'd use this query:

```sql
ALTER TABLE employees
ADD COLUMN salary DECIMAL(10, 2);
```

### Renaming a Column

To rename an existing column, use the following syntax:

```sql
ALTER TABLE table_name
RENAME COLUMN old_column_name TO new_column_name;
```

For example, to rename the `department` column to `dept`:

```sql
ALTER TABLE employees
RENAME COLUMN department TO dept;
```

### Removing a Column

To remove a column from a table, use the following syntax:

```sql
ALTER TABLE table_name
DROP COLUMN column_name CASCADE;
```

For example, to remove the `salary` column:

```sql
ALTER TABLE employees
DROP COLUMN salary CASCADE;
```

## Removing Tables

To remove a table from the database, use the DROP TABLE command. Be cautious when using this command, as it permanently deletes the table and all its data:

```sql
DROP TABLE table_name [CASCADE];
```

For example, to remove the `employees` table and all its dependencies:

```sql
DROP TABLE employees CASCADE;
```

In conclusion, DDL queries for tables allow you to manage the structure of your PostgreSQL database effectively. Understanding how to create, alter, and remove tables is essential as you progress in your role as a PostgreSQL DBA.