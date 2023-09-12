# INSERT

The "INSERT" statement is used to add new rows of data to a table in a database. There are two main forms of the INSERT command: `INSERT INTO` which, if columns are not named, expects a full set of columns, and `INSERT INTO table_name (column1, column2, ...)` where only named columns will be filled with data.

## Usage

1. **Insert full set of columns:**

Code example:

```sql
INSERT INTO table_name 
VALUES (value1, value2, ..., valueN);
```

In the example above, you need to provide values for all columns available in the table.

2. **Selectively insert data:**

Code example:

```sql
INSERT INTO table_name (column1, column2, ..., columnN)  
VALUES (value1, value2, ..., valueN);
```

Here, you only provide values for certain columns of the table. Other columns will take on their default values (if any).

3. **Insert data from another table:**

Another useful form of the `INSERT` command is `INSERT INTO SELECT`, which allows you to copy data from one table and add it into another table.

Code example:

```sql
INSERT INTO table1 (column1, column2, ... , columnN)
SELECT column1, column2, ... , columnN 
FROM table2 
WHERE condition;
```

In this scenario, `table2` should already have the data we need and the WHERE clause can be used to select only those rows that satisfy certain conditions.

> Note: The crucial point is that your columns in both SELECT and INSERT INTO command must be in same order and their datatypes must be compatible.
> 
> Kindly ensure that database table has enough space to hold inserted data, else it will resulting in OVERFLOW error.

**Note**: Always make sure to provide correct and compatible data types for the columns. The SQL engine won't allow you to add data that doesn't match the column's declared data type.