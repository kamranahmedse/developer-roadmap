# JOIN Queries

Absolutely, here's a brief summary about SQL JOIN Queries:

# SQL JOIN Queries

JOIN clause is used to combine rows from two or more tables, based on a related column between them.

## INNER JOIN:

Inner join returns records that have matching values in both tables. For example:

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers 
ON Orders.CustomerID = Customers.CustomerID;
```

## LEFT (OUTER) JOIN:

Returns all records from the left table, and the matched records from the right table. Also returns NULL if there is no match. Example:

```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders 
ON Customers.CustomerID = Orders.CustomerID;
```

## RIGHT (OUTER) JOIN:

Returns all records from the right table, and the matched records from the left table. Also returns null if there is no match. Example:

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
RIGHT JOIN Customers 
ON Orders.CustomerID = Customers.CustomerID;
```
## FULL (OUTER) JOIN:

Returns all records when there is a match in either left (table1) or right (table2) table records.  Also returns null if there is no match. Example:

```sql
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders 
ON Customers.CustomerID = Orders.CustomerID;
```
## SELF JOIN:

Self join is a regular join, but the table is joined with itself. Example:

```sql
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City;
```

**Note**: JOINS can be used with SELECT, UPDATE, and DELETE statements.