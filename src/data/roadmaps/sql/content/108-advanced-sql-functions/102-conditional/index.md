# Conditional

In SQL, Conditional expressions can be used in the SELECT statement, WHERE clause, and ORDER BY clause to evaluate multiple conditions. These are SQL's version of the common if…then…else statement in other programming languages.

There are two kinds of conditional expressions in SQL:

1. **CASE** expression

    The `CASE` expression is a flow-control statement that allows you to add if-else logic to a query. It comes in two forms: simple and searched.

    Here is an example of a simple `CASE` expression:

    ```sql
    SELECT OrderID, Quantity,
        CASE
            WHEN Quantity > 30 THEN 'Over 30'
            ELSE 'Under 30'
        END AS QuantityText
    FROM OrderDetails;
    ```
    A searched `CASE` statement:

    ```sql
    SELECT FirstName, City,
        CASE
            WHEN City = 'Berlin' THEN 'Germany'
            WHEN City = 'Madrid' THEN 'Spain'
            ELSE 'Unknown'
        END AS Country
    FROM Customers;
    ```

2. **COALESCE** expression 

    The `COALESCE` function returns the first non-null value in a list. It takes a comma-separated list of values and returns the first value that is not null.

    An example of a `COALESCE` statement:

    ```sql
    SELECT ProductName,
        COALESCE(UnitsOnOrder, 0) As UnitsOnOrder,
        COALESCE(UnitsInStock, 0) As UnitsInStock,
    FROM Products;
    ```

3. **NULLIF** expression

    `NULLIF` returns null if the two given expressions are equal.

    Example of using `NULLIF`:

    ```sql
    SELECT NULLIF(5,5) AS Same,
           NULLIF(5,7) AS Different;
    ```
   
4. **IIF** expression

    `IIF` function returns value_true if the condition is TRUE, or value_false if the condition is FALSE.

    Example of using `IIF`:

    ```sql
    SELECT IIF (1>0, 'One is greater than zero', 'One is not greater than zero');
    ```
    
These are essential constructs that can greatly increase the flexibility and functionality of your SQL code, particularly when dealing with elaborate conditions and specific data selections.