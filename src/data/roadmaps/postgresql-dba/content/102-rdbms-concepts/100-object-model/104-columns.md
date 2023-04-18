# Columns

## Columns in PostgreSQL

Columns are an essential part of the PostgreSQL object model. They represent the basic units of data storage within the database. In this section, we'll discuss the important aspects of columns in PostgreSQL, including data types, constraints, and column properties.

### Data Types

Every column in a PostgreSQL table has a specific data type, which dictates the kind of values that can be stored in the column. Some of the common data types in PostgreSQL include:

- Numeric: `INTEGER`, `SMALLINT`, `BIGINT`, `NUMERIC`, `DECIMAL`, `REAL`, `DOUBLE PRECISION`
- Character: `CHAR(n)`, `VARCHAR(n)`, `TEXT`
- Binary data: `BYTEA`
- Date and time: `DATE`, `TIME`, `TIMESTAMP`, `INTERVAL`
- Boolean: `BOOLEAN`
- Enumerated types: Custom user-defined types
- Geometric and network types

### Constraints

Constraints are rules applied to columns that enforce specific conditions on the data. Constraints ensure data consistency and integrity within the table. These rules can be defined either during table creation or by altering an existing table. Some of the common constraints in PostgreSQL include:

- `NOT NULL`: Ensures that a column cannot contain a NULL value
- `UNIQUE`: Ensures that all values in a column are unique
- `PRIMARY KEY`: A combination of NOT NULL and UNIQUE; uniquely identifies each row in a table
- `FOREIGN KEY`: Ensures referential integrity between related tables
- `CHECK`: Validates the values in a column by evaluating a Boolean expression

### Column Properties

In addition to data types and constraints, there are several properties and features associated with columns in PostgreSQL.

- Default values: When a new row is added to the table, the column can be assigned a default value if no value is provided during the insert operation. Default values can be constant values, functions, or expressions.

- Auto-incrementing columns: Often used for primary keys, the `SERIAL` and `BIGSERIAL` column types automatically generate unique, incremental integer values.

- Identity columns: Introduced in PostgreSQL 10, identity columns provide an alternative to `SERIAL` for auto-incrementing primary keys. They offer more control and adhere to the SQL standard.

- Computed columns: PostgreSQL supports computed columns using generated `ALWAYS AS` or `STORED` columns, allowing you to create columns with values derived from other columns in the same table.

- Comments: You can add comments to columns by using the `COMMENT ON COLUMN` command.

In summary, columns are an integral part of PostgreSQL tables, and understanding the different aspects of columns like data types, constraints, and properties are essential for effective database management.