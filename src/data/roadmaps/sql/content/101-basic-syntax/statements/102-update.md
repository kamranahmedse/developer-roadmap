# UPDATE

The SQL `UPDATE` statement is used to modify the existing data in a database. This statement is very useful when you need to change the values assigned to specific fields in an existing row or set of rows.

The general syntax for the UPDATE statement is as follows:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

- `table_name`: The name of the table where an update will be performed.
- `SET`: This clause specifies the column name and the new value that it should be updated to.
- `column1, column2, ...`: The column names in the table.
- `value1, value2, ...`: The new values that you want to record into the database.
- `WHERE`: This clause specifies the conditions that identify which row(s) to update.

## Example Usage

Here's an example that might provide some clarity. For an imaginary `Employees` table:

| EmployeeID | Name    | Position | Salary |
|------------|---------|----------|--------|
| 1          | Jane    | Manager  | 50000  |
| 2          | John    | Clerk    | 30000  |
| 3          | Bob     | Engineer | 40000  |

If you want to increase Bob's salary by $5000, you would use:

```sql
UPDATE Employees
SET Salary = 45000
WHERE EmployeeID = 3;
```

This would permanently change the data in the `Employees` table:

| EmployeeID | Name    | Position | Salary |
|------------|---------|----------|--------|
| 1          | Jane    | Manager  | 50000  |
| 2          | John    | Clerk    | 30000  |
| 3          | Bob     | Engineer | 45000  |

Always be careful with the `UPDATE` statement; if you forget the `WHERE` clause, you will update all the rows in the table.