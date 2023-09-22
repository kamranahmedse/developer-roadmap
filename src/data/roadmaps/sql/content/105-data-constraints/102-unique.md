# Unique

The `UNIQUE` constraint ensures that all values in a column are different; that is, each value in the column should occur only once.

Both the `UNIQUE` and `PRIMARY KEY` constraints provide a guarantee for uniqueness for a column or set of columns. However, a primary key cannot contain `NULL` since it uniquely identifies each row, and each table can have only one primary key. On the other hand, a `UNIQUE` constraint allows for one `NULL` value, and a table can have multiple `UNIQUE` constraints.

## Syntax
```sql
CREATE TABLE table_name (
    column1 data_type UNIQUE,
    column2 data_type,
    column3 data_type,
   ....
);
```

Here, `UNIQUE` is the constraint's name, whereas `column1` and `data_type` refer to the column and data type for which we're setting the constraint, respectively.

## Example

Suppose, for instance, we are creating a table named "Employees". We want the "Email" column to contain only unique values to avoid any duplication in email addresses. 

Here's how we can impose a `UNIQUE` constraint on the "Email" column:

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar (255) NOT NULL,
    Email varchar (255) UNIQUE
);
```

In this SQL command, we are telling the SQL server that the "Email" column cannot have the same value in two or more rows.

## Adding a Unique Constraint to an Existing Table

To add a `UNIQUE` constraint to an existing table, you would use the `ALTER TABLE` command. Here is the syntax:

```sql
ALTER TABLE table_name
ADD UNIQUE (column1, column2, ...);
```
Here, `table_name` is the name of the table on which we're defining the constraint, and `column1`, `column2`, etc., are the names of the columns included in the constraint.

## Dropping a Unique Constraint

The `ALTER TABLE` command is also used to drop a `UNIQUE` constraint. The syntax to drop a `UNIQUE` constraint is:

```sql
ALTER TABLE table_name
DROP CONSTRAINT constraint_name;
```

Here, `constraint_name` is the name of the `UNIQUE` constraint that you want to drop.
