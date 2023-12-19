# CHECK

In SQL, `CHECK` is a constraint that limits the value range that can be placed in a column. It enforces domain integrity by limiting the values in a column to meet a certain condition.

`CHECK` constraint can be used in a column definition when you create or modify a table.

## Syntax

To use the `CHECK` constraint, you can follow this syntax:

```sql
CREATE TABLE table_name (
    column1 datatype CONSTRAINT constraint_name CHECK (condition),
    column2 datatype,
    ...
);
```

If you need to apply the `CHECK` constraint on multiple columns, use the following syntax: 

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...,
    CONSTRAINT constraint_name CHECK (condition)
);
```

## Examples

Here is an example of applying a `CHECK` constraint on a single column:

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Age int,
    Salary int CHECK (Salary>0),
);
```

Above SQL statement ensures that the salary of all employees in the Employees table must be more than 0.

Here is an example of applying a `CHECK` constraint on multiple columns:

```sql
CREATE TABLE Employees (
    ID int NOT NULL,
    Age int,
    Salary int,
    CONSTRAINT CHK_Person CHECK (Age>=18 AND Salary>=0)
);
```

Above SQL ensures that the persons' age must be greater than or equal to 18, and their salary is more than or equal to 0.

It is also possible to use the `ALTER TABLE` command to add a `CHECK` constraint after the table has been created.

```sql
ALTER TABLE Employees
ADD CONSTRAINT CHK_EmployeeAge CHECK (Age >= 21 AND Age <= 60);
```

Above SQL ensures that the employees' age must be between 21 and 60.