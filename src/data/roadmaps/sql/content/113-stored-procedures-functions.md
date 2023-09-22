# Stored Procedures and Functions

A SQL stored procedure is a set of SQL code that can be saved and reused. In other words, it's a precompiled object because it's compiled at a time when it's created on the database. Stored procedures can take parameters, process the tasks or query the database, and return a result.

Here's a basic example:

```sql
CREATE PROCEDURE getEmployeesBySalary
  @minSalary int
AS
BEGIN
  SELECT firstName, lastName
  FROM Employees
  WHERE salary > @minSalary
END
GO
```

To call this stored procedure, we would use:

```sql
EXEC getEmployeesBySalary 50000
```

## Functions

A SQL function is a set of SQL statements that perform a specific task. Functions must return a value or result. We can use these functions in SELECT, INSERT, DELETE, UPDATE statements.

There are two types of functions in SQL:

- **Scalar functions**, which return a single value and can be used where single expressions are used. For instance:

```sql
CREATE FUNCTION addNumbers(@a int, @b int)
RETURNS int 
AS 
BEGIN
   RETURN @a + @b
END
```

- **Table-valued functions**, which return a table. They can be used in JOIN clauses as if they were a normal table. For example:

```sql
CREATE FUNCTION getBooks (@authorID INT)
RETURNS TABLE
AS 
RETURN (
   SELECT books.title, books.publicationYear 
   FROM books 
   WHERE books.authorID = @authorID
)
```

To call this function:

```sql
SELECT title, publicationYear 
FROM getBooks(3)
```