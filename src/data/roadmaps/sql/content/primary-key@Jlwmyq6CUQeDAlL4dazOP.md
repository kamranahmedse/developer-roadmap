# Primary Key

A primary key is a special relational database table field (or combination of fields) designated to uniquely identify all table records. 

A primary key's main features are:

- It must contain a unique value for each row of data.
- It cannot contain null values. 

## Usage of Primary Key

You define a primary key for a table using the `PRIMARY KEY` constraint. A table can have only one primary key. You can define a primary key in SQL when you create or modify a table.

## Create Table With Primary Key 

In SQL, you can create a table with a primary key by using `CREATE TABLE` syntax. 

```sql
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    NAME TEXT,
    AGE INT,
    ADDRESS CHAR(50)
);
```

In this example, `ID` is the primary key which must consist of unique values and can't be null.

## Modify Table to Add Primary Key

If you want to add a primary key to an existing table, you can use `ALTER TABLE` syntax.

```sql
ALTER TABLE Employees
ADD PRIMARY KEY (ID);
```

This will add a primary key to `ID` column in the `Employees` table.

## Composite Primary Key

We can also use multiple columns to define a primary key. Such key is known as composite key.

```sql
CREATE TABLE Customers (
    CustomerID INT,
    StoreID INT,
    CONSTRAINT pk_CustomerID_StoreID PRIMARY KEY (CustomerID,StoreID)
);
```

In this case, each combination of `CustomerID` and `StoreID` must be unique across the whole table.