# For Tables in PostgreSQL

In this topic, we'll discuss the different types of Data Definition Language (DDL) queries related to tables in PostgreSQL. Tables are essential components of a database, and they store the data in rows and columns. Understanding how to manage and manipulate tables is crucial for effective database administration and development.

## CREATE TABLE

To create a new table, we use the `CREATE TABLE` query in PostgreSQL. This command allows you to define the columns, their data types, and any constraints that should be applied to the table. Here's an example:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  hire_date DATE NOT NULL,
  department_id INTEGER,
  salary NUMERIC(10, 2) NOT NULL
);
```

## ALTER TABLE

When you need to modify an existing table's structure, the `ALTER TABLE` command comes in handy. You can use this query to add, modify, or drop columns, and to add, alter, or drop table constraints. Some common examples include:

- Add a column:

```sql
ALTER TABLE employees ADD COLUMN email VARCHAR(255) UNIQUE;
```

- Modify a column's data type:

```sql
ALTER TABLE employees ALTER COLUMN salary TYPE NUMERIC(12, 2);
```

- Drop a column:

```sql
ALTER TABLE employees DROP COLUMN email;
```

- Add a foreign key constraint:

```sql
ALTER TABLE employees ADD CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id);
```

## DROP TABLE

If you want to delete a table and all of its data permanently, use the `DROP TABLE` command. Be careful with this query, as it cannot be undone. Here's an example:

```sql
DROP TABLE employees;
```

You can also use the `CASCADE` option to drop any dependent objects that reference the table:

```sql
DROP TABLE employees CASCADE;
```

## TRUNCATE TABLE

In some cases, you might want to delete all the data in a table without actually deleting the table itself. The `TRUNCATE TABLE` command does just that. It leaves the table structure intact but removes all rows:

```sql
TRUNCATE TABLE employees;
```

## COPY TABLE

To copy data to and from a table in PostgreSQL, you can use the `COPY` command. This is especially useful for importing or exporting large quantities of data. Here's an example:

- Copy data from a CSV file into a table:

```sql
COPY employees (id, first_name, last_name, birth_date, hire_date, department_id, salary)
FROM '/path/to/employees.csv' WITH CSV HEADER;
```

- Copy data from a table to a CSV file:

```sql
COPY employees (id, first_name, last_name, birth_date, hire_date, department_id, salary)
TO '/path/to/employees_export.csv' WITH CSV HEADER;
```

In conclusion, understanding DDL queries for tables is essential when working with PostgreSQL databases. This topic covered the basics of creating, altering, dropping, truncating, and copying tables. Keep practicing these commands and exploring the PostgreSQL documentation to become more proficient and confident in managing your database tables.