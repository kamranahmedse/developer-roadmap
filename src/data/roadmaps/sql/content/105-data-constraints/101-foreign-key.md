# Foreign Key

A foreign key is a key used to link two tables together. It is a field (or collection of fields) in one table that refers to the primary key in another table. The table with the foreign key is called the child table, and the one with the primary key is called the referenced or parent table.

## Basic Syntax

The SQL used to add a foreign key constraint is:

```sql
ALTER TABLE child_table
ADD FOREIGN KEY (fk_column)
REFERENCES parent_table (parent_key_column)
```

Where:
- `child_table` is the table where you want to add the foreign key
- `fk_column` is the field in the child table that you want to use as foreign key
- `parent_table` is the table being referenced by the foreign key
- `parent_key_column` is the column in `parent_table` that `fk_column` points to

## Example

Suppose we have two tables, `Orders` and `Customers` where `Orders` table has a column `customer_id` that should point to a Customer. If `Customers` has a `customer_id` column as the primary key then you can create a foreign key as follows

```sql
ALTER TABLE Orders
ADD FOREIGN KEY (customer_id)
REFERENCES Customers (customer_id);
```

This means that for every row in `Orders`, the `customer_id` value must match a value in the `Customers` table, ensuring data integrity.

## Note

Please note that MySQL requires you to have the foreign key columns be indexed for performance reasons. If they aren't indexed already, the `FOREIGN KEY` constraint will implicitly index them for you. Also, a significant thing to note is, InnoDB does not support the 'foreign key check' in CREATE TABLE statements, instead, you must use ALTER TABLE after the table has been created.

Not all database systems support all types of keys, and different systems support different syntax for them. The examples above are in SQL syntax, which is supported by most databases.
