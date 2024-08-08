# GROUP BY

**Group By** is an SQL clause that arranges identical data into groups. It is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or multiple columns.

## Syntax:

```sql
SELECT column1, column2, ..., aggregate_function(column_name)
FROM table_name
WHERE condition
GROUP BY column1, column2, ...;
```

## Explanation:

- **column1, column2**, these columns are not under the aggregate function or any operation. They will be used to group the data.
- **aggregate_function(column_name)**, Aggregate functions will apply on the group of the column_name specified, not individual rows.
- The **WHERE** clause is optional. It adds conditions to select which rows will be grouped.

## Examples:

Here's an example of the **Group By** clause in action. Given is a table **Sales**:

| order_id | product_id | qty | 
|----------|------------|-----|
| 1        | 1001       | 20  |
| 2        | 1002       | 10  |
| 3        | 1003       | 50  |
| 4        | 1001       | 10  |
| 5        | 1002       | 20  |
| 6        | 1003       | 50  |

## Example 1:
```sql
SELECT product_id, SUM(qty)
FROM SALES
GROUP BY product_id;
```

The result will be:

|product_id | SUM(qty)
|-----------|----------|
| 1001      | 30       |
| 1002      | 30       |
| 1003      | 100      |

## Example 2:

You can perform group by operation on multiple columns. In the below example, 'product_id' and 'order_id' are used to group the data.
```sql
SELECT product_id, order_id, SUM(qty)
FROM SALES
GROUP BY product_id, order_id;
```

**Group By** clause can be used with **HAVING** clause to add a condition on grouped data.