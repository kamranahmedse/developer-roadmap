# Creating Views

In SQL, creating views can be achieved through the `CREATE VIEW` statement. A view is a virtual table based on the result-set of an SQL statement. It contains rows and columns from one or more tables. The syntax for the `CREATE VIEW` statement is:

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

Here:
- `CREATE VIEW view_name` : It creates a new view that you define with `view_name`.
- `AS SELECT column1, column2 ...` : These are the columns you want in your view. You can choose one or more columns from one or more tables.
- `FROM table_name` : `table_name` is the name of the table from which you want to create the view.
- `WHERE` : It is an optional clause that you can use to specify conditions for displaying records.

**Example:**

Let's say you have a table named `Employees` having following data:

| ID | NAME  | SALARY | DEPARTMENT_ID |
|----|-------|--------|---------------|
| 1  | John  | 3000   | 2             |
| 2  | Sue   | 3500   | 3             |
| 3  | Phil  | 4500   | 2             |
| 4  | Anna  | 5000   | 1             |

You can create a view that shows only the employees from department 2:

```sql
CREATE VIEW Department2 AS
SELECT Name, Salary
FROM Employees
WHERE Department_ID = 2;
```

After running this statement, `Department2` will be a saved view in your database, and you can query it like you would with a standard table:

```sql
SELECT *
FROM Department2;
```

This would bring up

| NAME | SALARY |
|------|--------|
| John | 3000   |
| Phil | 4500   |

In total, the `CREATE VIEW` statement is a useful command when you want to save a particular query and its result set for future use. This can simplify complex queries by breaking them up into manageable parts.