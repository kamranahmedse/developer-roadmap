Stored procedures are like saved functions in your SQL code that you write once and can run repeatedly. They're stored directly in the database, which gives them a few benefits:

- **Performance**: Since they're precompiled, they often run faster than regular SQL queries.
- **Security**: You can control who gets to run them and avoid exposing raw queries.
- **Less network traffic**: Instead of sending multiple queries from your app to the database, you just call the procedure.
- **Reusable logic**: You can call the same procedure from different apps or parts of your system.
- **Easier to manage**: Business logic lives in one place, which helps with maintenance.

![Stored procedure use case](https://assets.roadmap.sh/guest/stored-procedure-use-case-4nenq.png)

For example, if you have an application that constantly pulls employee data, you can create a stored procedure for it to optimize the process.

```sql
-- Create a stored procedure to get employees by department
CREATE PROCEDURE GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SELECT name, hire_date, salary
    FROM employees
    WHERE department_id = @DepartmentID
    ORDER BY hire_date DESC;
END;

-- Call the procedure
EXEC GetEmployeesByDepartment @DepartmentID = 3;
```

Stored procedures are especially useful in enterprise systems where performance, security, and consistent logic are important. 