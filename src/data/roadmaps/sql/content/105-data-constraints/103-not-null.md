# NOT NULL

The `NOT NULL` constraint in SQL ensures that a column cannot have a NULL value. Thus, every row/record must contain a value for that column. It is a way to enforce certain fields to be mandatory while inserting records or updating records in a table.

For instance, if you're designing a table for employee data, you might want to ensure that the employee's `id` and `name` are always provided. In this case, you'd use the `NOT NULL` constraint.

## Creating a table with NOT NULL

Here's an example of how you would define a `NOT NULL` constraint when creating a table:

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Name varchar(255) NOT NULL,
    Age int,
    Address varchar(255)
);
```

In this example, the `ID` and `Name` fields are mandatory for each record.

## Adding NOT NULL to an existing table

You can also add a `NOT NULL` constraint to an existing table using the `ALTER TABLE` statement. However, make sure there are no NULL values in the column before adding the `NOT NULL` constraint.

Here's an example:

```sql
ALTER TABLE Employees
MODIFY Address varchar(255) NOT NULL;
```

This command will modify the table `Employees` and set the `Address` column to be `NOT NULL`.

**Note:** In some SQL systems like PostgreSQL, you use the `ALTER TABLE` command followed by `SET NOT NULL`. 

---

Be aware that if you try to insert a record without a value for a `NOT NULL` column, the database will return an error and the operation will fail.
Ensure data compatibility before setting the `NOT NULL` constraint.