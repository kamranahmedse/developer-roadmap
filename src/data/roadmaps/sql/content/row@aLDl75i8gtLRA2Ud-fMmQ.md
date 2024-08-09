# Row

In SQL, a "row" refers to a record in a table. Each row in a table represents a set of related data, and every row in the table has the same structure. 

For instance, in a table named "customers", a row may represent one customer, with columns containing information like ID, name, address, email, etc.

Here is a conceptual SQL table:

| ID | NAME | ADDRESS | EMAIL |
|----|------|---------|-------|
| 1  | John | NY      | john@example.com |
| 2  | Jane | LA      | jane@example.com |
| 3  | Jim  | Chicago | jim@example.com  |

Each of these line of data is referred to as a 'row' in the SQL table.

To select a row, you would use a `SELECT` statement. Here's an example of how you might select a row:

```sql
SELECT * 
FROM customers 
WHERE ID = 1;
```

This would output:

| ID | Name | ADDRESS | Email |
|---|------|---------|--------|
| 1 | John | NY | john@example.com |

The `*` in the statement refers to all columns. If you want to only select specific columns, you can replace `*` with the column name(s):

```sql
SELECT NAME, EMAIL
FROM customers 
WHERE ID = 1;
```

In this case, the output would be:

| Name | Email |
|-----|--------|
| John | john@example.com |
