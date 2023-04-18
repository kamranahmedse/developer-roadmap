# Constraints

# Constraints in PostgreSQL

Constraints are an integral part of the relational model in PostgreSQL. They are used to define rules and relationships between columns within a table, ensuring data integrity and consistency. Constraints allow you to enforce specific conditions on columns or tables and control the kind of data that can be stored within them. In this section, we will explore various types of constraints and their usage in PostgreSQL.

## Types of Constraints

There are several types of constraints available in PostgreSQL:

1. `NOT NULL`: It ensures that a column cannot have a NULL value.
2. `UNIQUE`: It ensures that all values in a column are unique. No two rows can contain the same value in a unique column.
3. `PRIMARY KEY`: It is a special type of UNIQUE constraint that uniquely identifies each row in a table. A primary key column cannot contain NULL values.
4. `FOREIGN KEY`: It establishes a relationship between columns in different tables, ensuring that the data in one table corresponds to the data in another table.
5. `CHECK`: It verifies that the data entered into a column satisfies a specific condition.

## Defining Constraints

Constraints can be defined at the column level or table level. You can define them when creating a table or add them later using the `ALTER TABLE` statement. Let's take a look at some examples:

### NOT NULL

To define a NOT NULL constraint when creating a table:

```sql
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```

### UNIQUE

To define a UNIQUE constraint when creating a table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

### PRIMARY KEY

To define a PRIMARY KEY constraint when creating a table:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC NOT NULL
);
```

### FOREIGN KEY

To define a FOREIGN KEY constraint when creating a table:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);
```

### CHECK

To define a CHECK constraint when creating a table:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER CHECK(quantity > 0)
);
```

## Managing Constraints

You can modify, disable or drop constraints using various `ALTER TABLE` statements. Some examples are:

- Adding a UNIQUE constraint to an existing table:

  ```sql
  ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);
  ```

- Dropping a CHECK constraint:

  ```sql
  ALTER TABLE orders DROP CONSTRAINT check_quantity;
  ```

- Disabling a FOREIGN KEY constraint:

  ```sql
  ALTER TABLE orders ALTER CONSTRAINT fk_customer_id DEFERRABLE;
  ```

## Conclusion

Constraints play a crucial role in maintaining data integrity and consistency within a PostgreSQL database. By understanding and utilizing various types of constraints, you can ensure that your database maintains a high level of quality and reliability.