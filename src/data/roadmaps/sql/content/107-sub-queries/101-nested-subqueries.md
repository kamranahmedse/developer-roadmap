# Nested Subqueries

In SQL, a subquery is a query that is nested inside a main query. If a subquery is nested inside another subquery, it is called a nested subquery. They can be used in SELECT, INSERT, UPDATE, or DELETE statements or inside another subquery.

Nested subqueries can get complicated quickly, but they are essential for performing complex database tasks.

## Basic Syntax:

```sql
SELECT column_name [, column_name ]
FROM   table1 [, table2 ]
WHERE  column_name OPERATOR
   (SELECT column_name [, column_name ]
   FROM table1 [, table2 ]
   [WHERE])
```

## How They Work:

In a nested subquery, the inner subquery will run first and its result will be used to run the outer query.

## Example:

Here's an example where we want to find the customer names who made orders above the average order amount.

```sql
SELECT CustomerName,Country
FROM Customers
WHERE CustomerID IN
    (SELECT CustomerID 
     FROM Orders
     WHERE Amount>(SELECT AVG(Amount) 
                    FROM Orders))
```

In the above code:

- The innermost query calculates the average order amount.
- The middle subquery finds the `CustomerID`s from the `Orders` table where the order `Amount` is greater than the average.
- The outer query then gets the `CustomerName` from the `Customers` table where the `CustomerID` is in the list of `CustomerID`s fetched from the middle subquery.

These are the basic aspects of nested subqueries in SQL. They can go as deep as the task requires, but keep in mind that too many nested subqueries can cause performance issues.