# HAVING

The `HAVING` clause is used in combination with the `GROUP BY` clause to filter the results of `GROUP BY`. It is used to mention conditions on the group functions, like `SUM`, `COUNT`, `AVG`, `MAX` or `MIN`.

It's important to note that where `WHERE` clause introduces conditions on individual rows, `HAVING` introduces conditions on groups created by the `GROUP BY` clause.

Also note, `HAVING` applies to summarized group records, whereas `WHERE` applies to individual records.

Syntax:

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

## Example

Consider this "Orders" table:

| OrderID | Customer | Amount |
|---------|----------|--------|
| 1       | John     |  1000  |
| 2       | Mary     | 1500   |
| 3       | John     | 2000   |
| 4       | Jane     | 1000   |
| 5       | Mary     | 2000   |
| 6       | John     | 3000   |
| 7       | Jane     | 2000   |
| 8       | Mary     | 2500   |

For instance, if you wanted to find customers who have spent more than $3000 in total, you might use the `HAVING` clause as follows:

```sql
SELECT Customer, SUM(Amount)
FROM Orders
GROUP BY Customer
HAVING SUM(Amount) > 3000;
```

As a result, the query returns:

| Customer | SUM(Amount) |
|----------|-------------|
| John     |   6000      |
| Mary     |   6000      |

In this case, the `HAVING` clause filters out all Customers with a total `Amount` less than or equal to $3000. Only John and Mary have the total sum of `Amount` more than $3000. Thus, only these records satisfy the `HAVING` clause and are included in the result.
