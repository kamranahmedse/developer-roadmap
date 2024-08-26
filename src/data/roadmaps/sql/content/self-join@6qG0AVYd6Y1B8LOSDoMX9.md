# Self Join

A `SELF JOIN` is a standard SQL operation where a table is joined to itself. This might sound counter-intuitive, but it's actually quite useful in scenarios where comparison operations need to be made within a table. Essentially, it is used to combine rows with other rows in the same table when there's a match based on the condition provided.

It's important to note that, since it's a join operation on the same table, alias(es) for table(s) must be used to avoid confusion during the join operation.

## Syntax of a Self Join

Here is the basic syntax for a `SELF JOIN` statement:

```sql
SELECT a.column_name, b.column_name
FROM table_name AS a, table_name AS b
WHERE a.common_field = b.common_field;
```

In this query:

- `table_name`: is the name of the table to join to itself.
- `a` and `b`: are different aliases for the same table.
- `column_name`: specify the columns that should be returned as a result of the SQL `SELF JOIN` statement.
- `WHERE a.common_field = b.common_field`: is the condition for the join. 

## Example of a Self Join

Let us consider a `EMPLOYEES` table with the following structure:

| EmployeeID | Name  | ManagerID |
|------------|-------|-----------|
| 1          | Sam   | NULL      |
| 2          | Alex  | 1         |
| 3          | John  | 1         |
| 4          | Sophia| 2         |
| 5          | Emma  | 2         |

If you want to find out all the employees and who their manager is, you can do so using a `SELF JOIN`:

```sql
SELECT a.Name AS Employee, b.Name AS Manager
FROM EMPLOYEES a, EMPLOYEES b
WHERE a.ManagerID = b.EmployeeID;
```

This query will return the name of each employee along with the name of their respective manager.