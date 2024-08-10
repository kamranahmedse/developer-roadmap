# Reducing Subqueries

SQL subqueries allow you to nest a SELECT statement inside another query. However, while this can sometimes simplify the code, the drawback is they can result in long-running queries and reduced performance. Therefore, optimizing queries often involves reducing subqueries. Two common ways to achieve this include using JOINS and 'EXISTS' clause.

1. **JOIN:** A JOIN clause combines rows from two or more tables based on a related column. In many cases, a JOIN can replace a subquery with equivalent logic, but with improved performance.

An example would be a scenario where you have two tables `Orders` and `Customers`, and you want to find orders made by a specific customer:

Subquery could be:

```sql
SELECT OrderNumber 
FROM Orders 
WHERE CustomerID IN (
  SELECT CustomerID 
  FROM Customers 
  WHERE CustomerName = 'John Doe'
  );
```

Equivalent JOIN:

```sql
SELECT o.OrderNumber 
FROM Orders o 
JOIN Customers c ON o.CustomerID = c.CustomerID 
WHERE c.CustomerName = 'John Doe';
```

2. **EXISTS:** The EXISTS operator checks for the existence of rows returned by the subquery. Many times, a subquery can be replaced with an EXISTS clause which would greatly increase performance as EXISTS will stop processing once it hits a true condition and does not need to check all results like IN would.

Consider you want to find all customers who have placed at least one order:

Subquery might be:

```sql
SELECT * 
FROM Customers 
WHERE CustomerID IN (
  SELECT CustomerID 
  FROM Orders
  );
```

Equivalent EXISTS use case:

```sql
SELECT *
FROM Customers c
WHERE EXISTS (
  SELECT 1
  FROM Orders o
  WHERE c.CustomerID = o.CustomerID
  );
```

While it's important to minimize subqueries whenever possible, there may be cases where you cannot replace a subquery, especially when dealing with correlated subqueries or complex queries where rewriting might be nontrivial or not feasible.
