# FULL OUTER JOIN

A `FULL OUTER JOIN` in SQL is a method to combine rows from two or more tables, based on a related column between them. It returns all rows from the left table (`table1`) and from the right table (`table2`). 

The `FULL OUTER JOIN` keyword combines the results of both left and right outer joins and returns all (matched or unmatched) rows from the tables on both sides of the join clause.

If there are records in the "Customers" table that do not have matches in the "Orders" table, those will be included. Also, if there are records in the "Orders" table that do not have matches in the "Customers" table, those will be included.

## Syntax

```
SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

## Code Example

Consider the following two tables:

**Table1: Customers**

| ID | Name  |
|----|-------|
| 1  | Tom   |
| 2  | Lucy  |
| 3  | Steve |
| 4  | Dave  |

**Table2: Orders**

| OrderID | CustomerID | Product  |
|---------|------------|----------|
| 1       | 3          | Apple    |
| 2       | 3          | Banana   |
| 3       | 1          | Orange   |
| 4       | 2          | Mango    |
| 5       | 7          | Blueberry|

A `FULL OUTER JOIN` query would look like this:

```
SELECT Customers.Name, Orders.Product
FROM Customers
FULL OUTER JOIN Orders
ON Customers.ID = Orders.CustomerID
ORDER BY Customers.Name;
```

The result-set will look like this:

| Name  | Product  |
|-------|----------|
| Tom   | Orange   |
| Lucy  | Mango    |
| Steve | Apple    |
| Steve | Banana   |
| NULL  | Blueberry|
| Dave  | NULL     |

This response includes all customers and all orders. If no matching orders exist for a customer, or if no matching customer exists for an order, the missing side will contain NULL.
For example, Dave made no orders (his details in the product column are NULL) and the Blueberry order was made by a non-existing customer (the customer's details are NULL in the name column).