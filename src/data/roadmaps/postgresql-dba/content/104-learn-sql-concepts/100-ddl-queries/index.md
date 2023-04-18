# DDL Queries

DDL stands for Data Definition Language. DDL queries are a subset of SQL queries that are responsible for defining and managing the structure of your database, such as creating, altering, and deleting tables, constraints, and indexes. In this section, we will discuss the basic DDL statements: `CREATE`, `ALTER`, and `DROP`.

## CREATE

`CREATE` is used to create a new database object (e.g., table, index, sequence, etc.). The syntax for creating a table in PostgreSQL is as follows:

```sql
CREATE TABLE table_name (
   column1 data_type constraints,
   column2 data_type constraints,
   ...
);
```

An example of creating a table named `employees` with columns `id`, `first_name`, and `last_name` would be:

```sql
CREATE TABLE employees (
   id SERIAL PRIMARY KEY,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL
);
```

## ALTER

`ALTER` is used to modify an existing database object, such as adding or removing columns, changing data types, or adding constraints. The basic syntax for altering a table in PostgreSQL is:

```sql
ALTER TABLE table_name
ACTION column_name data_type constraints;
```

Some examples of altering a table include:

- Adding a column:

  ```sql
  ALTER TABLE employees
  ADD COLUMN email VARCHAR(255) UNIQUE;
  ```

- Modifying a column's data type:

  ```sql
  ALTER TABLE employees
  ALTER COLUMN email SET DATA TYPE TEXT;
  ```

- Removing a constraint:

  ```sql
  ALTER TABLE employees
  DROP CONSTRAINT employees_email_key;
  ```

## DROP

`DROP` is used to permanently delete a database object. The syntax for dropping a table in PostgreSQL is:

```sql
DROP TABLE table_name;
```

To delete the `employees` table created earlier:

```sql
DROP TABLE employees;
```

_Note_: Be cautious when using the `DROP` statement, as all data and schema associated with the deleted object will be lost permanently.

In this section, we have covered the basic DDL queries in PostgreSQL, which allow you to create, modify, and delete database objects. Remember to always test your DDL statements before applying them to the production environment to avoid unintended consequences.