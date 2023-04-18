# Tables

## Tables in PostgreSQL

Tables are the most essential and fundamental aspect of PostgreSQL. They are responsible for storing data in an organized manner, and they are where your schema design and queries largely take place. In this section, we'll discuss tables in more detail and highlight the principal concepts you should know as a PostgreSQL DBA.

### Overview

A table in PostgreSQL is characterized by its columns and rows. Columns define the types of data to be stored in the table, while rows represent the actual data being stored. Each column has a name and a data type, assigned when the table is created. Some common data types are `integer`, `text`, `numeric`, and `date`. It's crucial to choose appropriate data types for smoother performance and efficient storage.

### Creating Tables

To create a table, you'll use the `CREATE TABLE` command. This command requires you to provide the table name and define its columns with their data types. Optionally, you can also specify constraints on columns, such as `NOT NULL`, `UNIQUE`, and `FOREIGN KEY`. Here's an example of table creation:

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    date_of_birth DATE
);
```

This creates a `customers` table with columns as: `id`, `first_name`, `last_name`, `email`, and `date_of_birth`. The `id` column is set as a primary key, which uniquely identifies each row.

### Modifying Tables

Once a table is created, you may need to modify it, for example, to add, remove or alter columns. PostgreSQL provides the `ALTER TABLE` command for this purpose. 

#### Add a Column

To add a column to an existing table, use the `ADD COLUMN` clause as shown below:

```sql
ALTER TABLE customers ADD COLUMN phone VARCHAR(20);
```

This adds a `phone` column to the `customers` table.

#### Rename a Column

If you need to rename an existing column, use the `RENAME COLUMN` clause:

```sql
ALTER TABLE customers RENAME COLUMN phone TO contact_number;
```

This changes the column name from `phone` to `contact_number`.

#### Alter a Column's Data Type

To modify the data type of a column on an existing table, use the `ALTER COLUMN` clause:

```sql
ALTER TABLE customers ALTER COLUMN date_of_birth TYPE TIMESTAMP;
```

This changes the `date_of_birth` column's data type from `DATE` to `TIMESTAMP`.

#### Drop a Column

If you need to remove a column from an existing table, use the `DROP COLUMN` clause:

```sql
ALTER TABLE customers DROP COLUMN contact_number;
```

This removes the `contact_number` column from the `customers` table.

### Deleting Tables

When you no longer need a table, you can use the `DROP TABLE` command to delete it, as shown below:

```sql
DROP TABLE customers;
```

This completely removes the `customers` table, along with all its data.

### Indexes on Tables

Indexes are an essential part of PostgreSQL, as they allow you to improve query speed and efficiency by reducing the time it takes to search for data in large tables. Most commonly, indexes are created on columns, which are used as filters (e.g., `WHERE columnName = 'value'`) or as join conditions in SQL queries.

To create an index on a specific column, use the `CREATE INDEX` command:

```sql
CREATE INDEX customers_email_idx ON customers (email);
```

This creates an index named `customers_email_idx` on the `email` column of the `customers` table.

### Conclusion

Understanding tables in PostgreSQL is crucial for any PostgreSQL DBA. They form the foundation of schema design, data storage, and query processing. As a DBA, you should be familiar with managing tables, their columns, data types, constraints, and indexes.