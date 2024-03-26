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
![image](https://github.com/kamranahmedse/developer-roadmap/assets/78022115/c130be67-6db3-41b4-98a2-9376688297df)

![image](https://github.com/kamranahmedse/developer-roadmap/assets/78022115/3a9344aa-44bf-440b-b51c-9c6f6fe6f537)
![image](https://github.com/kamranahmedse/developer-roadmap/assets/78022115/1e2b32d0-2ed9-4e1f-aa2a-51de307f32e7)


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
