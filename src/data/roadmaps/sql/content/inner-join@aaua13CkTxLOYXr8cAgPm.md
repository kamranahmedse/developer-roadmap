# INNER JOIN

An `INNER JOIN` in SQL is a type of join that returns the records with matching values in both tables. This operation compares each row of the first table with each row of the second table to find all pairs of rows that satisfy the join predicate.

Few things to consider in case of `INNER JOIN`:

- It is a default join in SQL. If you mention `JOIN` in your query without specifying the type, SQL considers it as an `INNER JOIN`.
- It returns only the matching rows from both the tables.
- If there is no match, the returned is an empty result.

## Syntax

Here is the syntax for an SQL `INNER JOIN`:

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

The `INNER JOIN` keyword selects records that have matching values in both tables.

## Example

Consider two tables:

**Table1: `Orders`**

|OrderID|CustomerID|OrderAmount|
|-------|----------|-----------|
|1      |100       |30         |
|2      |101       |40         |
|3      |102       |50         |

**Table2: `Customers`**

|CustomerID|Name    |Country  |
|----------|--------|---------|
|100       |Ana     |Germany  |
|101       |Ben     |USA      |
|103       |Charlie |Australia|

Now, if you want to select all orders, and any matching customer information:

```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderAmount
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

This would produce the following result:

|OrderID|Name|OrderAmount|
|-------|----|-----------|
|1      |Ana |30         |
|2      |Ben |40         |
