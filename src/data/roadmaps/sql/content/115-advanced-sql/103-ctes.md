# CTEs (Common Table Expressions)

CTEs or Common Table Expressions are a type of temporary result set that are defined within the execution scope of a single SQL statement. They act like a temporary view for a single query, and they are typically used to simplify subqueries and improve readability.

## Syntax

Here is the basic syntax of how to use a CTE in SQL:

```sql
WITH CTE_Name AS
(
    SQL Query
)
SELECT * FROM CTE_Name
```

In this syntax, the "WITH" keyword is used to create a CTE. The SQL query inside the parentheses is the query that creates the CTE. The final SELECT statement is used to query the data from the CTE.

## Basic Usage

An example of how to use a CTE is demonstrated below:

```sql
WITH Sales_CTE (SalesPersonID, NumberOfOrders)
AS
(
  SELECT SalesPersonID, COUNT(OrderID)
  FROM SalesOrderHeader
  GROUP BY SalesPersonID
)
SELECT E.EmployeeID, E.FirstName, E.LastName, S.NumberOfOrders
FROM Employee E
JOIN Sales_CTE S
ON E.EmployeeID = S.SalesPersonID
ORDER BY S.NumberOfOrders DESC;
```

In this example, the CTE groups sales data by `SalesPersonID` and then joins this with the `Employee` table based on the `EmployeeID` to get the corresponding employee details.

## Recursive CTEs

SQL also supports recursive CTEs, which are CTEs that reference themselves. Recursive CTEs are generally used to solve problems that require iteration, such as traversing hierarchies. Here's an example:

```sql
WITH Recursive_CTE AS
(
  SELECT EmployeeID, ManagerID, FirstName
  FROM Employee
  WHERE ManagerID IS NULL
  UNION ALL
  SELECT E.EmployeeID, E.ManagerID, E.FirstName
  FROM Employee E
  INNER JOIN Recursive_CTE RCTE
  ON E.ManagerID = RCTE.EmployeeID
)
SELECT * FROM Recursive_CTE;
```

In the example above, the CTE starts with the employees who have no manager (`ManagerID IS NULL`). Then it recursively adds employees who are managed by the employees already in the CTE. The result is a list of all employees in the company, hierarchically organized by manager.