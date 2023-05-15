# Columns in PostgreSQL

Columns are a fundamental component of PostgreSQL's object model. They are used to store the actual data within a table and define their attributes such as data type, constraints, and other properties. 

## Defining Columns

When creating a table, you specify the columns along with their data types and additional properties, if applicable. The general syntax for defining columns is as follows:

```
CREATE TABLE table_name (
  column_name data_type [additional_properties],
  ...,
);
```

For example, to create a table called "employees" with columns "id", "name", and "salary", you would execute the following SQL command:

```
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  salary NUMERIC(10, 2) NOT NULL
);
```

## Data Types

PostgreSQL supports a variety of data types that can be associated with columns. Here are some common data types:

- `INTEGER`: Represents whole numbers.
- `SERIAL`: Auto-incrementing integer, mainly used for primary keys.
- `NUMERIC`: Represents a fixed-point number.
- `VARCHAR(n)`: Represents variable-length character strings with a maximum length of `n` characters.
- `TEXT`: Represents variable-length character strings without a specified maximum length.
- `DATE`: Represents dates (YYYY-MM-DD).
- `TIMESTAMP`: Represents date and time (YYYY-MM-DD HH:MI:SS).

Refer to the [official documentation](https://www.postgresql.org/docs/current/datatype.html) for a complete list of supported data types.

## Column Constraints

Constraints provide a way to enforce rules on the data stored in columns. Here are some common constraints:

- `NOT NULL`: The column must have a value, and NULL values will not be allowed.
- `UNIQUE`: All values in the column must be unique.
- `PRIMARY KEY`: The column uniquely identifies a row in the table. It automatically applies `NOT NULL` and `UNIQUE` constraints.
- `FOREIGN KEY`: The column value must exist in another table column, creating a relationship between tables.
- `CHECK`: The column value must meet a specific condition.

For example, to create a table "orders" where "customer_id" is a foreign key, you can use the following SQL command:

```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

Be sure to refer to the PostgreSQL documentation for more advanced column properties as you dive deeper into PostgreSQL's object model.