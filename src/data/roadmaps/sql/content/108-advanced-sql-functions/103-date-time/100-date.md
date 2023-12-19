# DATE

In SQL, DATE is a data type that stores the date. It does not store time information. The format of the date is, 'YYYY-MM-DD'. For instance, '2022-01-01'. SQL provides several functions to handle and manipulate dates.

Below are some common examples of how to use the DATE data type in SQL:

## Create a table with DATE data type

```sql
CREATE TABLE Orders (
    OrderId int,
    ProductName varchar(255),
    OrderDate date
);
```

In this example, the OrderDate column uses the DATE data type to store the date of the order.

## Insert a date value into a table

```sql
INSERT INTO Orders (OrderId, ProductName, OrderDate)
VALUES (1, 'Product 1', '2022-01-01');
```

This command inserts a new row into the Orders table with a date.

## Retrieve data with a specific date

```sql
SELECT * FROM Orders 
WHERE OrderDate = '2022-01-01';
```

This command retrieves all orders made on January 1, 2022.

## Update a date value in a table

```sql
UPDATE Orders 
SET OrderDate = '2022-01-02' 
WHERE OrderId = 1;
```

This command updates the date from January 1, 2022 to January 2, 2022, for the order with the order ID 1.

## SQL Date Functions

SQL also provides several built-in functions to work with the DATE data type:

## CURRENT_DATE

Returns the current date.

```sql
SELECT CURRENT_DATE;
```

## DATEADD

Add or subtract a specified time interval from a date.

```sql
SELECT DATEADD(day, 5, OrderDate) AS "Due Date"
FROM Orders;
```
In this example, we are adding 5 days to each OrderDate in the table Orders.

## DATEDIFF

Get the difference between two dates.

```sql
SELECT DATEDIFF(day, '2022-01-01', '2022-01-06') AS "Difference";
```
It will return 5, that is the difference in days between the two dates.