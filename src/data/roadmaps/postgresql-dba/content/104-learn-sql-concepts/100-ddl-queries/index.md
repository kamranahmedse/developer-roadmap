# DDL Queries

### DDL Queries

In this section, we'll discuss DDL (Data Definition Language) queries in PostgreSQL. DDL queries are responsible for defining or manipulating the database table schema, like creating, altering, or deleting tables, columns, indexes, and other database objects.

#### CREATE TABLE

The `CREATE TABLE` statement is used to create a new table with a defined schema. This query specifies the column names, data types, and any constraints that should be applied to the table.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```

#### ALTER TABLE

The `ALTER TABLE` statement is used to modify the structure of an existing table. You can use it to add, modify, or delete columns, as well as add or drop constraints.

-- Add a new column:
```sql
ALTER TABLE users
ADD COLUMN phone VARCHAR(20);
```

-- Modify an existing column:
```sql
ALTER TABLE users
ALTER COLUMN email TYPE VARCHAR(200);
```

-- Drop a column:
```sql
ALTER TABLE users
DROP COLUMN phone;
```

#### DROP TABLE

The `DROP TABLE` statement is used to delete a table and all its data permanently from the database.

```sql
DROP TABLE users;
```

#### CREATE INDEX

Indexes can speed up query executions by providing a more efficient way to look up data. The `CREATE INDEX` statement is used to create an index on a specific column.

```sql
CREATE INDEX users_email_index
ON users (email);
```

#### DROP INDEX

The `DROP INDEX` statement is used to delete an index.

```sql
DROP INDEX users_email_index;
```

In summary, DDL queries help in creating and managing database schema, creating, altering, and deleting tables and other database objects, and managing indexes for optimal performance. Remember that changes made using DDL queries are permanent, so be cautious when executing these statements.