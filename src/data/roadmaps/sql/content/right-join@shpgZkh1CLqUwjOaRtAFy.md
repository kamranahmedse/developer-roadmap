# RIGHT JOIN

The `RIGHT JOIN` keyword returns all records from the right table (table2), and the matched records from the left table (table1). If there is no match, the result is `NULL` on the left side.

## Syntax

Below is the common syntax used for writing a `RIGHT JOIN`:

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

## Example

Consider two tables:

**Table "Orders":**

| OrderID | CustomerID | OrderDate  |
|--|--|--|
| 1 | 3 | 2017/11/11  |
| 2 | 1 | 2017/10/23  |
| 3 | 2 | 2017/9/15  |
| 4 | 4 | 2017/9/03  |

**Table "Customers":**

| CustomerID | CustomerName | ContactName | Country |
|--|--|--|--|
| 1 | Alfreds Futterkiste | Maria Anders | Germany |
| 2 | Ana Trujillo Emparedados y helados | Ana Trujillo | Mexico |
| 3 | Antonio Moreno Taquería | Antonio Moreno | Mexico |
| 5 | Berglunds snabbköp | Christina Berglund | Sweden |

Now, we want to select all customers and any matching records in orders table. If there is no match, the result is null in order table:

```sql
SELECT 
  Customers.CustomerName, 
  Orders.OrderID
FROM 
  Orders
RIGHT JOIN 
  Customers 
ON 
  Orders.CustomerID = Customers.CustomerID;
```

**Result:**

| CustomerName | OrderID |
|--|--|
| Alfreds Futterkiste  | 2 |
| Ana Trujillo Emparedados y helados  | 3 |
| Antonio Moreno Taquería  | 1 |
| Berglunds snabbköp  | NULL |
| Around the Horn  | NULL |
| Bottom-Dollar Markets  | NULL |

As you can see, the `RIGHT JOIN` keyword returned all the records from the Customers table and all matched records from the Orders table. For those customers who have no orders (like "Berglunds snabbköp"), the result is `NULL`.